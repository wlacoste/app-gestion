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
    const { getData } = useFireDB();


    const getProductos = async () => {
        getData("productos", setLoading, setProductos, setError, true);
    }

      return {
        productos,
        error,
        loading,
        getProductos,
      };
}