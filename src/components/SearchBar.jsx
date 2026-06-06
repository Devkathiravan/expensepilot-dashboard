export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
