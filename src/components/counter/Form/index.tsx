import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Cycle from "../Cycle";
import styles from "./styles.module.css";
import { useRef } from "react";
import type { TaskModel } from "../../../models/TaskModel";
import { useTask } from "../../../data/hooks/useTask.hook";
import Tips from "../Tips";
import { showMessage } from "../../adapter/showMessage";

export default function Form() {
    const {
        task,
        createTask,
        interruptTask,
        getNextCycleType,
        getNextCycle,
    } = useTask();

    const taskNameRef = useRef<HTMLInputElement>(null);

    const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskNameRef.current === null) return;

        const taskName = taskNameRef.current.value.trim();

        if (!taskName) {
            showMessage.error('Task name is required');
            return;
        }

        e.preventDefault();

        const nextCycle = getNextCycle(task.currentCycle);
        const nextType = getNextCycleType(nextCycle);

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptedDate: null,
            duration: task.config[nextType],
            type: nextType,
        };

        createTask(newTask);
    };

    return (
        <form className={styles.form} onSubmit={handleCreateNewTask}>
            <div className={styles.formRow}>
                <Input
                    id="task"
                    type="text"
                    label="Task"
                    placeholder="Type your task"
                    ref={taskNameRef}
                    disabled={!!task.activeTask}
                />
            </div>

            <div className={styles.formRow}>
                <Tips />
            </div>

            {task.currentCycle > 0 && (
                <div className={styles.formRow}>
                    <Cycle />
                </div>
            )}

            <div className={styles.formRow}>
                {!task.activeTask ? (
                    <Button
                        key={task.currentCycle}
                        aria-label="Start or resume task"
                        title="Start or resume task"
                        type="submit"
                        icon={<PlayCircleIcon />}
                        disabled={false}
                    />
                ) : (
                    <Button
                        aria-label="Pause task"
                        title="Pause task"
                        type="button"
                        styleColor="error"
                        onClick={interruptTask}
                        icon={<StopCircleIcon />}
                    />
                )}
            </div>
        </form>
    );
}
