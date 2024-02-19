import { useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "urls"));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {};
};
