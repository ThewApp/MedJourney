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
        if (process.env.NODE_ENV === "development") {
          firebase.functions().useFunctionsEmulator("http://localhost:5001");
          setFunctions({ value: () => firebase.app().functions() });
        } else {
          setFunctions({ value: region => firebase.app().functions(region) });
        }
      });
    });
  }, []);
  return functions.value;
}
