import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // console.log(process.env.VITE_BACKEND_API)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.info("All fields are required");
    }

    const reqBody = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/register`,
        reqBody
      );

      if (response.data.success) {
        // success
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">
            Welcome to BOOTSTRAPFINDS
          </h1>
          <p className="col-lg-10 fs-4">
            Discover a wide range of pre-made Bootstrap components and code
            snippets at BOOTSTRAPFINDS. Streamline your web development with our
            collection of ready-to-use, responsive design elements.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg_light"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Name"
                // required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                // required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                // required
                placeholder="Password"
                autoComplete="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign up
            </button>
            <hr className="my-4" />
            <small className="text-muted">
              By clicking Sign up, you agree to the terms of use.
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
