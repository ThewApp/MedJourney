import { useState, useEffect } from "react";
import { getFirebase } from ".";
import { getAmplitude } from "./analytics";

/**
 * @return {{firebase: firebase.analytics, amplitude: import("amplitude-js")}}
 */
export default function() {
  const [firebaseAnalytics, setFirebaseAnalytics] = useState({ value: null });
  const [amplitudeAnalytics, setAmplitudeAnalytics] = useState({ value: null });
  useEffect(() => {
    getFirebase(firebase => {
      setFirebaseAnalytics({ value: firebase.analytics });
    });
    getAmplitude(amplitude => {
      setAmplitudeAnalytics({ value: amplitude });
    });
  }, []);
  return {
    firebase: firebaseAnalytics.value,
    amplitude: amplitudeAnalytics.value
  };
}
