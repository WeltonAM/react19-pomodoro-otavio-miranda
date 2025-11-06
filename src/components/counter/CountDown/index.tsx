import { useTask } from "../../../data/hooks/useTask.hook";
import styles from "./styles.module.css";

export default function CountDown() {
    const { task } = useTask();

    return (
        <div className={styles.countDown}>
            {task?.formattedSecondsRemaining}
        </div>
    );
}