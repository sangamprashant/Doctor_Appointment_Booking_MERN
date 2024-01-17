import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function AdminDoctors() {
  const { token, setIsLoading } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/getAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelUpdateStatus = async (id, status) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/admin/changeAccountStatus`,
        {
          doctorId: id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchDoctors();
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Faile to uspadyte the doctor", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Doctors List</h1>
      <table className="table table-borderless">
        <thead className="table-head">
          <tr>
            <td>Name</td>
            <td>Phone</td>
            <td>Created At</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{`${doctor.firstName} ${doctor.lastName}`}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.createdAt}</td>
              <td>{doctor.status}</td>
              <td>
                <div className="d-flex gap-1">
                  {doctor.status === "pending" ? (
                    <>
                      <a
                        className="btn btn-success"
                        onClick={() =>
                          handelUpdateStatus(doctor._id, "approved")
                        }
                      >
                        Accept
                      </a>
                      {/* <a className="btn btn-danger">Decline</a> */}
                    </>
                  ) : (
                    <a
                      className="btn btn-danger"
                      onClick={() => handelUpdateStatus(doctor._id, "pending")}
                    >
                      Block
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDoctors;
