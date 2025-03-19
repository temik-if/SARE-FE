import { useState } from "react";
import { motion } from "framer-motion";
import {
  BiMenu,
  BiUser,
  BiLogOut,
  BiSearch,
  BiChevronDown,
} from "react-icons/bi";
import styles from "./MobileDrawerMenu.module.css";
import Link from "next/link";
import { RiCloseFill, RiFileList2Line } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import ButtonSecondary from "../ButtonSecondary/ButtonSecondary";
import { useRouter } from "next/navigation";

const userMenu = [
  { label: "Cadastro", url: "/cadastro/user", icon: <FaUserPlus /> },
  { label: "Lista", url: "/listuser", icon: <RiFileList2Line /> },
];

const resourcesMenu = [
  { label: "Cadastro", url: "/cadastro/resources", icon: <IoMdAdd /> },
  { label: "Lista", url: "/listresources", icon: <RiFileList2Line /> },
];

type MobileDrawerMenuProps = {
  userType?: string;
};

export default function MobileDrawerMenu({ userType }: MobileDrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  if (userType === undefined) {
    return (
      <ButtonSecondary
        label={"LOGIN"}
        onClick={() => {
          router.push("/login");
        }}
      />
    );
  }

  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <BiMenu size={28} />
      </button>
      {isOpen && (
        <motion.div
          className={styles.drawer}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          <div className={styles.header}>
            <button className={styles.closeButton} onClick={toggleMenu}>
              <RiCloseFill size={24} />
            </button>
          </div>

          {userType === "COORDINATOR" && (
            <>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Buscar agendamento..."
                  className={styles.input}
                />
                <BiSearch size={18} className={styles.icon} />
              </div>

              <div className={styles.menuSection}>
                <button
                  className={styles.accordion}
                  onClick={() => toggleExpand("user")}
                >
                  Usuários <BiChevronDown />
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: expanded === "user" ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.menuItems}>
                    {userMenu.map((item) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        key={item.label}
                        href={item.url}
                        className={styles.menuItem}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className={styles.menuSection}>
                <button
                  className={styles.accordion}
                  onClick={() => toggleExpand("resources")}
                >
                  Recursos <BiChevronDown />
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: expanded === "resources" ? "auto" : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.menuItems}>
                    {resourcesMenu.map((item) => (
                      <Link
                        onClick={() => setIsOpen(false)}
                        key={item.label}
                        href={item.url}
                        className={styles.menuItem}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}
          <div className={styles.menuSection}>
            <Link href="/list/agendamento">
              <button className={styles.accordion} onClick={() => setIsOpen(false)}>
                {userType === "COORDINATOR"
                  ? "Ver Agendamentos"
                  : "Meus Agendamentos"}
              </button>
            </Link>
          </div>

          <div className={styles.profileMenu}>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.profileItem}
            >
              Meus Dados
              <BiUser />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.profileItem}
            >
              Sair
              <BiLogOut />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
