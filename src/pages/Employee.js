import React, { useEffect, useState } from 'react';
import UserForm from './CreateEmployee';
import Sidebar from '../components/Sidebar';
import EmployeeTable from '../components/EmployeeTable';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Employee() {
  // Step 2: Define a state variable for users and a function to update it.
  const [users, setUsers] = useState([]);

  const fetchUsers = async (name) => {
    try {
        const response = await axios.get(`${process.env.HOST}/api/users/`, {
        });
        console.log(response.data)
        setUsers(response.data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
    }

    const handleDeleteUser = async (userId) => {
        try {
          // Send a DELETE request to your API to delete the user with the given ID
          await axios.delete(`${process.env.HOST}/api/users/${userId}/`);
          // After successful deletion, fetch the updated user list
          fetchUsers();
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      };

  // Step 3: Use useEffect to fetch users when the component mounts.
  useEffect(() => {
    // Replace this with your API endpoint URL.
    fetchUsers();
  }, []); // The empty array [] means this effect runs once after mounting.

  return (
    <div className="">
      <Sidebar />
      <div className="ml-64 mt-4 p-4">
        <div className="flex justify-between px-2">
          <h1 className="text-xl font-bold">Employee</h1>
          <Link to="/create/employee">
            <button className="bg-[#4b49ac] p-2 rounded-md text-white">
              Create Employee
            </button>
          </Link>
        </div>
        <div className="px-4">
          {/* Step 4: Pass the fetched users data to EmployeeTable */}
          <EmployeeTable users={users} onDelete={handleDeleteUser} />
        </div>
      </div>
    </div>
  );
}
