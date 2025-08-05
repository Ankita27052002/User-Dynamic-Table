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
  //  State for search term
  const [searchTerm, setSearchTerm] = useState("");

  //  Index of the row currently being edited
  const [editIdx, setEditIdx] = useState(null);

  //  Stores the currently edited user's data
  const [editedUser, setEditedUser] = useState({});

  //  Filter current page users based on name, email, or phone
  const filtered = currentUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Handle field change while editing
  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //  Start editing a specific row
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditedUser(filtered[idx]); // copy the user data into edit state
  };

  //  Save changes made to a user
  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setEditIdx(null); // exit edit mode
  };

  //  Delete a user by ID
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/*  Search Bar Component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/*  User Table */}
      <table className="w-full border mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/*  Show message when no user matches search */}
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No users match your search.
              </td>
            </tr>
          ) : (
            //  Render filtered users
            filtered.map((user, idx) => (
              <tr key={user.id} className="border">
                {/* Name Column */}
                <td className="p-2 border">
                  {editIdx === idx ? (
                    <div className="flex gap-2">
                      <input
                        value={editedUser.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="First Name"
                        className="border p-1 rounded w-full"
                      />
                      <input
                        value={editedUser.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Last Name"
                        className="border p-1 rounded w-full"
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
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="border p-1 rounded w-full"
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
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    user.phone
                  )}
                </td>

                {/* Action Buttons */}
                <td className="p-2 border flex gap-2">
                  {editIdx === idx ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(idx)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/*  Pagination Controls */}
      <div className="flex justify-center mt-6 items-center gap-2">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
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
