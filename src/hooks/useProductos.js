import { useEffect, useState } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { useFireDB } from "./useFireDB";

export const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});
    const { getData, addData, deleteData, updateData } = useFireDB();


    const getProductos = async () => {
      console.log("obteninendo productos");
        getData("productos", setLoading, setProductos, setError, true);
    }
    const addProducto = async (data) => {
        addData(data, "productos", setLoading, setProductos, setError);
    }
    const deleteProducto = async (id) => {
      deleteData(id, "productos", setLoading, setProductos, setError);
    }

    const updateProducto = async (data) => {
      updateData(data, "productos", setLoading, setProductos, setError);
  }

    useEffect(()=>{
      console.log(productos);
    },[productos]);


      return {
        productos,
        error,
        loading,
        getProductos,
        addProducto,
        deleteProducto,
        updateProducto
      };
}