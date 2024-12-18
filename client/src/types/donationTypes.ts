export interface Donation {
  _id: string;
  amount: number;
  comment?: string;
  user_id: string;
  project_id: string;
  timestamp: string;
  payment_status: string;
}
