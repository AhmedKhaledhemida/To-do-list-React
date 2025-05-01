import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Signin() {
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  function sendDataToApi(values) {
    setLoading(false);
    axios
      .post("http://localhost:3000/api/auth/signin", values)
      .then(({ data }) => {
        if (data.message === "success") {
          localStorage.setItem("token", data.data);
          navigate("/tasks");
        }
      })
      .catch((error) => {
        setErrMsg(error.response.data.message);
        setLoading(true);
      });
  }

  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });
  function makePasswordVisible() {
    setShowPassword(!showPassword);
  }
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
        <div className="container">
          <div className="w-75 m-auto my-5 brdrshdow p-4 ">
            <h3>Sign In:</h3>
            <form onSubmit={register.handleSubmit}>
              <div className="mb-3">
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
              </div>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control "
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                />
                {register.errors.password && register.touched.password ? (
                  <div className="alert alert-danger">
                    {register.errors.password}
                  </div>
                ) : (
                  ""
                )}
                <i
                  className={`position-absolute passicon fa-regular ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => makePasswordVisible()}
                ></i>
              </div>
              <p className="text-center mt-2">
                Don't have e-mail ?
                <Link
                  className="text-main text-decoration-underline ms-1"
                  to="/Signup"
                >
                  Signup
                </Link>
              </p>
              {errMsg ? (
                <div className="alert alert-danger"> {errMsg} </div>
              ) : (
                ""
              )}

              <button
                className="btn bg-main text-white mt-2"
                type="submit"
                disabled={!(register.dirty && register.isValid)}
              >
                {loading ? (
                  "Sign In"
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
