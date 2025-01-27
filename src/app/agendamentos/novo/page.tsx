import AgendamentoForm from '@/components/AgendamentoForm/AgendamentoForm'
import React from 'react'
import styles from './page.module.css'

export default function NovoAgendamento() {
  return (
    <div className={styles.container}>
        <h2>Realize um agendamento</h2>
        <AgendamentoForm />
    </div>
  )
}
