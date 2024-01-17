import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookIcon2 } from "../../../assets";
import { DatePicker, TimePicker } from "antd";
import { AppContext } from "../../../AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

function BookAppointment() {
  const location = useLocation();
  const { doctor } = location.state || {};
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const { token, setToken, isLogged, setIsLogged, user } =
    useContext(AppContext);
  const [isAvailable, setIsAvailable] = useState(false);

  if (!doctor) {
    return (
      <div>
        Doctor details not available. Please go back and select a doctor.
      </div>
    );
  }

  const convertToHHMM = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handelChangeData = () => {
    setIsAvailable(false);
  };

  const handleCheckAvailability = async () => {
    try {
      if (!selectedTime || !selectedDate) {
        toast.info("Please select a date & time.");
        return;
      }

      const selectedDateTime = selectedTime.toDate();
      const selectedTimeString = selectedTime.format("HH:mm");
      const selectdDateString = selectedDate.format("DD-MM-YYYY");
      const doctorStartTiming = new Date(doctor.timings[0]);
      const doctorEndTiming = new Date(
        doctor.timings[doctor.timings.length - 1]
      );
      if (
        selectedDateTime <
          doctorStartTiming.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }) ||
        selectedDateTime >
          doctorEndTiming.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
      ) {
        toast.info(
          "Selected time is not within the doctor's available timings."
        );
        setIsAvailable(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/booking-availability`,
        {
          doctorId: doctor._id,
          date: selectdDateString,
          time: selectedTimeString,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsAvailable(response.data.available);
        if (response.data.available) {
          toast.success(response.data.message);
        } else {
          toast.info(response.data.message);
        }
      } else {
        console.error("Error checking availability:", response.data.message);
      }
    } catch (error) {
      console.error("Error checking availability:", error.message);
    }
  };

  const handleBookAppointment = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        toast.info("Please select a date and time.");
        return;
      }

      const reqBody = {
        doctorInfo: {
          userId: doctor.userId,
          name: `${doctor.firstName} ${doctor.lastName}`,
          email: doctor.email,
          phone: doctor.phone,
        },
        doctorId: doctor._id,
        userInfo: { name: user.name, email: user.email },
        userId: user._id,
        date: selectedDate.format("DD-MM-YYYY"),
        time: selectedTime.format("HH:mm"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/book-appointment`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        console.error("Error booking appointment:", response.data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error.message);
    }
  };

  // console.log("selectedDate", selectedDate?.format("DD-MM-YYYY"));
  // console.log("selectedTime", selectedTime?.format("HH:mm A"));

  return (
    <div>
      <h1>Book Appointment</h1>
      <h3 className="apply-sub-title">
        {doctor.firstName} {doctor.lastName}
      </h3>
      <hr />
      <div className="row mt-5 align-items-center">
        <div className="col-md-5 d-flex justify-content-end">
          <img src={BookIcon2} alt="" />
        </div>
        <div className="col-md-5">
          <p>
            Timings:{" "}
            {doctor.timings.map((time) => convertToHHMM(time)).join(", ")}
          </p>
          <p>Phone Number: {doctor.phone}</p>
          <p>Fees Per Visit: ₹{doctor.feesPerCunsaltation}</p>
          <p>Website: {doctor.website}</p>
          <p>Address: {doctor.address}</p>
          <DatePicker
            className="form-control mt-2"
            format="DD-MM-YYYY"
            onChange={(date) => {
              // setSelectedDate(moment(date).format("DD-MM-YYYY"));
              setSelectedDate(date)
              handelChangeData();
            }}
          />
          <TimePicker
            format="HH:mm A"
            className="form-control mt-2"
            onChange={(time) => {
              // setSelectedTime(moment(time).format("HH:mm"));
              setSelectedTime(time)
              handelChangeData();
            }}
          />
          {!isAvailable ? (
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </button>
          ) : (
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleBookAppointment}
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
