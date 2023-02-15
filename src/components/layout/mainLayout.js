import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container />
      <Outlet />
      <div style={{ paddingTop: "50px", marginBottom: "5px" }} />
    </>
  );
};

export default MainLayout;
