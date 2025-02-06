import React from 'react'
import styles from './page.module.css'
import BookingForm from '@/components/BookingForm/BookingForm'

export default function NovoAgendamento() {
  return (
    <div className={styles.container}>
        <h2>Realize um agendamento</h2>
        <BookingForm />
    </div>
  )
}
