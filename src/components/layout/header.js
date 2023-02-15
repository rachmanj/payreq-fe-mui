import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

const menuPayreqs = [
  { label: "Approved", to: "/approved" },
  { label: "Outgoings", to: "/outgoings" },
  { label: "Realization", to: "/realization" },
  { label: "Verification", to: "/verification" },
  { label: "All Payreqs", to: "/all-payreqs" },
];

const menuAccountings = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Transactions", to: "/transaction" },
  { label: "Reports", to: "/reports" },
];

const menuAdmins = [{ label: "Admin", to: "/admin" }];

const MenuAppBar = () => {
  const [anchorPayreq, setAnchorPayreq] = useState(null);
  const [anchorAccounting, setAnchorAccounting] = useState(null);
  const [anchorAdmin, setAnchorAdmin] = useState(null);

  const navigate = useNavigate();

  const handleAnchorAccounting = (e) => {
    setAnchorPayreq(e.currentTarget);
  };

  const handleSubmenuClicked = (to) => {
    navigate(to);
    handleClose();
  };

  const handleClose = () => {
    setAnchorPayreq(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Payreqs-System
          </Typography>

          <div>
            <Button
              variant="h6"
              color="inherit"
              onClick={handleAnchorAccounting}
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
              onClose={handleClose}
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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;
