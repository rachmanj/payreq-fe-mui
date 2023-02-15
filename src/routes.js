import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/layout/mainLayout";
import Accounting from "./pages/accounting";
import Admin from "./pages/admin";

// APPROVEDS
import Approved from "./pages/approved";
import AddApproved from "./pages/approved/add_edit/add";

//OUTGOINGS
import Outgoings from "./pages/outgoings";

// PAYREQS
import AllPayreqs from "./pages/allPayreqs";

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <MainLayout />
        <Container>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Dashboard />} />

            {/* APPROVEDs */}
            <Route path="approved">
              <Route index element={<Approved />} />
              <Route path="add" element={<AddApproved />} />
            </Route>

            {/* OUTGOINGS */}
            <Route path="/outgoings" element={<Outgoings />} />

            <Route path="/all-payreqs" element={<AllPayreqs />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
};

export default Router;
