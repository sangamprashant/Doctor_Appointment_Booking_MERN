import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";

function LoggedHome() {
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const { token } = useContext(AppContext);
  const navigate  =  useNavigate()

  useEffect(() => {
    if (token) {
      fetchDoctors();
    }
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/getAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprovedDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const convertToHHMM = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDoctorClick = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, { state: { doctor } });
  };

  return (
    <div className="row">
      {approvedDoctors.map((doctor, index) => (
        <div className="col-md-4 p-3 " key={doctor._id}>
          <div className="card p-3 cursor-pointer " onClick={()=>handleDoctorClick(doctor)}>
            <h3>
              {doctor.firstName} {doctor.lastName}
            </h3>
            <hr />
            <p>Phone Number: {doctor.phone}</p>
            <p>Address: {doctor.address}</p>
            <p>Fees: ₹{doctor.feesPerCunsaltation}</p>
            <p>
              Timings:{" "}
              {doctor.timings.map((time) => convertToHHMM(time)).join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoggedHome;
