import { useState, MouseEvent } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import styles from "./ProfileMenu.module.css";
import { Session } from "next-auth";

type ProfileMenuProps = {
  onLogout: () => void;
  session: Session | null;
};

export default function ProfileMenu({ onLogout, session }: ProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        className={styles.avatar}
        alt={session?.user?.name}
        src={session?.user?.profilePicture}
        onClick={handleClick}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Meus dados</MenuItem>
        <MenuItem onClick={onLogout}>Sair</MenuItem>
      </Menu>
    </>
  );
}
