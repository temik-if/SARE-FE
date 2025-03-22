import React from "react";
import styles from "./UserListItem.module.css";
import { FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import { IUser } from "@/types/user";

interface UserListItemProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.userItem}>
      <div className={styles.avatar}>
        {user.profile_picture ? (
          <img src={user.profile_picture} alt={user.full_name} />
        ) : (
          <div className={styles.defaultAvatar}>{user.first_name[0]}</div>
        )}
      </div>

      <div className={styles.userInfo}>
        <span className={styles.userName}>{user.full_name}</span>
        <span className={styles.userType}>
          {user.type === "TEACHER" ? "Professor" : "Coordenador"}
        </span>
      </div>

      <div className={styles.actions}>
        <div className={styles.tooltip}>
          <a href={`mailto:${user.email}`} className={styles.emailLink}>
            <FaEnvelope className={styles.icon} />
          </a>
          <span className={styles.tooltipText}>{user.email}</span>
        </div>
        <FaEdit className={styles.icon} onClick={() => onEdit(user)} />
        <FaTrash className={styles.icon} onClick={() => onDelete(user)} />
      </div>
    </div>
  );
};

export default UserListItem;
