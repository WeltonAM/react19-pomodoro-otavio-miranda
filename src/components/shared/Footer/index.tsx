import styles from "./styles.module.css";
import { RouterLink } from "../../../adapter/Link";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <RouterLink
                target="_blank"
                to="/about-pomodoro"
                className={styles.helpLink}
            >
                Curious about how the Pomodoro technique works? 🍓
            </RouterLink>

            <span>
                Chronos Promodoro &copy; {new Date().getFullYear()}
            </span>

            <span className={styles.developer}>
                Made with ❤️ by
                <RouterLink
                    target="_blank"
                    to="https://welton-matos-dev-portfolio.vercel.app/"
                    className={styles.developerLink}
                >
                    WeltonMatosDev
                </RouterLink>
            </span>

            <span className={styles.sdg}>
                Soli Deo Gloria
            </span>
        </footer>
    );
}