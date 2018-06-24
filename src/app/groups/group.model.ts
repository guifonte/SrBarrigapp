import { UserData } from '../auth/user-data.model';

export interface Group {
  id: string;
  name: string;
  adminId: string;
  members: UserData[];
  isOpen: boolean;
}
