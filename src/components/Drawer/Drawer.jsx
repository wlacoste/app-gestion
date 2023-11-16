import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
export default function TemporaryDrawer({ isOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const rutas = [
    { ruta: "/dashboard", texto: "Inicio" },
    { ruta: "/formulario", texto: "Formulario" },
  ];
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {rutas.map((ruta, index) => (
          <ListItem key={ruta.texto} disablePadding>
            <ListItemButton onClick={() => navigate(ruta.ruta)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={ruta.texto} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(true)}>abrir</Button> */}
        <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer(false)}>
          {" "}
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
