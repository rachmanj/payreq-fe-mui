import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/layout/mainLayout";
import Accounting from "./pages/accounting";
import Admin from "./pages/admin";

import { Loader } from "./utils/tools";

import { isAuth } from "./store/actions/authAction";

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
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuth());
  }, []);

  useEffect(() => {
    if (user.auth !== null) {
      setLoading(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      {loading ? (
        // loader center of screen
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Loader />
        </div>
      ) : (
        <>
          <MainLayout />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* <Route element={<AuthGuard />}> */}
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
              {/* </Route> */}
            </Routes>
          </Container>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
