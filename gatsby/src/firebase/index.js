import cdnLoader from "../cdnLoader";

class Firebase {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      const firebaseConfig = JSON.parse(process.env.GATSBY_API_FIREBASE);
      const app = cdnLoader({
        name: "firebase",
        url: "https://unpkg.com/firebase@7.9.1/firebase-app.js"
      });
      app.then(async app => {
        app.initializeApp(firebaseConfig);
        await Promise.all([
          cdnLoader({
            name: "firebase-auth",
            url: "https://unpkg.com/firebase@7.9.1/firebase-auth.js"
          }),
          cdnLoader({
            name: "firebase-firestore",
            url: "https://unpkg.com/firebase@7.9.1/firebase-firestore.js"
          })
        ]);
        this.app = app;
        this.q.forEach(callback => callback(this.app));
      });
    }
  }

  getFirebase(callback, thisArg) {
    if (typeof window !== "undefined") {
      if (!this.app) {
        this.q.push(callback.bind(thisArg));
      } else {
        callback.bind(thisArg)(this.app);
      }
    }
  }
}

const firebase = new Firebase();
firebase.init();
/**
 * @callback getFirebaseCallback
 * @param {import("firebase/app")} firebase
 *
 * @callback getFirebase
 * @param {getFirebaseCallback} callback
 * @type {getFirebase}
 */
export const getFirebase = firebase.getFirebase.bind(firebase);

export { default as useAnalytics } from "./useAnalytics";
export { default as useAuth } from "./useAuth";
export { default as useFirestore } from "./useFirestore";
export { default as useFunctions } from "./useFunctions";
