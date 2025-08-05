import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import useUsers from "./hooks/useUsers";

const App = () => {
   const {
        users,
        setUsers,
        currentUsers,
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
   } = useUsers(); // Using Custom Hook here

   return (
    <div>
        <h1>User Management Table</h1>

        {loading ? (
            <p className="text-center">Loding Users...</p>
        ) : (
            <UserTable
                users={users}
                setUsers={setUsers}
                currentUsers={currentUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        )}
    </div>
   );
};


export default App;