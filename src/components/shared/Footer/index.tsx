import styles from "./styles.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                target="_blank"
                href="https://welton-matos-dev-portfolio.vercel.app/"
                className={styles.helpLink}
            >
                Curious about how the Pomodoro technique works? 🍓
            </a>

            <span>
                Chronos Promodoro &copy; {new Date().getFullYear()}
            </span>

            <span className={styles.developer}>
                Made with ❤️ by
                <a
                    target="_blank"
                    href="https://welton-matos-dev-portfolio.vercel.app/"
                    className={styles.developerLink}
                >
                    WeltonMatosDev
                </a>
            </span>
        </footer>
    );
}