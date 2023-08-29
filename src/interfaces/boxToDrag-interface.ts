enum Fields {
  'Email Address' = 'Email Address',
  'Managers Email Address' = 'Managers Email Address'
}

type FieldsObject = {
  [K in Fields]?: string;
};

export interface InfoTableMembers extends FieldsObject {
  Name: string;
  Cohort: string;
  Skillset: string;
  Budget: number;
  __rowNum__?: number;
  key?: number;
}

export interface BasicInfoFile {
  newData: InfoTableMembers[];
  filename: String;
}
