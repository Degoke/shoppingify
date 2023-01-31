export type Item = {
  name: string;
  note?: string;
  image?: string;
};

export type ListItem = {
  item: Item;
  count: number;
  is_completed: boolean;
  completed_at?: Date;
};

export enum Status {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export type List = {
  items: ListItem[];
  name: string;
  is_editing: boolean;
  status: Status;
  completed_at?: Date;
};

export type Account = {
  email: string;
};