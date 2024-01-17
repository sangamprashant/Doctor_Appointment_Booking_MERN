import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  AdminDoctors,
  AdminUsers,
  Appointments,
  BookAppointment,
  DoctorApply,
  DoctorAppointment,
  DoctorUpdate,
  Footer,
  Home,
  LoadingContainer,
  LoggedHome,
  Login,
  Navbar,
  Notifications,
  Register,
  Sidebar,
} from "./components";
import { AppContext } from "./AppContext";
import { useEffect, useState } from "react";
import { fetchUserData } from "./ApiCalls";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // todo protect the path, old-date booking, check the timing range, /profile is not present

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (token && isLogged) {
        const data = await fetchUserData(token);
        setUser(data);
      }
    };

    fetchData();

    if (token) {
      document.title = user?.isAdmin
        ? "Health-Connect | Admin"
        : user?.isDoctor
        ? "Health-Connect | Doctor"
        : "Health-Connect | User";
    } else {
      document.title = "Health-Connect";
    }
  }, [token, isLogged, user]);

  return (
    <AppContext.Provider
      value={{ token, setToken, isLogged, setIsLogged, user, setUser, setIsLoading,}}>
      {!isLogged ? (
        <>
          <Navbar />
          <div className="container-fulid before-login">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
        </>
      ) : (
        <Sidebar>
          <LoadingContainer isLoading={isLoading} />
          <Routes>
            {/* common */}
            <Route path="/" element={<LoggedHome />} />
            <Route path="/notification" element={<Notifications />} />
            {/* user */}
            <Route path="/apply-doctor" element={<DoctorApply />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/book-appointment/:id" element={<BookAppointment />} />
            {/* doctor */}
            <Route path="/user/appointments" element={<DoctorAppointment />} />
            <Route path="/doctor/profile/:id" element={<DoctorUpdate />} />
            {/* admin */}
            <Route path="/admin/doctors" element={<AdminDoctors />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </Sidebar>
      )}
    </AppContext.Provider>
  );
}

export default App;
