import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("http://localhost:3000/api/auth/signup", values)
      .then(({ data }) => {
        if (data.message === "success") {
          navigate("/Signin");
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
        setLoading(true);
      });
  }

  function makePasswordVisible() {
    setShowPassword(!showPassword);
  }

  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container-fluid  ">
          <div className="w-75 m-auto my-5 brdrshdow p-4">
            <h3>Register Now:</h3>
            <form onSubmit={register.handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control my-2"
                onChange={register.handleChange}
                onBlur={register.handleBlur}
              />
              {register.errors.name && register.touched.name ? (
                <div className="alert alert-danger">{register.errors.name}</div>
              ) : (
                ""
              )}

              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control my-2"
                onChange={register.handleChange}
                onBlur={register.handleBlur}
              />
              {register.errors.email && register.touched.email ? (
                <div className="alert alert-danger">
                  {register.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="password">Password</label>
              <div className=" position-relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control my-2"
                  onChange={register.handleChange}
                />
                <i
                  className={`cursor-pointer position-absolute passicon fa-regular ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => makePasswordVisible()}
                ></i>
              </div>
              {register.errors.password && register.touched.password ? (
                <div className="alert alert-danger">
                  {register.errors.password}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-control my-2"
                onChange={register.handleChange}
              />

              <p className="text-center mt-2">
                Already have an e-mail ?
                <Link
                  className="text-main text-decoration-underline ms-1"
                  to="/Signin"
                >
                  Signin
                </Link>
              </p>
              {errMsg ? (
                <div className="alert alert-danger"> {errMsg} </div>
              ) : (
                ""
              )}
              <button
                className="btn bg-main text-white mt-3"
                type="submit"
                disabled={!(register.dirty && register.isValid)}
              >
                {loading ? (
                  "Sign Up"
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
