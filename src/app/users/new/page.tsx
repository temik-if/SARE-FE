'use client'

import UserForm from '@/components/UserForm/UserForm';
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      
      <UserForm />
    </div>
  );
}
