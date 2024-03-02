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

export const useFireDB = () => {
 
    const getData = async (coleccion, setLoading, setData, setError,filtro) => {
      if (!auth.currentUser) return;
      try {
        setLoading((prev) => ({ ...prev, getData: true }));
        const dataRef = collection(db, coleccion);
        const request = filtro? query(dataRef, where("uid", "==", auth.currentUser.uid)): dataRef;
        const querySnapshot = await getDocs(request);
        const dataDB = querySnapshot.docs.map((doc) => doc.data());
        setData(dataDB);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, getData: false }));
      }
    };

    const addData = async (data, coleccion, setLoading, setData, setError) => {
      try {
        setLoading((prev) => ({ ...prev, addData: true }));
        const newDoc = {
          ...data,
          nanoid: nanoid(6),
          uid: auth.currentUser.uid,
        };
        const docRef = doc(db, coleccion, newDoc.nanoid);
        await setDoc(docRef, newDoc);
        setData((prev)=>[...prev, newDoc]);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, addData: false }));
      }
    };

    const deleteData = async (nanoid, coleccion, setLoading, setData, setError) => {
      try {
        setLoading((prev) => ({ ...prev, [nanoid]: true }));
        const docRef = doc(db, coleccion, nanoid);
        await deleteDoc(docRef);
        setData((prev)=> prev.filter((item) => item.nanoid !== nanoid));
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, [nanoid]: false }));
      }
    };

    const updateData = async (newDato, coleccion, setLoading, setData, setError) => {
      try {
        setLoading((prev) => ({ ...prev, [newDato.nanoid]: true }));
        const docRef = doc(db, coleccion, newDato.nanoid);
        await updateDoc(docRef, newDato);
        setData((prev) => prev.map((item) => (item.nanoid === newDato.nanoid ? newDato : item)));
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, [newDato.nanoid]: false }));
      }
    };
    
      return {
        getData,
        addData,
        deleteData,
        updateData
      };

 
}