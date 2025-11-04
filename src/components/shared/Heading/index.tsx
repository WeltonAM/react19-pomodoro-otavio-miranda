import { TimerIcon } from "lucide-react";

import styles from './styles.module.css';

export interface HeadingProps {
  children: React.ReactNode;
}

export default function Heading({ children }: HeadingProps) {
  return (
    <header className={styles.heading}>
      <button>
        <TimerIcon />
      </button>

      <h1>{children}</h1>
    </header>
  );
}