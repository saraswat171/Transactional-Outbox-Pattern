import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ScholarshipApplicationRequestRepository } from 'src/infrastructure/repositories/scholarship-applications/scholarship-application.repository';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { ProgramsRepository } from 'src/infrastructure/repositories/programs/programs-repository';
import { SendApplicantScholasrhipApplicationAccessCodeHandler } from 'src/features/scholarship-applications-requests/send-email-with-access-code/send-email-with-access-code.service';
import { DataSource } from 'typeorm';
import { Message } from '../common/message.interface';
import { MessageBody } from './notify-applicant-about-scholarship-application-request.interface';

export class NotifyApplicantAboutScholarshipApplicationRequest {
  constructor(
    private readonly handler: SendApplicantScholasrhipApplicationAccessCodeHandler,
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(ProgramsRepository)
    private programRepository: ProgramsRepository,
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
      const program = await this.programRepository.findProgram(
        scholarshipApplication.program_uuid,
      );

      await this.handler.handle(scholarshipApplication, program);
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
