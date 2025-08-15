import { useEffect, useMemo, useState } from "react";
import useCrmStore from "@/store/useCrmStore";
import userStore from "@/store/userStore";
import MultiSelect from "@/shared/selector/Selector";
import Button from "@/shared/button/Button";
import styles from "./styles.module.css";

interface FilterProps {
      type: "requests" | "archive" | "reviews";
}

const Filter: React.FC<FilterProps> = ({ type }) => {
      const { requests, archive, reviews, setFilter, resetFilters, isFiltering } = useCrmStore();
      const { users } = userStore();
      const [date, setDate] = useState("")

      const data = useMemo(() => {
            switch (type) {
                  case "archive":
                        return archive;
                  case "reviews":
                        return reviews;
                  default:
                        return requests;
            }
      }, [type, requests, archive, reviews]);

      const executers = useMemo(() => users.map((el) => el.username), []);
      const clients = useMemo(() => [...new Set(data.map((el) => el.client))], []);
      const statuses = useMemo(() => [...new Set(data.map((el) => el.status))], []);
      useEffect(() => {
            if (isFiltering[type] === false) {
                  setDate("")
            }
      }, [isFiltering[type]])
      return (
            <div className={styles.filterContainer}>
                  <div className={styles.filterItem}>
                        <MultiSelect
                              clearOn={isFiltering[type]}
                              placeholder="Executers"
                              options={executers}
                              onSelect={(all) => setFilter(type, "executor", all)}
                        />
                  </div>

                  <div className={styles.filterItem}>
                        <MultiSelect
                              clearOn={isFiltering[type]}
                              placeholder="Clients"
                              options={clients}
                              onSelect={(all) => setFilter(type, "client", all)}
                        />
                  </div>

                  <div className={styles.filterItem}>
                        <MultiSelect
                              clearOn={isFiltering[type]}
                              placeholder="Statuses"
                              options={statuses}
                              onSelect={(all) => setFilter(type, "status", all)}
                        />
                  </div>

                  <div className={styles.filterItem}>
                        <input className={styles.date} value={date} type="date" onChange={(e) => {
                              setFilter(type, "dedline", e.target.value)
                              setDate(e.target.value)
                        }} />
                  </div>
                  {isFiltering[type] && <Button text="Reset filters" onClick={() => resetFilters()} />}
            </div>
      );
};

export default Filter;
