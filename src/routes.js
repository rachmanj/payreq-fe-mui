import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/layout/mainLayout";
import Accounting from "./pages/accounting";
import Admin from "./pages/admin";

import { Loader } from "./utils/tools";

import { isAuth } from "./store/actions/authAction";

//HOC
import Protected from "./hoc/authGuard";

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

              <Route
                path="/"
                element={
                  <Protected element={Dashboard} isLoggedIn={user.auth} />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Protected element={Dashboard} isLoggedIn={user.auth} />
                }
              />
              {/* APPROVEDs */}
              <Route
                path="approved"
                element={
                  <Protected element={Approved} isLoggedIn={user.auth} />
                }
              ></Route>
              <Route path="approved/add" element={<AddApproved />} />

              {/* OUTGOINGS */}
              <Route
                path="outgoings"
                element={
                  <Protected element={Outgoings} isLoggedIn={user.auth} />
                }
              />

              <Route
                path="all-payreqs"
                element={
                  <Protected element={AllPayreqs} isLoggedIn={user.auth} />
                }
              />

              <Route path="/accounting" element={<Accounting />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Container>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
