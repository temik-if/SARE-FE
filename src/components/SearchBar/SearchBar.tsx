import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Buscar agendamento..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        <BiSearch size={18} className={styles.icon} />
      </button>
    </div>
  );
}
