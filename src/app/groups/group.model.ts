export interface Group {
  id: string;
  name: number;
  adminId: string;
  members: [{id: string, firstName: string, lastName: string}];
  isOpen: boolean;
}
