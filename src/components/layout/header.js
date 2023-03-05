import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import { logoutUser } from "../../store/actions/authAction";
import { clearNotification } from "../../store/reducers/notificationReducer";

const menuPayreqs = [
  { label: "Approved", to: "/approved" },
  { label: "Outgoings", to: "/outgoings" },
  { label: "Realization", to: "/realization" },
  { label: "Verification", to: "/verification" },
  { label: "All Payreqs", to: "/all-payreqs" },
];

const menuAccountings = [
  { label: "Dashboard", to: "/accounting/dashboard" },
  { label: "Transactions", to: "/transaction" },
  { label: "Reports", to: "/reports" },
];

const menuAdmins = [{ label: "Admin", to: "/admin" }];

const MenuAppBar = () => {
  const [anchorPayreq, setAnchorPayreq] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const user = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAnchorPayreq = (e) => {
    setAnchorPayreq(e.currentTarget);
  };

  const handleAnchorProfile = (e) => {
    setAnchorProfile(e.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorPayreq(null);
    setAnchorProfile(null);
  };

  const handleSubmenuClicked = (to) => {
    navigate(to);
    handleAnchorClose();
  };

  const handleLogoutClicked = () => {
    dispatch(logoutUser());
    dispatch(clearNotification());
    navigate("/login");
    handleAnchorClose();
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    if (notifications && notifications.global.success) {
      setSnackbarSuccessOpen(true);
      setTimeout(() => {
        setSnackbarSuccessOpen(false);
      }, 3000);
    }
    if (notifications && notifications.global.error) {
      setSnackbarErrorOpen(true);
      setTimeout(() => {
        setSnackbarErrorOpen(false);
      }, 3000);
    }
  }, [notifications]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarSuccessOpen}
        key="success"
        TransitionComponent={TransitionLeft}
      >
        <Alert severity="success">{notifications.global.message}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarErrorOpen}
        key="error"
        TransitionComponent={TransitionLeft}
      >
        <Alert severity="error">{notifications.global.message}</Alert>
      </Snackbar>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Payreq - System</Typography>
            {user.auth ? (
              <>
                <Box component="div" sx={{}}>
                  <Button
                    variant="h6"
                    color="inherit"
                    onClick={handleAnchorPayreq}
                    sx={{ ml: 3 }}
                  >
                    Payreqs
                  </Button>
                  <Menu
                    id="menu-payreq"
                    anchorEl={anchorPayreq}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorPayreq)}
                    onClose={handleAnchorClose}
                  >
                    {menuPayreqs.map((payreq) => (
                      <MenuItem
                        key={payreq.label}
                        onClick={() => handleSubmenuClicked(payreq.to)}
                      >
                        {payreq.label}
                      </MenuItem>
                    ))}
                  </Menu>
                  <Button variant="h6" color="inherit">
                    Accounting
                  </Button>
                  <Button variant="h6" color="inherit" sx={{ ml: 1 }}>
                    Admin
                  </Button>
                </Box>

                <div>
                  <Button
                    variant="h6"
                    color="inherit"
                    sx={{ flexGrow: 0 }}
                    onClick={handleAnchorProfile}
                  >
                    {user ? user.data.name : ""}
                  </Button>
                  <Menu
                    id="menu-profile"
                    anchorEl={anchorProfile}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorProfile)}
                    onClose={handleAnchorClose}
                  >
                    <MenuItem onClick={handleLogoutClicked}>Logout</MenuItem>
                  </Menu>
                </div>
              </>
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuAppBar;
