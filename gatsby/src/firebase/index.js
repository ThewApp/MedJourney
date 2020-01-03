let firebase;

if (typeof window !== "undefined") {
  const app = import("firebase/app");
  const init = fetch("/__/firebase/init.json").then(res => res.json());
  const analytics = import("firebase/analytics");
  const auth = import("firebase/auth");
  Promise.all([app, init, analytics, auth]).then(([app, init]) => {
    app.initializeApp(init);
    firebase = app;
  });
}

export default function getFirebase(callback) {
  if (typeof window !== "undefined") {
    if (!firebase) {
      setTimeout(() => getFirebase(callback), 16);
    } else {
      callback(firebase);
    }
  } else {
    callback();
  }
}

export { default as useAnalytics } from "./useAnalytics";
export { default as useAuth } from "./useAuth";
