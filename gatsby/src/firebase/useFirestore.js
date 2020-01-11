import { useState, useEffect } from "react";
import { getFirebase } from ".";

/**
 * @return {firebase.firestore}
 */
export default function() {
  const [firestore, setFirestore] = useState({ value: null });
  useEffect(() => {
    getFirebase(firebase => {
      setFirestore({ value: firebase.firestore });
    });
  }, []);
  return firestore.value;
}
