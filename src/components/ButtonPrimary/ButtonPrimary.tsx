import React from 'react'
import styles from './ButtonPrimary.module.css'

type ButtonPrimaryProps = {
    isDisabled?: boolean,
    type?: 'button' | 'submit' | 'reset',
    label: string,
    onClick?: () => void
}

export default function ButtonPrimary({ isDisabled, type, label, onClick }: ButtonPrimaryProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick} disabled={isDisabled}>{label}</button>
  )
}
