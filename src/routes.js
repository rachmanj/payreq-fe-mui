import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/layout/mainLayout";
import Accounting from "./pages/accounting";
import Admin from "./pages/admin";

//HOC
import AuthGuard from "./hoc/authGuard";

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
      <MainLayout />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<AuthGuard />}>
            {/* DASHBOARD */}
            <Route path="/dashboard" element={<Dashboard />} />

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
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
