import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  Collapse,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./styles.module.scss";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useCategories } from "src/hooks/useCategories";
import { useProductos } from "src/hooks/useProductos";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
    isUnitario: false,
    category: "",
    fechaVencimiento: "",
    isVence: false,
    fechaCreacion: dayjs().format("DD/MM/YYYY"),
  });

  const {getCategorias, categorias, loading} = useCategories();
  const { addProducto, getProductos ,loading: loadProductos ,productos} = useProductos();

  useEffect(()=>{
    getCategorias();
    getProductos();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const toggleVence = () => {
    // if(!product.isVence){
    //   setProduct({...product, fechaVencimiento:""})
    // }
    setProduct((prevProduct) => ({
      ...prevProduct,
      isVence: !prevProduct.isVence,
      // fechaVencimiento: dayjs().add(2, "week"),
      fechaVencimiento: !prevProduct.isVence ? dayjs().add(2, "week"): "",
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
     addProducto({...product, fechaVencimiento: product.fechaVencimiento.format("DD/MM/YYYY")});
  };

  return (
    <Card className={styles.carda}>
      {
        productos.map((prod, index) =>{
          return(
          <div key = {index}>
            <p>
              {prod.uid}
              {prod.productName}
              {prod.fechaVencimiento}
              {prod.isVence}
              {prod.quantity}
              </p>
              </div>
          );
        })
      }
      <Typography variant="h5">Nuevo producto</Typography>
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
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product.category}
            label="Categoria"
            name="category"
            onChange={handleChange}
            
            >
            {categorias.map((category, index) => {
              return(
            <MenuItem key={index} 
              value={category.id}>
                {category.nombre}
                </MenuItem>)
              }  
              )}
            
          </Select>
        </FormControl>

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
        <Collapse in={product.isVence} timeout="auto" unmountOnExit >

          <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
            <DatePicker
              label="Fecha de vencimiento"
              value={product.fechaVencimiento}
              // @ts-ignore
              onChange={setFecha}
              views={["year", "month", "day"]}
              openTo="month"
              format="DD-MM-YYYY"
              disablePast={true}
              sx={{ marginTop: "0.5rem", marginBottom: "1rem" ,border:"1px solid red"}}
              slotProps={{
                textField: {
                  helperText: "fecha por default en 2 semanas",
                  fullWidth:true
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
