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

export const useCategories = () => {
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});
    const { getData } = useFireDB();

    const getCategorias = async () => {
        // if (!auth.currentUser) return;
        // try {
        //   setLoading((prev) => ({ ...prev, getData: true }));
        // //   const dataRef = collection(db, "categoria");
        // //   const q = query(dataRef);
        //   const querySnapshot = await getDocs(collection(db, "categoria"));
        //   const dataDB = querySnapshot.docs.map((doc) => doc.data());
        //   setCategorias(dataDB);
        // } catch (error) {
        //   console.log(error);
        //   setError(error.message);
        // } finally {
        //   setLoading((prev) => ({ ...prev, getData: false }));
        // }
        getData("categoria", setLoading, setCategorias, setError, false);

      };

      return {
        categorias,
        error,
        loading,
        getCategorias,
      };
}