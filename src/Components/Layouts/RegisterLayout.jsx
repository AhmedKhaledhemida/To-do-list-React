import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navbars/MainNav";

export default function RegisterLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}
