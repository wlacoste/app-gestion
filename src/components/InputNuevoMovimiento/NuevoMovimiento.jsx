import React, { useCallback, useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Collapse,
  Stack,
  Switch,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./styles.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const Movimiento = () => {
  const [product, setProduct] = useState({
    referencia: "",
    monto: "",
    category: "",
    fecha: dayjs(),
    fechaCreacion: dayjs(),
    esEgreso: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const setFecha = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      fecha: e,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log("Submitted:", product);
  };

  //   const [esEgreso, setEsEgreso] = useState(true);

  const handleAlignment = (event, newAlignment) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      esEgreso: newAlignment,
    }));
  };
  return (
    <Card className={styles.carda}>
      <Typography variant="h5">Nuevo movimiento</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex"}}>
          <ToggleButtonGroup
            value={product.esEgreso}
            exclusive
            onChange={handleAlignment}
            sx={{ margin: "auto" }}
          >
            <ToggleButton value={true} aria-label="Egreso" color="primary">
              <Typography variant="button" sx={{ textTransform: "capitalize" }}>
                Egreso
              </Typography>
            </ToggleButton>
            <ToggleButton value={false} aria-label="Ingreso" color="primary">
              <Typography variant="button" sx={{ textTransform: "capitalize" }}>
                Ingreso
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          label="Referencia"
          name="referencia"
          value={product.referencia}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <CurrencyTextField
          label="Monto"
          name="monto"
          variant="outlined"
          value={product.monto}
          onChange={handleChange}
          fullWidth
          margin="normal"
          digitGroupSeparator=","
          InputProps={{
            inputProps: { min: 0 },
          }}
          outputFormat="string"
          required
        />
        <TextField
          label="Categoria"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha del movimiento"
            value={product.fecha}
            // @ts-ignore
            onChange={setFecha}
            views={["year", "month", "day"]}
            format="DD-MM-YYYY"
            sx={{ marginTop: "0.5rem", marginBottom: "2rem" }}
            slotProps={{
              textField: {
                fullWidth:true
              },
            }}
          />
        </LocalizationProvider>

        <Button type="submit" variant="contained" color="primary">
          Añadir
        </Button>
      </form>
    </Card>
  );
};

export default Movimiento;
