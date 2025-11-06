import React from "react";
import styles from "./styles.module.css";

export type InputProps = {
    type: 'text' | 'number';
    id: string;
    label?: string;
    placeholder?: string;
} & React.ComponentPropsWithRef<'input'>;

export default function Input({ label, id, type, placeholder, ...props }: InputProps) {
    return (
        <div className={styles.inputContainer}>
            {label &&
                <label
                    htmlFor={id}
                    className={styles.label}
                >
                    {label}
                </label>
            }

            <input
                className={styles.input}
                id={id}
                type={type}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}