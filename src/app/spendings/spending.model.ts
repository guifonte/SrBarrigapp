import { UserData } from '../auth/user-data.model';

export interface Spending {
  id: string;
  value: number;
  description: string;
  date: Date;
  payerFirstName: string;
  payerLastName: string;
  creatorId: string;
  groupId: string;
  shareList: UserData[];
}
