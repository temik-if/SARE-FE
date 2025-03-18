import React from 'react'
import styles from './NavMenuButton.module.css'
import { FaAngleDown } from 'react-icons/fa';

type NavMenuButtonProps = {
  label: string,
  onClick: () => void
}

export default function NavMenuButton({label, onClick}: NavMenuButtonProps) {

  return (
    <div onClick={onClick} className={styles.button}>
      <p>{label}</p>
      <FaAngleDown className={styles.arrowIcon} />
    </div>
  );
}
