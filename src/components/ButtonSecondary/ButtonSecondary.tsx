import React from "react";
import styles from "./ButtonSecondary.module.css";

type ButtonSecondaryProps = {
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
};

export default function ButtonSecondary({
  isDisabled,
  type,
  label,
  onClick,
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
