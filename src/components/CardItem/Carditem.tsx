import styles from "./CardItem.module.css";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

interface CardItemProps {
  data1: string;
  data2: string;
  type: string;
  onDelete?: () => void;
}

export default function CardItem({ data1, data2, type, onDelete }: CardItemProps) {
  return (
    <div className={styles.cardItem}>
      {type === "user" ? (
        <span> Professor(a): {data1}</span>
      ) : (
        <span>{data1}</span>
      )}
      <span>{data2}</span>
      <div>
        <MdModeEdit color="#fff" size={24} />
        <RiDeleteBinLine 
          color="#fff" 
          size={24} 
          onClick={onDelete}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}