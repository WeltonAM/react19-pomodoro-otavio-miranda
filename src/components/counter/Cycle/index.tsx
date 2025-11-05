import styles from "./styles.module.css";

export default function Cycle() {
    return (
        <div className={styles.cycleContainer}>
            <span>Cycles:</span>

            <div className={styles.cycleDots}>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreak}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreak}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreak}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.longBreak}`}></span>
            </div>
        </div>
    );
}