export interface Taskmodel { id: string;
  title: string;
  details: string;
  color: string;      // which sticky-note color the user picked
  done: boolean;
  createdAt: number;  // Date.now() — so we can sort newest first
}
export type NewTask = Omit<Taskmodel, 'id'>;
