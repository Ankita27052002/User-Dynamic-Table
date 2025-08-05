import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import useUsers from "./hooks/useUsers";
import TableSkeletonShimmer from "./components/TableSkeletonShimmer";

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
        

        {loading ? (
            <TableSkeletonShimmer/>
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