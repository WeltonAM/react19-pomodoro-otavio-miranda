import { TimerIcon } from "lucide-react";
import styles from "./styles.module.css";
import { RouterLink } from "../../../adapter/Link";

export default function Logo() {
    return (
        <div className={styles.logo}>
            <RouterLink
                to="/counter"
                className={styles.logoLink}
            >
                <TimerIcon />
                <span>Chronos</span>
            </RouterLink>
        </div>
    );
}