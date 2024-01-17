import { Table, Button, Space, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { AppContext } from "../../../AppContext";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { token, setToken, isLogged, setIsLogged, user,setIsLoading } =
    useContext(AppContext);

  useEffect(() => {
    if (token && user) {
      fetchAppointments();
    }
  }, [token, user]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/doctor/doctor-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch the appointments", error);
    }finally{
      setIsLoading(false)
    }
  };

  const handleStatus = async (appointmentsId, status) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/doctor/update-status`,
        {
          appointmentsId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAppointments();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error approving appointment", error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Table dataSource={appointments} pagination={false}>
      <Table.Column title="ID" dataIndex="_id" key="_id" />
      <Table.Column
        title="Patient"
        dataIndex={["userInfo", "name"]}
        key="doctorName"
      />
      <Table.Column
        title="Email"
        dataIndex={["userInfo", "email"]}
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
      <Table.Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            {record.status === "pending" && (
              <>
                <Button
                  type="primary"
                  onClick={() => handleStatus(record._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  type="danger"
                  onClick={() => handleStatus(record._id, "rejected")}
                >
                  Reject
                </Button>
              </>
            )}
          </Space>
        )}
      />
    </Table>
  );
}

export default DoctorAppointments;
