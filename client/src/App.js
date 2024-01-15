import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  DoctorApply,
  Footer,
  Home,
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

  console.log(isLogged);

  useEffect(() => {
    const fetchData = async () => {
      if (token && isLogged) {
        const data = await fetchUserData(token);
        setUser(data);
      }
    };

    fetchData();
  }, [token, isLogged]);

  return (
    <AppContext.Provider
      value={{ token, setToken, isLogged, setIsLogged, user, setUser }}
    >
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
          <Routes>
            <Route path="/" element={<LoggedHome />} />
            <Route path="/apply-doctor" element={<DoctorApply />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </Sidebar>
      )}
    </AppContext.Provider>
  );
}

export default App;
