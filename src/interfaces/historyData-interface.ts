export interface HistoryData {
  key: number;
  filename: string;
  filenameOrigin: string;
  issues: any;
  userName: string;
  status: string;
  dateCreated: Date;
}

export interface HistoryJson {
  status: string;
  data: HistoryData[];
}
