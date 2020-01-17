import { getFirebase } from ".";

class Amplitude {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      import(/* webpackChunkName: "amplitude-js" */ "amplitude-js").then(
        amplitude => {
          amplitude.getInstance().init(process.env.GATSBY_API_AMPLITUDE);
          this.amplitude = amplitude;
          this.q.forEach(callback => callback(this.amplitude));
        }
      );
    }
  }

  getAmplitude(callback, thisArg) {
    if (typeof window !== "undefined") {
      if (!this.amplitude) {
        this.q.push(callback.bind(thisArg));
      } else {
        callback.bind(thisArg)(this.amplitude);
      }
    }
  }

  logPageView() {
    this.getAmplitude(amplitude =>
      amplitude.getInstance().logEvent("page_view", {
        title: document.title,
        path:
          window.location.pathname +
          window.location.search +
          window.location.hash
      })
    );
  }
}

const amplitude = new Amplitude();
export const getAmplitude = amplitude.getAmplitude.bind(amplitude);

export function initAnalytics() {
  getFirebase(firebase => {
    import(
      /* webpackChunkName: "firebase-analytics" */ "firebase/analytics"
    ).then(() => {
      firebase.analytics();
    });
    import(
      /* webpackChunkName: "firebase-analytics" */ "firebase/performance"
    ).then(() => {
      firebase.performance();
    });
  });
  amplitude.init();
  amplitude.logPageView();
}

export function logPageView() {
  getFirebase(firebase => {
    firebase.analytics().logEvent("page_view");
  });
  amplitude.logPageView();
}
