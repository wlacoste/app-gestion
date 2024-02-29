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
import { useUserAuth } from "src/context/userAuthContext";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const getData = async () => {
    if (!auth.currentUser) return;
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef = collection(db, "urls");
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  };

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newDoc = {
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid,
      };
      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const deleteData = async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      setData(data.filter((item) => item.nanoid !== nanoid));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  const updateData = async (nanoid, newDato) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, { origin: newDato.origin });
      setData(data.map((item) => (item.nanoid === nanoid ? newDato : item)));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };

  return {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
  };
};
