import { PlayCircleIcon } from "lucide-react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Cycle from "../Cycle";
import styles from "./styles.module.css";

export default function Form() {
    return (
        <form className={styles.form}>
            <div className={styles.formRow}>
                <Input
                    id="task"
                    type="text"
                    label="Task"
                    placeholder="Type your task"
                />
            </div>

            <div className={styles.formRow}>
                <p>The next brake time</p>
            </div>

            <div className={styles.formRow}>
                <Cycle />
            </div>

            <div className={styles.formRow}>
                <Button
                    icon={<PlayCircleIcon />}
                />
            </div>
        </form>
    );
}