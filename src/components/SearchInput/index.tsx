import { Input } from "antd";
import { useEffect, useMemo, useState, ChangeEvent } from "react";
import debounce from "lodash.debounce";
import styles from "./index.module.css";

type Props = {
  onSearch: (value: string) => void;
};

const SearchInput = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val.trim().toLowerCase());
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <Input
        placeholder="Поиск криптовалюты..."
        value={value}
        onChange={handleChange}
        allowClear
        className={styles.input}
      />
    </div>
  );
};

export default SearchInput;
