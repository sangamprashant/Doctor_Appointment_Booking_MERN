import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Footer, Home, Login, Navbar, Register } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="container-fulid before-login">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      <Footer/>
      </div>
    </>
  );
}

export default App;
