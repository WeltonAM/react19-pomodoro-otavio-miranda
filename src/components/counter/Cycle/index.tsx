import { useTask } from "../../../data/hooks/useTask.hook";
import styles from "./styles.module.css";

export default function Cycle() {
    const { task, getNextCycleType } = useTask();

    const cycleSteps = Array.from({ length: task.currentCycle });

    const cycleDescriptions = {
        workTime: "Work time",
        shortBreakTime: "Short break",
        longBreakTime: "Long break",
    };

    const renderCycleDots = () => {
        return cycleSteps.map((_, index) => {
            const type = getNextCycleType(index + 1);
            return (
                <span
                    key={index}
                    className={`${styles.cycleDot} ${styles[type]}`}
                    aria-label={`Cycle indicator: ${cycleDescriptions[type]}`}
                    title={`Cycle indicator: ${cycleDescriptions[type]}`}
                />
            );
        });
    };

    return (
        <div className={styles.cycleContainer}>
            <span>Cycles:</span>
            <div className={styles.cycleDots}>{renderCycleDots()}</div>
        </div>
    );
}
