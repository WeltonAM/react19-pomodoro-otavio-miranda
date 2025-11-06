import { useTask } from "../../../data/hooks/useTask.hook";

export default function Tips() {
  const { task, getNextCycleType } = useTask();

  const tipsForActiveTask = {
    workTime: <span>Focus on the task for {task.config.workTime}min</span>,
    shortBreakTime: <span>Take a break for {task.config.shortBreakTime}min</span>,
    longBreakTime: <span>Well done! Long rest: {task.config.longBreakTime}min</span>,
  };

  const tipsForInactiveTask = {
    workTime: <span>Next cycle: {task.config.workTime}min</span>,
    shortBreakTime: <span>Next break: {task.config.shortBreakTime}min</span>,
    longBreakTime: <span>Next break is a long one!</span>,
  };

  return (
    <>
      {!!task.activeTask && tipsForActiveTask[task.activeTask.type]}
      {!task.activeTask && tipsForInactiveTask[getNextCycleType(task.currentCycle)]}
    </>
  );
}