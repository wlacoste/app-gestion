import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const dataRef = collection(db, "urls");
      const q = query(
        dataRef,
        where("uid", "==", "P3tXSXLIAzN47tYL5KEFASJktkr2")
      );
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => doc.data());
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
  };
};
