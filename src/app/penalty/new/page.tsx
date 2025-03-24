'use client'

import PenaltyForm from '@/components/PenaltyForm/PenaltyForm'
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      
      <PenaltyForm />
    </div>
  );
}
