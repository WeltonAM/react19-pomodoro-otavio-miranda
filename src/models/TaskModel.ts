export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  interruptedDate: number | null;
  type: 'workTime' | 'shortBreakTime' | 'longBreakTime';
};
