import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate(); // Used for programmatic navigation
  const [allUsers, setAllUsers] = useState([]); // State to store all users fetched from backend

  /**
   * Clears all users from backend and updates local state
   */
  const clearUsers = async () => {
    try {
      await axios.post("/api/v1/user/clearUsers");
      setAllUsers([]); // Clear local state immediately for UI update
    } catch (error) {
      console.error("Error clearing users:", error);
    }
  };

  /**
   * Fetches all users from backend and updates local state
   */
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/user/getUsers');
      setAllUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  /**
   * Deletes a user by ID and updates local state
   * @param {string} userId - ID of the user to delete
   */
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/v1/user/deleteUser/${userId}`);
      setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  /**
   * Runs once on component mount to fetch all users
   */
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="flex justify-center flex-col items-center w-screen h-screen">
        {/* Header controls */}
        <div className="relative w-[400px] h-[40px] p-4 rounded-lg mb-2">
          <div className="absolute bottom-0 left-0 flex space-x-2">
            <Button onClick={() => navigate("/addform")}>Add +</Button>
            <Button onClick={clearUsers}>Clear List</Button>
          </div>
        </div>

        {/* Users table */}
        <Table className="w-[400px] mx-auto border-2">
          <TableCaption>List of Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Email</TableHead>

              <TableHead className="text-right">Updation</TableHead>
              <TableHead className="text-right">Deletion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.email}</TableCell>

                {/* Update button navigates to form with user ID */}
                <TableCell className="text-right">
                  <Button onClick={() => navigate(`/addform/${user._id}`)}>Update</Button>
                </TableCell>

                {/* Delete button triggers deletion */}
                <TableCell className="text-right">
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Home;
