import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIsLogged, setIsLoading } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.info("All fields are required");
    }

    const reqBody = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/login`,
        reqBody
      );
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setIsLogged(true);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.response.data);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Welcome Back</h1>
          <p className="col-lg-10 fs-4">
            Your one-stop platform for managing health appointments and
            services. Explore a variety of features, from booking appointments
            as a user to registering and applying as a doctor to serve your
            community.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg_light"
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                autoComplete="false"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log in
            </button>
            <hr className="my-4" />
            <small className="text-muted">
              By clicking Log in, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
