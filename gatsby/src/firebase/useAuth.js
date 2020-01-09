import { useState, useEffect } from "react";
import { getFirebase } from ".";

/**
 * @return {firebase.auth}
 */
export default function() {
  const [auth, setAuth] = useState({ value: null });
  useEffect(() => {
    getFirebase(firebase => {
      setAuth({ value: firebase.auth });
    });
  }, []);
  return auth.value;
}
