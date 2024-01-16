import React, { useContext, useState } from "react";
import { Col, TimePicker } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./DoctorApply.css"
import { AppContext } from "../../../AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorApply() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
    timings: [],
  });
  const { token, setToken, isLogged, setIsLogged, user } =
  useContext(AppContext);

  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimingChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      timings: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.website &&
      formData.address &&
      formData.specialization &&
      formData.experience &&
      formData.feesPerCunsaltation &&
      formData.timings.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.info("Please fill in all fields.");
      return;
    }
    console.log(formData);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/apply-doctor`,
         {...formData,
          userId:user._id,
          email:user.email,
        } ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
  
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.info(response.data.message)
      }
    } catch (error) {
      console.log("Error while fetching the user data:",error)
      toast.error("Something went wrong")
    }


  };
  return (
    <div>
      <h1>Apply Doctor</h1>
      <hr />
      <h3 className="apply-sub-title">Personal Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="f-name">First Name</label>
            <input
              type="text"
              id="f-name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleFormChange("firstName", e.target.value)}
              className="form-control"
              placeholder="First Name"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="l-name">Last Name</label>
            <input
              type="text"
              id="l-name"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleFormChange("lastName", e.target.value)}
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="p-number">Phone Number</label>
            <input
              type="number"
              id="p-number"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleFormChange("phone", e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={(e) => handleFormChange("website", e.target.value)}
              className="form-control"
              placeholder="Website"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="asdress">Address</label>
            <input
              type="text"
              id="adsress"
              name="address"
              value={formData.address}
              onChange={(e) => handleFormChange("address", e.target.value)}
              className="form-control"
              placeholder="Address"
            />
          </div>
        </div>
        <hr />
        <h3 className="apply-sub-title">Professional Information</h3>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              className="form-control"
              name="specialization"
              value={formData.specialization}
              onChange={(e) =>
                handleFormChange("specialization", e.target.value)
              }
              placeholder="Specialization"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={(e) => handleFormChange("experience", e.target.value)}
              className="form-control"
              placeholder="Experience"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="feesPerCunsaltation">Fees Per Cunsaltation</label>
            <input
              type="text"
              id="feesPerCunsaltation"
              name="feesPerCunsaltation"
              value={formData.feesPerCunsaltation}
              onChange={(e) =>
                handleFormChange("feesPerCunsaltation", e.target.value)
              }
              className="form-control"
              placeholder="Fees Per Cunsaltation"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="timings">Timings</label>
            <TimePicker.RangePicker
              className="w-100"
              onChange={handleTimingChange}
              format='HH:mm'
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorApply;
