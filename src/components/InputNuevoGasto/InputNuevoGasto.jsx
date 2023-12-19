import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";

import styles from "./styles.module.scss";

const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    console.log("Submitted:", product);
  };

  return (
    <Card className={styles.carda}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Producto"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cantidad"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoria"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Añadir
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;
