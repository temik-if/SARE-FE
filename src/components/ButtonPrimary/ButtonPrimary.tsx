import React from 'react'
import styles from './ButtonPrimary.module.css'

type ButtonPrimaryProps = {
    type?: 'button' | 'submit' | 'reset',
    label: string,
    onClick?: () => void
}

export default function ButtonPrimary({ type, label, onClick }: ButtonPrimaryProps) {
  return (
    <button type={type} className={styles.button} onClick={onClick}>{label}</button>
  )
}
