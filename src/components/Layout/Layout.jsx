import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export default function ButtonAppBar({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <Box className={styles.main}>
        <AppBar position="absolute">
          <Toolbar className={styles.toolbar}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => alert("hola")}
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* <h1>hola</h1> */}
      <main>{children}</main>
    </>
  );
}
