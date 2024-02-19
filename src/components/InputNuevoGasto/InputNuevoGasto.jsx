import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Collapse,
} from "@mui/material";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./styles.module.scss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
    isUnitario: false,
    category: "",
    fechaVencimiento: dayjs().add(2, "week"),
    isVence: false,
    fechaCreacion: dayjs(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const toggleVence = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      isVence: !prevProduct.isVence,
      fechaVencimiento: dayjs().add(2, "week"),
    }));
  };
  const toggleUnitario = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      isUnitario: !prevProduct.isUnitario,
    }));
  };
  const setFecha = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      fechaVencimiento: e,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log("Submitted:", product);
  };

  return (
    <Card className={styles.carda}>
      <Typography variant="h2">Nuevo producto</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Producto"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Cantidad"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputProps={{
            inputProps: { min: 0 },
          }}
          required
        />
        <FormControlLabel
          sx={{ display: "box", width: "100%" }}
          control={
            <Checkbox
              checked={product.isUnitario}
              onChange={toggleUnitario}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="precio unitario"
        />
        <CurrencyTextField
          label="Precio"
          name="price"
          variant="outlined"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          digitGroupSeparator=","
          InputProps={{
            inputProps: { min: 0 },
          }}
          outputFormat="string"
        />
        <TextField
          label="Categoria"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          sx={{ display: "box", width: "100%" }}
          control={
            <Checkbox
              checked={product.isVence}
              onChange={toggleVence}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="vence?"
        />
        <Collapse in={product.isVence} timeout="auto" unmountOnExit>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de vencimiento"
              value={product.fechaVencimiento}
              // @ts-ignore
              onChange={setFecha}
              views={["year", "month", "day"]}
              openTo="month"
              format="DD-MM-YYYY"
              disablePast={true}
              sx={{ marginTop: "0.5rem", marginBottom: "1rem" }}
              slotProps={{
                textField: {
                  helperText: "fecha por default en 2 semanas ",
                },
              }}
            />
          </LocalizationProvider>
        </Collapse>

        <Button type="submit" variant="contained" color="primary">
          Añadir
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;
