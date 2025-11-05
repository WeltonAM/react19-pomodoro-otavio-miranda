import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState, useRef } from "react";

export type AvailableThemes = "light" | "dark";

export default function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        return (localStorage.getItem("theme") as AvailableThemes) || "dark";
    });

    const [animating, setAnimating] = useState(false);
    const changeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleThemeChange() {
        if (animating) return;
        setAnimating(true);

        const nextTheme = theme === "light" ? "dark" : "light";

        if (changeTimeout.current) clearTimeout(changeTimeout.current);

        changeTimeout.current = setTimeout(() => {
            setTheme(nextTheme);
            setAnimating(false);
        }, 400);
    }

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        return () => {
            if (changeTimeout.current) clearTimeout(changeTimeout.current);
        };
    }, []);

    return (
        <nav className={styles.menu}>
            <a href="#" className={styles.menuLink} aria-label="Home" title="Home">
                <HouseIcon />
            </a>

            <a href="#" className={styles.menuLink} aria-label="History" title="History">
                <HistoryIcon />
            </a>

            <a href="#" className={styles.menuLink} aria-label="Settings" title="Settings">
                <SettingsIcon />
            </a>

            <button
                onClick={handleThemeChange}
                className={`${styles.menuLink} ${animating ? styles.animating : ""}`}
                aria-label="Change theme"
                title="Theme"
                disabled={animating}
            >
                <div className={styles.themeWrapper}>
                    <SunIcon
                        className={`${styles.icon} ${theme === "light" ? styles.sunActive : styles.sunInactive
                            }`}
                    />
                    <MoonIcon
                        className={`${styles.icon} ${theme === "dark" ? styles.moonActive : styles.moonInactive
                            }`}
                    />
                </div>
            </button>
        </nav>
    );
}
