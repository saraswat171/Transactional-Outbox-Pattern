interface ScholarshipApplication {
  uuid: string;
}

export interface MessageBody {
  uuid: string;
  fired_at: Date;
  scholarship_application: ScholarshipApplication;
}
