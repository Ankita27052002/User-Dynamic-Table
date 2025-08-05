import { useState } from "react";
import SearchBar from "./SearchBar";

const UserTable = ({
    users,
    setUsers,
    currentUsers,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
}) => {
    // State to track which row is being edited
    const [editIdx, setEditIdx] = useState(null);

    //State to store currently edited user's data
    const [editedUser, setEditedUser] = useState({});

    // State for column-wise  search filters
    const [filters, setFilters] = useState({
        name : "",
        email : "",
        phone : "",
    });

    // Handle edit button click
    const handleEdit = (idx) => {
        setEditIdx(idx); // Mark the row being edited
        setEditedUser({...currentUsers[idx]}); // Clone current user to edit
    };

    // Handle delete button click
    const handleDelete = (id) => {
        const updated = users.filter((user) => user.id !== id);
        setUsers(updated); // Remove the user from main list

    };

    // Handle save after editing
    const handleSave = () => {
        const updatedUsers = users.map((user) => 
            user.id === editedUser.id ? editedUser : user
        );
        setUsers(updatedUsers); // Update user in main list
        setEditIdx(null); // Exit edit mode
    };

    // Handle input field changes during editing
    const handleChange = (field, value) => {
        setEditedUser({ ...editedUser, [field]: value});
    };

    // Apply search filters to each user
    const applyFilters = (user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return (
            fullName.includes(filters.name.toLowerCase()) &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            user.phone.toLowerCase().includes(filters.phone.toLowerCase())

        );
    };

    // Final filtered user list (only for current page)
    const filtered = currentUsers.filter(applyFilters);

    return (
        <div>
            {/* Column-wise filter input fields */}
            <SearchBar filters={filters} setFilters={setFilters} />

            {/* User Data Table */}
            <table>
                <thead>
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        //Empty result state
                        <tr>
                            <td>No users match your search.</td>
                        </tr>
                    ) : (
                        filtered.map((user, idx) => (
                            <tr>
                                {/* Name Column */}
                                <td>
                                    {editIdx === idx ? (
                                        <div>
                                            <input 
                                                value={editedUser.firstName}
                                                onChange={(e) => 
                                                handleChange("firstName", e.target.value)}
                                                placeholder="First Name"
                                            />

                                            <input
                                                value={editedUser.lastName}
                                                onChange={(e) =>
                                                handleChange("lastName", e.target.value)
                                                }
                                                className="w-full p-1 border rounded"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    ) : (
                                        `${user.firstName} ${user.lastName}`
                                    )}
                                </td>


                                {/* Email Column */}
                                 <td className="p-2 border">
                                    {editIdx === idx ? (
                                        <input
                                            value={editedUser.email}
                                            onChange={(e) =>
                                            handleChange("email", e.target.value)
                                        }
                                            className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>


                                {/* Phone Column */}
                                <td className="p-2 border">
                                    {editIdx === idx ? (
                                        <input
                                            value={editedUser.phone}
                                            onChange={(e) =>
                                            handleChange("phone", e.target.value)
                                        }
                                        className="w-full p-1 border rounded"
                                        />
                                    ) : (
                                        user.phone
                                    )}
                                </td>


                                {/* Action Buttons */}
                                <td>
                                    {editIdx === idx ? (
                                        <button 
                                            onClick={handleSave}
                                            className="bg-green-50 text-white">
                                            Save

                                        </button>
                                    ) : (
                                        <button onClick={() => handleEdit(idx)}
                                        className="bg-yellow-500 text-white"
                                        >
                                        Edit

                                        </button>
                                       
                                    )}
                                    <button onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>


            {/* Pagination Controls */}
            <div flex justify-center mt-4 gap-2 items-center>
                <button 
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-200"
                >
                    Prev
                </button>

                {/* Page Number Buttons */}
                {Array.from({length: totalPages}, (_, i) => i+1).map((page) => (
                    <button key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                            page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                {/* Next Button */}
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );

};


export default UserTable;