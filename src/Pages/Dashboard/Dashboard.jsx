import React, { useEffect, useState } from "react";
import ProductForm from "src/components/InputNuevoGasto";
import Movimiento from "src/components/InputNuevoMovimiento";
import { useUserAuth } from "src/context/userAuthContext";
import { useFirestore } from "src/hooks/useFirestore";
import style from "./style.module.scss";
import { Button } from "@mui/joy";

const Dashboard = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const { user } = useUserAuth();

  const [text, setText] = useState("");

  useEffect(() => {
    getData();
  }, [user]);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    addData(text);
    setText("");
  };

  const handleClickEdit = (item) => {
    console.log("edit");
    setText("");
    updateData(item.nanoid, { ...item, origin: text });
  };

  return (
    <>
      <div>Dashboard</div>
      <div>
        {data.map((item) => (
          <div key={item.nanoid}>
            <p className={style.parrafo}>{item.nanoid}</p>
            <p>{item.origin}</p>
            <p>{item.uid}</p>
            <Button
              variant="soft"
              color="danger"
              loading={loading[item.nanoid]}
              onClick={() => deleteData(item.nanoid)}
            >
              delete
            </Button>
            <Button
              variant="soft"
              color="warning"
              loading={loading[item.nanoid]}
              onClick={() => handleClickEdit(item)}
            >
              edit
            </Button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="soft" type="submit" loading={loading.addData}>
          {!loading.addData ? "add" : "loading"}
        </Button>
      </form>
      <ProductForm />
      <Movimiento />
    </>
  );
};

export default Dashboard;
