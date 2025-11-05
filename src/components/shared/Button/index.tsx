import React from "react";
import styles from "./styles.module.css";

export type ButtonProps = {
    icon?: React.ReactNode;
    styleColor?: 'success' | 'error';
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({ icon, styleColor, ...props }: ButtonProps) {
    return (
        <button
            className={`
                ${styles.button}
                ${styleColor && styles[styleColor]}
            `}
            {...props}
        >
            {icon && icon}
        </button>
    );
}