import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

interface MultiSelectProps {
      options: string[];
      onSelect?: (allSelected: string[]) => void;
      placeholder?: string;
      clearOn?: boolean
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, clearOn = false, onSelect, placeholder = "Выбрать..." }) => {
      const [selected, setSelected] = useState<string[]>([]);
      const [open, setOpen] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);

      const toggleOption = (option: string) => {
            let newSelected: string[];
            if (selected.includes(option)) {
                  newSelected = selected.filter((item) => item !== option);
            } else {
                  newSelected = [...selected, option];
            }
            setSelected(newSelected);
            onSelect?.(newSelected);
      };

      const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                  setOpen(false);
            }
      };

      useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
      
      useEffect(() => {
            if (clearOn === false) {
                  setSelected([])
            }
      }, [clearOn])

      return (
            <div className={styles.dropdownContainer} ref={containerRef}>
                  <div className={styles.dropdownHeader} onClick={() => setOpen(!open)}>
                        {selected.length > 0 ? selected.join(", ") : placeholder}
                        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
                  </div>
                  {open && (
                        <div className={styles.dropdownList}>
                              {options.map((option) => (
                                    <div
                                          key={option}
                                          className={`${styles.option} ${selected.includes(option) ? styles.selected : ""}`}
                                          onClick={() => toggleOption(option)}
                                    >
                                          {option}
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
};

export default MultiSelect;
