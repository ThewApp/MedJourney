import { useState, useEffect } from "react";
import getFirebase from ".";

export default function() {
  const [auth, setAuth] = useState();
  useEffect(() => {
    getFirebase(firebase => {
      setAuth(firebase.auth);
    });
  }, []);
  return auth;
}