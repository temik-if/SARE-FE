import { useState, MouseEvent } from "react";
import { BiUser, BiLogOut } from "react-icons/bi";
import { Avatar } from "@mui/material";
import styles from "./ProfileMenu.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Session } from "next-auth";

type ProfileMenuProps = {
  onLogout: () => void;
  session: Session | null;
};

export default function ProfileMenu({ onLogout, session }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = new Map([
    ["Meus dados", { icon: <BiUser size={18} />, url: "/profile" }],
    ["Sair", { icon: <BiLogOut size={18} />, action: onLogout }],
  ]);

  return (
    <div className={styles.profileMenu}>
      <div className={styles.avatarContainer}>
        <Avatar
          className={styles.avatar}
          alt={session?.user?.name || "User"}
          src={session?.user?.profilePicture || ""}
          onClick={handleClick}
        />
      {isOpen && <DropdownMenu items={menuItems} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}
