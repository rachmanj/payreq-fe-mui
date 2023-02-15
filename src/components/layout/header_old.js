import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";

const pages = [
  { label: "Approved", to: "/approved" },
  { label: "Accounting", to: "/accounting" },
  { label: "Admin", to: "/admin" },
];

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Container>
          <div>
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                Payreq-System
              </Typography>

              {pages.map((page) => (
                <Button
                  key={page.label}
                  variant="h6"
                  color="inherit"
                  onClick={() => navigate(page.to)}
                  sx={{ ml: 3 }}
                >
                  {page.label}
                </Button>
              ))}
            </Toolbar>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
