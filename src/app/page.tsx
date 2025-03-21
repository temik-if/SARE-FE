"use client"
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import LoadingSessionOverlay from "@/components/LoadingSessionOverlay/LoadingSessionOverlay";

export default function Home() {
  const { data: session, status } = useSession();
  
 
  return (
    <div className={styles.page}>
      <LoadingSessionOverlay />
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          <div className={styles.textContent}>
            {status == "authenticated" && <h1>Olá, {session.user.name}</h1>}
            <h1>Seja Bem-vindo ao SARE!</h1>
            <p>
              Sistema de agendamento de recursos educacionais, comece agora o
              seu agendamento.
            </p>
            <Link href="/agendamentos/novo">
              <button className={styles.scheduleButton}>
                Realizar Agendamento
              </button>
            </Link>
          </div>
          <div className={styles.imageContent}>
            <Image
              src="/images/Learning-pana 1.png"
              alt="Learning illustration"
              width={500}
              height={500}
              priority
              className={styles.responsiveImage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}