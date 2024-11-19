import { Injectable } from '@nestjs/common';
import { NotifyApplicantAboutScholarshipApplicationRequest } from './notify-applicant-about-scholarship-application-request/notify-applicant-about-scholarship-application-request';
import { NotifyApplicantAboutScholarshipApplicationSummary } from './notify-applicant-about-scholarship-application-summary/notify-applicant-about-scholarship-application-summary';

@Injectable()
export class SignatureTypes {
  constructor(
    private readonly notifyApplicantAboutScholarshipApplicationRequest: NotifyApplicantAboutScholarshipApplicationRequest,
    private readonly notifyApplicantAboutScholarshipApplicationSummary: NotifyApplicantAboutScholarshipApplicationSummary,
  ) {}
  public signatureTypes: Record<string, any[]> = {
    'sales.scholarship-application-requests.scholarship_application_requested':
      [this.notifyApplicantAboutScholarshipApplicationRequest],
    'sales.scholarship-application-requests.scholarship_application_finished': [
      this.notifyApplicantAboutScholarshipApplicationSummary,
    ],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
