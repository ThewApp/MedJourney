import { useState, useEffect } from "react";
import getFirebase from ".";

export default function() {
  const [analytics, setAnalytics] = useState();
  useEffect(() => {
    getFirebase(firebase => {
      setAnalytics(firebase.analytics);
    });
  }, []);
  return analytics;
}
