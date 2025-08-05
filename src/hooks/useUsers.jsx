import { useState, useEffect } from "react";
import axios from "axios";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Fetching users data from API and handling the error
    useEffect(() => {
        axios.get("https://dummyjson.com/users")
        .then((response) => {
            setUsers(response.data.users);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error in Fetching Users:", error);
            setLoading(false);
        })
    }, []);

    // Necessary calculations 
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = users.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return {
        users,
        setUsers,
        currentUsers,
        loading,
        currentPage,
        setCurrentPage,
        totalPages,
    };
};

export default useUsers;