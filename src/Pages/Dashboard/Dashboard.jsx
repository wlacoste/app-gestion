import React from "react";
import ProductForm from "src/components/InputNuevoGasto";
import Movimiento from "src/components/InputNuevoMovimiento";
import { useFirestore } from "src/hooks/useFirestore";

const Dashboard = () => {
  const { data, error, loading } = useFirestore();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div>Dashboard</div>
      <div>
        {data.map((item) => (
          <div key={item.nanoid}>
            <p>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
          </div>
        ))}
      </div>
      <ProductForm />
      <Movimiento />
    </>
  );
};

export default Dashboard;
