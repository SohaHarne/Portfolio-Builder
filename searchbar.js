import { useState } from "react";


function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching:", search);

    // Later connect to backend
    // fetch(`/search?query=${search}`)
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search developers, students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;