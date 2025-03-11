import styles from "./DataList.module.css";
import React from "react";
import CardItem from "../CardItem/Carditem";

interface ListDadosProps {
  title: string;        
  buttonLabel: string;  
  dataList: { id: number; data1: string; data2: string }[];
  listType: string;
  onDeleteUser?: (user: any) => void;
}

export default function ListDados({ title, buttonLabel, dataList, listType, onDeleteUser }: ListDadosProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <button>{buttonLabel}</button>
      </div>
      
      <div className={styles.cards}>
        <div className={styles.listcards}>
          {dataList.map((item) => (
            <CardItem 
              key={item.id} 
              data1={item.data1} 
              data2={item.data2} 
              type={listType}
              onDelete={() => onDeleteUser && onDeleteUser(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}