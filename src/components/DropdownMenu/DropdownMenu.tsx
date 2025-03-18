import React, { JSX, useEffect, useRef } from "react";
import styles from "./DropdownMenu.module.css";
import Link from "next/link";

type DropdownMenuProps = {
  items: Map<string, { icon: JSX.Element; url?: string; action?: () => void }>;
  setIsOpen: (isOpen: boolean) => void;
};

export default function DropdownMenu({ items, setIsOpen }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={menuRef} className={styles.menu}>
      {Array.from(items.entries()).map(([label, { icon, url, action }]) => (
        <div key={label} className={styles.menuItem}>
          {url ? (
            <Link
              href={url}
              className={styles.link}
              onClick={() => setIsOpen(false)}
            >
              <span>{label}</span>
              {icon}
            </Link>
          ) : (
            <button
              className={styles.button}
              onClick={() => {
                action?.();
                setIsOpen(false);
              }}
            >
              <span>{label}</span>
              {icon}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
