class Firebase {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      const app = import(/* webpackPreload: false */ "firebase/app");
      const init = fetch("/__/firebase/init.json").then(res => res.json());
      Promise.all([app, init]).then(async ([app, init]) => {
        app.initializeApp(init);
        await import(/* webpackPreload: false */ "firebase/auth");
        await import(/* webpackPreload: false */ "firebase/firestore");
        await import(/* webpackPreload: false */ "firebase/remote-config");
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
