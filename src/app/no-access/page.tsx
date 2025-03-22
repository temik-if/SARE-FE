"use client";
import ButtonPrimary from "@/components/ButtonPrimary/ButtonPrimary";
import styles from "./no-access.module.css";
import { useRouter } from "next/navigation";
import { BiSolidLock } from "react-icons/bi";


export default function NoAccessPage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <BiSolidLock size={72} style={{color: "var(--error)"}} />
      <h2>Acesso Negado</h2>
      <p>Você não tem permissão para acessar esta funcionalidade.</p>
      <ButtonPrimary
        label="IR PARA PÁGINA INICIAL"
        onClick={() => router.push("/")}
      />
    </div>
  );
}
