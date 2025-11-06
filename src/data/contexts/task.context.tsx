import { createContext, useState } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "../constants/task";

export interface TaskContextProps {
    task: TaskStateModel | null;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [task, setTask] = useState<TaskStateModel | null>(initialTaskState);

    return (
        <TaskContext.Provider value={{ task }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContext;
