

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        className="border border-gray-300 p-2 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
