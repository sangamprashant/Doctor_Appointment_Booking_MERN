import { Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library
import { AppContext } from "../../../AppContext";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const { token, setToken, isLogged, setIsLogged, user } =
    useContext(AppContext);

  useEffect(() => {
    if (token && user) {
      fetchAppointments();
    }
  }, [token, user]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/user-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set the fetched appointments to the state
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch the appointments", error);
    }
  };

  return (
    <Table dataSource={appointments} pagination={false}>
      <Table.Column title="ID" dataIndex="_id" key="_id" />
      <Table.Column
        title="Doctor"
        dataIndex={["doctorInfo", "name"]}
        key="doctorName"
      />
      <Table.Column
        title="Phone"
        dataIndex={["doctorInfo", "phone"]}
        key="doctorPhone"
      />
      <Table.Column
        title="Date & Time"
        dataIndex={["date", "time"]}
        key="dateTime"
        render={(text, record) => (
          <>
            {moment(record.date).format("DD-MM-YYYY")}{" "}
            {moment(record.time).format("HH:mm A")}
          </>
        )}
      />
      <Table.Column title="Status" dataIndex="status" key="status" />
    </Table>
  );
}

export default Appointments;
