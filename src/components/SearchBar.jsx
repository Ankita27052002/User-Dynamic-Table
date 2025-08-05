const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        className="border border-[#c9ada7] p-3 rounded w-full shadow-md bg-[#f2e9e4] text-[#22223b] placeholder-[#9a8c98] focus:outline-none focus:ring-2 focus:ring-[#c9ada7]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
