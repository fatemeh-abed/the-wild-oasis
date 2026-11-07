import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchPrams, setSearchPrams] = useSearchParams();
  const sortBy = searchPrams.get("sortBy") || "";

  function handleChange(e) {
    searchPrams.set("sortBy", e.target.value);
    setSearchPrams(searchPrams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}
