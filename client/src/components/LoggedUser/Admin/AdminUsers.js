import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import  "./Admin.css"

function AdminUsers() {
  const { token } = useContext(AppContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data); 
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  console.log(users)

  return (
    <div>
      <h1>Users List</h1>
      <table className="table ">
        <thead className="table-head">
          <tr>
            <td>Name</td>
            <td>Email</td>

          </tr>
        </thead>
        <tbody>
          {users.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
