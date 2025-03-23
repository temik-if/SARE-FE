import React, { JSX, useState } from "react";
import NavMenuButton from "../NavMenuButton/NavMenuButton";
import styles from "./NavMenu.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { FaUserPlus } from "react-icons/fa";
import { RiFileList2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

type NavMenuProps = {
  userType: string;
};

const userOptions = new Map<string, { url: string; icon: JSX.Element }>([
  ["Cadastro", { url: "/users/new", icon: <FaUserPlus size={18} /> }],
  ["Listar", { url: "/users", icon: <RiFileList2Line size={18} /> }],
]);

const resourcesOptions = new Map<string, { url: string; icon: JSX.Element }>([
  ["Cadastro", { url: "/resources/new", icon: <IoMdAdd size={18} /> }],
  ["Listar", { url: "/resources", icon: <RiFileList2Line size={18} /> }],
]);

const bookingOptions = new Map<string, { url: string; icon: JSX.Element }>([
  ["Novo", { url: "/bookings/new", icon: <IoMdAdd size={18} /> }],
  ["Meus agendamentos", { url: "/bookings", icon: <RiFileList2Line size={18} /> }],
]);

export default function NavMenu({ userType }: NavMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isBookingMenuOpen, setIsBookingMenuOpen] = useState(false);
  

  return (
    <div className={styles.navMenu}>
      {userType === "COORDINATOR" && (
        <>
          <div className={styles.menuItem}>
            <NavMenuButton
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsResourcesMenuOpen(false);
              }}
              label="Usuários"
            />
            {isUserMenuOpen && (
              <DropdownMenu items={userOptions} setIsOpen={setIsUserMenuOpen} />
            )}
          </div>

          <div className={styles.menuItem}>
            <NavMenuButton
              onClick={() => {
                setIsResourcesMenuOpen(!isResourcesMenuOpen);
                setIsUserMenuOpen(false);
              }}
              label="Recursos"
            />
            {isResourcesMenuOpen && (
              <DropdownMenu
                items={resourcesOptions}
                setIsOpen={setIsResourcesMenuOpen}
              />
            )}
          </div>
        </>
      )}
      {userType && (<div className={styles.menuItem}>
        <NavMenuButton
          onClick={() => {
            setIsBookingMenuOpen(!isBookingMenuOpen);
          }}
          label="Agendamentos"
        />
        {isBookingMenuOpen && (
          <DropdownMenu
            items={bookingOptions}
            setIsOpen={setIsBookingMenuOpen}
          />
        )}
      </div>)}
    </div>
  );
}
