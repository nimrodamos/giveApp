export interface Donation {
  _id: string;
  amount: number;
  comment?: string;
  user_id: string;
  timestamp: string;
}

export interface ProjectDetails {
  images: string[];
  text?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  goal: number;
  current_amount: number;
  start_date: string;
  end_date?: string;
  status: string;
  donations: Donation[];
  details: ProjectDetails;
}
