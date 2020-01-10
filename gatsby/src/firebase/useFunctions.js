import { useState, useEffect } from "react";
import { getFirebase } from ".";

/**
 * @return {firebase.functions}
 */
export default function() {
  const [functions, setFunctions] = useState({ value: null });
  useEffect(() => {
    getFirebase(firebase => {
      import("firebase/functions").then(() => {
        setFunctions({ value: firebase.app().functions.bind(firebase.app()) });
      });
    });
  }, []);
  return functions.value;
}
