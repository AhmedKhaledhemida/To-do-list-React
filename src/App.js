import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RegisterLayout from "./Components/Layouts/RegisterLayout";
import UsersLayout from "./Components/Layouts/UsersLayout";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Tasks from "./Components/Tasks/Tasks";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";

import UpdateDetails from "./Components/UpdateDetails/UpdateDetails";

export default function App() {
  let router = createHashRouter([
    {
      path: "/",
      element: <RegisterLayout />,
      children: [
        { index: true, element: <Signup /> },
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
        {
          path: "tasks",
          element: <ProtectedRoutes> {<Tasks />} </ProtectedRoutes>,
        },

        { path: "*", element: <PageNotFound /> },
      ],
    },
    {
      path: "/users",
      element: <UsersLayout />,
      children: [
        {
          path: "updateuser",
          element: (
            <ProtectedRoutes>
              <UpdateDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        closeOnClick
        stacked
        draggable
        pauseOnHover={true}
        theme="colored"
      />

      <RouterProvider router={router} />
    </>
  );
}
