import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import TableCoins from "../../components/TableCoins";

const CoinList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <SearchInput onSearch={setSearchQuery} />
      <TableCoins searchQuery={searchQuery} />
    </>
  );
};

export default CoinList;
