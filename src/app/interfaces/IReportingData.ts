export interface IReportingData {
  event_type: string;
  timestamp: number;
  user_id: string;
  username: string;
  old_role: string | null;
  new_role: string | null;
}
