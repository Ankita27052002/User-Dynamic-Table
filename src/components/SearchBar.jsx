const SearchBar = ({ filters, setFilters}) => {
    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <input 
                type="text"
                name="name"
                placeholder="Search by Name"
                value={filters.name}
                onChange={handleChange}
                className="border p-2 rounded w-full sm:w-60"
             />

             <input 
                type="text"
                name="email"
                placeholder="Search by Email"
                value={filters.email}
                onChange={handleChange}
                className="border p-2 rounded w-full sm:w-60"
             />

             <input 
                type="text"
                name="phone"
                placeholder="Search by phone"
                value={filters.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full sm:w-60"
             />

        </div>
    );
};

export default SearchBar;