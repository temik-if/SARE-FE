import React from 'react';
import styles from "./PopUp.module.css";

type PopUpProps = {
    isOpen: boolean;
    onConfirm: () => void;
    message: string;
}

export default function PopUp({isOpen, onConfirm, message}: PopUpProps) {
  if (!isOpen) return null;
  
  return (
     <div className={styles.overlay} onClick={onConfirm}>
       <div className={styles.popup}>
         <p>{message}</p>
         <button onClick={onConfirm} className={styles.button}>
           OK
         </button>
       </div>
     </div>
   );
}


