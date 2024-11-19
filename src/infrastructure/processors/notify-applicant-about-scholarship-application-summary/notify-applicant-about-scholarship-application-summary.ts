import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplicationRequestRepository } from 'src/infrastructure/repositories/scholarship-applications/scholarship-application.repository';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { SendApplicantScholasrhipApplicationFormSummaryHandler } from 'src/features/scholarship-applications-requests/send-email-with-form-summary/send-email-with-form-summary.service';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';
import { MessageBody } from './notify-applicant-about-scholarship-application-summary.interface';

export class NotifyApplicantAboutScholarshipApplicationSummary {
  constructor(
    private readonly handler: SendApplicantScholasrhipApplicationFormSummaryHandler,
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(ScholarshipApplicationRequestRepository)
    private scholarshipApplicationRequestRepository: ScholarshipApplicationRequestRepository,
    @InjectRepository(InboxMessageRepository)
    private inboxMessageRepository: InboxMessageRepository,
  ) {}

  getHandlerName(): string {
    return this.constructor.name;
  }

  async handleEvent(payload: Message<MessageBody>) {
    await this.dataSource.transaction(async (transaction) => {
      const { uuid } = payload.body.scholarship_application || {};

      const scholarshipApplication =
        await this.scholarshipApplicationRequestRepository.findScholarshipApplication(
          uuid,
        );
      await this.handler.handle(scholarshipApplication);
      await this.inboxMessageRepository.storeInboxMessage(
        {
          message_id: payload.messageId,
          handler_name: this.getHandlerName(),
        },
        transaction,
      );
    });
  }
}
