/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer, useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "../constants/task";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { loadBeep } from "../../utils/loadBeep";
import { showMessage } from "../../adapter/showMessage";

export type SortTasksOptions = {
    tasks: TaskModel[];
    direction?: 'asc' | 'desc';
    field?: keyof TaskModel;
};

export const TaskActionTypes = {
    START_TASK: "START_TASK",
    COMPLETE_TASK: "COMPLETE_TASK",
    INTERRUPT_TASK: "INTERRUPT_TASK",
    RESET_STATE: "RESET_STATE",
    COUNT_DOWN: "COUNT_DOWN",
    CHANGE_SETTINGS: "CHANGE_SETTINGS",
} as const;

export type TaskActionTypes =
    (typeof TaskActionTypes)[keyof typeof TaskActionTypes];

interface TaskSettings {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
}

const getNextCycle = (currentCycle: number) => {
    return currentCycle === 8 ? 1 : currentCycle + 1;
};

const getNextCycleType = (cycle: number): TaskModel["type"] => {
    if (cycle % 8 === 0) return "longBreakTime";
    if (cycle % 2 === 0) return "shortBreakTime";
    return "workTime";
};

const getFormattedTime = (secondsRemaining: number): string => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

function taskReducer(state: TaskStateModel, action: any): TaskStateModel {
    switch (action.type) {
        case TaskActionTypes.START_TASK: {
            const newTask = action.payload;
            const secondsRemaining = newTask.duration * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: getNextCycle(state.currentCycle),
                secondsRemaining,
                formattedSecondsRemaining: getFormattedTime(secondsRemaining),
                tasks: [...state.tasks, newTask],
            };
        }
        case TaskActionTypes.INTERRUPT_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, interruptDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.COMPLETE_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                    if (state.activeTask && state.activeTask.id === task.id) {
                        return { ...task, completeDate: Date.now() };
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.RESET_STATE:
            return { ...initialTaskState };

        case TaskActionTypes.COUNT_DOWN: {
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formattedSecondsRemaining: getFormattedTime(action.payload.secondsRemaining),
            };
        }
        case TaskActionTypes.CHANGE_SETTINGS:
            return { ...state, config: { ...action.payload } };

        default:
            return state;
    }
}

interface TaskContextProps {
    task: TaskStateModel;
    createTask: (taskData: TaskModel) => void;
    interruptTask: () => void;
    resetTask: () => void;
    countDown: (secondsRemaining: number) => void;
    changeSettings: (settings: TaskSettings) => void;
    getNextCycle: (currentCycle: number) => number;
    getNextCycleType: (currentCycle: number) => TaskModel["type"];
    getTaskStatus: (task: TaskModel, activeTask: TaskModel | null) => string;
    sortTasks: (options: SortTasksOptions) => TaskModel[];
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [task, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state');

        if (storageState === null) return initialTaskState;

        const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

        return {
            ...parsedStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
    const worker = TimerWorkerManager.getInstance();

    worker.onmessage(e => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }
            dispatch({
                type: TaskActionTypes.COMPLETE_TASK,
            });
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        }
    });

    const sortTasks = ({
        field = 'startDate',
        direction = 'desc',
        tasks = [],
    }: SortTasksOptions): TaskModel[] => {
        return [...tasks].sort((a, b) => {
            const aValue = a[field];
            const bValue = b[field];

            if (aValue === null && bValue === null) return 0;
            if (aValue === null) return 1;
            if (bValue === null) return -1;
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return 0;
        });
    }

    const getTaskStatus = (task: TaskModel, activeTask: TaskModel | null) => {
        if (task.completeDate) return 'Completed';
        if (task.interruptedDate) return 'Interrupted';
        if (task.id === activeTask?.id) return 'Active';
        return 'Inactive';
    }

    const createTask = (taskData: TaskModel) => {
        dispatch({ type: TaskActionTypes.START_TASK, payload: taskData });
        showMessage.success('Task created');
    }

    const interruptTask = () => {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
        showMessage.info('Task interrupted');
    }

    const resetTask = () => {
        dispatch({ type: TaskActionTypes.RESET_STATE });
        showMessage.info('Task reset');
    };

    const countDown = (secondsRemaining: number) => {
        dispatch({
            type: TaskActionTypes.COUNT_DOWN,
            payload: {
                secondsRemaining,
                formattedSecondsRemaining: getFormattedTime(secondsRemaining),
            },
        });
    }

    const changeSettings = (settings: TaskSettings) => {
        dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: settings });
    }

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(task));

        if (!task.activeTask) {
            worker.terminate();
        }

        document.title = `${task.formattedSecondsRemaining} - Chronos Pomodoro`;

        worker.postMessage(task);
    }, [worker, task]);

    useEffect(() => {
        if (task.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [task.activeTask]);

    return (
        <TaskContext.Provider
            value={{
                task,
                createTask,
                interruptTask,
                resetTask,
                countDown,
                changeSettings,
                getNextCycle,
                getNextCycleType,
                getTaskStatus,
                sortTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContext;
