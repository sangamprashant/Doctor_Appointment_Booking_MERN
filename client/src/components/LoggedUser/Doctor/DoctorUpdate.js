import React, { useContext, useEffect, useState } from "react";
import DoctorApply from "./DoctorApply";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../AppContext";

function DoctorUpdate() {
  const { token, user, setIsLoading } = useContext(AppContext);
  const { id } = useParams();
  const [DoctorData, setDoctorData] = useState(null);

  useEffect(() => {
    if (id && token && user) {
      fetchDoctor();
    }
  }, [id, token, user]); // Include token and user in the dependency array

  const fetchDoctor = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/doctor/getDoctorInfo`,
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctorData(response.data.data);
    } catch (error) {
      console.log("Failed to fetch the doctor data");
    } finally {
      setIsLoading(false);
    }
  };

  return <DoctorApply DoctorData={DoctorData} />;
}

export default DoctorUpdate;
