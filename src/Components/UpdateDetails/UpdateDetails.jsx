// import axios from "axios";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// export default function UpdateDetails() {
//   let navigate = useNavigate();
//   let [userData, setUserData] = useState({});
//   function sendDataToApi(values) {
//     axios
//       .put("http://localhost:3000/api/auth/changeuserdata", values, {
//         headers: { token: localStorage.getItem("token") },
//       })
//       .then(({ data }) => {
//         if (data.message === "success") {
//           navigate("/tasks");
//         }
//       })
//       .catch((err) => console.log(err));
//   }
//   function getUserData() {
//     axios.get("http://localhost:3000/api/auth/view", {
//       headers: { token: localStorage.getItem("token") },
//     });
//   }
//   let register = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       sendDataToApi(values);
//     },
//   });

//   return (
//     <>
//       <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
//         <div className="container">
//           <div className="m-auto w-75 brdrshdow p-4">
//             <h2>Update User Details</h2>
//             <form onSubmit={register.handleSubmit}>
//               <label htmlFor="name"> Name</label>
//               <div className="position-relative">
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className="form-control my-2"
//                   onChange={register.handleChange}
//                 />
//               </div>
//               <label htmlFor="email">Email </label>
//               <div className="position-relative">
//                 <input
//                   type="text"
//                   name="email"
//                   id="email"
//                   className="form-control my-2"
//                   onChange={register.handleChange}
//                 />
//                 {register.errors.password && register.touched.password ? (
//                   <div className="alert alert-danger">
//                     {register.errors.password}
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//               <label htmlFor="phone"> Phone </label>
//               <input
//                 type="number"
//                 name="phone"
//                 id="phone"
//                 className="form-control my-2"
//                 onChange={register.handleChange}
//               />

//               <button type="submit" className="btn bg-main text-white mt-3">
//                 Update Details
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateDetails() {
  let navigate = useNavigate();
  let [userData, setUserData] = useState({});
  let [loading, setLoading] = useState(true);

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    enableReinitialize: true, // Allow Formik to update values when userData changes
    onSubmit: (values) => {
      sendDataToApi(values);
    },
  });

  function sendDataToApi(values) {
    axios
      .put("http://localhost:3000/api/auth/changeuserdata", values, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        if (data.message === "success") {
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  }

  function getUserData() {
    axios
      .get("http://localhost:3000/api/auth/view", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        const user = response.data.data;
        console.log(user);

        setUserData(user);
        register.setValues({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="vh-100 d-flex justify-content-center align-content-center flex-wrap">
      <div className="container">
        <div className="m-auto w-75 brdrshdow p-4">
          <h2>Update User Details</h2>
          <form onSubmit={register.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control my-2"
              onChange={register.handleChange}
              value={register.values.name}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control my-2"
              onChange={register.handleChange}
              value={register.values.email}
            />

            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control my-2"
              onChange={register.handleChange}
              value={register.values.phone}
            />

            <button type="submit" className="btn bg-main text-white mt-3">
              Update Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
