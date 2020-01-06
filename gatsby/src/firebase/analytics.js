import { getFirebase } from ".";

class Amplitude {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      import("amplitude-js").then(amplitude => {
        amplitude.getInstance().init("e68677dad0052827470798d8204e7959");
        this.amplitude = amplitude;
        this.q.forEach(callback => callback(this.amplitude));
      });
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
    import("firebase/analytics").then(() => {
      firebase.analytics();
    });
    import("firebase/performance").then(() => {
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
