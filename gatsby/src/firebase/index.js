class Firebase {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      const firebaseConfig = JSON.parse(process.env.GATSBY_API_FIREBASE);
      const app = import(
        /* webpackChunkName: "firebase-app", webpackPreload: true */ "firebase/app"
      );
      app.then(async app => {
        app.initializeApp(firebaseConfig);
        await import(/* webpackChunkName: "firebase-auth" */ "firebase/auth");
        await import(
          /* webpackChunkName: "firebase-firestore" */ "firebase/firestore"
        );
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
export const getFirebase = firebase.getFirebase.bind(firebase);

export { default as useAnalytics } from "./useAnalytics";
export { default as useAuth } from "./useAuth";
export { default as useFirestore } from "./useFirestore";
export { default as useFunctions } from "./useFunctions";
