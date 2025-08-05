import { useState } from "react";
import SearchBar from "./SearchBar";

const UserTable = ({
  users,
  setUsers,
  currentUsers,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [editIdx, setEditIdx] = useState(null); // Currently edited row index
  const [editedUser, setEditedUser] = useState({}); // Edited user state

  // Filter current users based on name, email, or phone
  const filtered = currentUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle field update in edit mode
  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  // Activate edit mode for a row
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditedUser(filtered[idx]);
  };

  // Save updated user
  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setEditIdx(null);
  };

  // Delete user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-serif text-[#22223b]">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#4a4e69]">
        User Management Table
      </h2>

      {/* Search bar */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Table */}
      <div className="overflow-x-auto bg-[#f2e9e4] rounded-xl shadow-lg border border-[#c9ada7]">
        <table className="w-full text-sm md:text-base border-collapse">
          <thead className="bg-[#4a4e69] text-[#f2e9e4]">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Email</th>
              <th className="p-4 text-left font-medium">Phone</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-[#9a8c98] font-semibold">
                  No users match your search.
                </td>
              </tr>
            ) : (
              filtered.map((user, idx) => (
                <tr
                  key={user.id}
                  className="border-t border-[#c9ada7] hover:bg-[#e8dcdc] transition duration-200"
                >
                  {/* Name */}
                  <td className="p-4">
                    {editIdx === idx ? (
                      <div className="flex gap-2">
                        <input
                          value={editedUser.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          placeholder="First Name"
                          className="border border-[#c9ada7] bg-white p-2 rounded w-full"
                        />
                        <input
                          value={editedUser.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          placeholder="Last Name"
                          className="border border-[#c9ada7] bg-white p-2 rounded w-full"
                        />
                      </div>
                    ) : (
                      `${user.firstName} ${user.lastName}`
                    )}
                  </td>

                  {/* Email */}
                  <td className="p-4">
                    {editIdx === idx ? (
                      <input
                        value={editedUser.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="border border-[#c9ada7] bg-white p-2 rounded w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  {/* Phone */}
                  <td className="p-4">
                    {editIdx === idx ? (
                      <input
                        value={editedUser.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="border border-[#c9ada7] bg-white p-2 rounded w-full"
                      />
                    ) : (
                      user.phone
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex gap-2">
                    {editIdx === idx ? (
                      <button
                        onClick={handleSave}
                        className="bg-[#4a4e69] hover:bg-[#3b3d57] text-[#f2e9e4] px-4 py-1 rounded shadow-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(idx)}
                        className="bg-[#9a8c98] hover:bg-[#8d7e88] text-white px-4 py-1 rounded shadow-md"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#c9ada7] text-white px-4 py-1 rounded shadow disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-1 rounded shadow font-medium ${
              page === currentPage
                ? "bg-[#4a4e69] text-white"
                : "bg-[#f2e9e4] text-[#4a4e69] border border-[#c9ada7]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-[#c9ada7] text-white px-4 py-1 rounded shadow disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
