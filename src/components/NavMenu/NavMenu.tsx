import React, { JSX, useState } from "react";
import NavMenuButton from "../NavMenuButton/NavMenuButton";
import styles from "./NavMenu.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { FaUserPlus } from "react-icons/fa";
import { RiFileList2Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

type NavMenuProps = {
  userType: string;
};

const userOptions = new Map<string, { url: string; icon: JSX.Element }>([
  ["Cadastro", { url: "/cadastro/user", icon: <FaUserPlus size={18} /> }],
  ["Lista", { url: "/listuser", icon: <RiFileList2Line size={18} /> }],
  ["Edição", { url: "/resources", icon: <MdEdit size={18} /> }],
]);

const resourcesOptions = new Map<string, { url: string; icon: JSX.Element }>([
  ["Cadastro", { url: "/cadastro/resources", icon: <IoMdAdd size={18} /> }],
  ["Lista", { url: "/listresources", icon: <RiFileList2Line size={18} /> }],
  ["Edição", { url: "/resources", icon: <MdEdit size={18} /> }],
]);

export default function NavMenu({ userType }: NavMenuProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);

  return (
    <div className={styles.navMenu}>
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
    </div>
  );
}
