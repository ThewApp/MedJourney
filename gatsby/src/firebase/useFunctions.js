import { useState, useEffect } from "react";

import cdnLoader from "../cdnLoader";
import { getFirebase } from ".";

/**
 * @return {firebase.functions}
 */
export default function() {
  const [functions, setFunctions] = useState({ value: null });
  useEffect(() => {
    getFirebase(firebase => {
      cdnLoader({
        name: "firebase-functions",
        url: "https://unpkg.com/firebase@7.9.1/firebase-functions.js"
      }).then(() => {
        setFunctions({ value: firebase.app().functions.bind(firebase.app()) });
      });
    });
  }, []);
  return functions.value;
}
