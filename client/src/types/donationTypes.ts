export interface Donation {
  _id: string;
  amount: number;
  comment?: string;
  user_id: string;
  project_id: string;
  createdAt: string;
  payment_status: string;
}
