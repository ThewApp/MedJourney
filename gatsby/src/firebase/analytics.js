import unpkgLoader from "../unpkgLoader";
import { getFirebase } from ".";

class Amplitude {
  constructor() {
    this.q = [];
  }

  init() {
    if (typeof window !== "undefined") {
      unpkgLoader({
        name: "amplitude",
        url: "https://unpkg.com/amplitude-js@5.9.0/amplitude.js"
      }).then(amplitude => {
        amplitude.getInstance().init(process.env.GATSBY_API_AMPLITUDE);
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
/**
 * @callback getAmplitudeCallback
 * @param {import("amplitude-js")} amplitude
 *
 * @callback getAmplitude
 * @param {getAmplitudeCallback} callback
 * @type {getAmplitude}
 */
export const getAmplitude = amplitude.getAmplitude.bind(amplitude);

export function initAnalytics() {
  getFirebase(firebase => {
    unpkgLoader({
      name: "firebase-analytics",
      url: "https://unpkg.com/firebase@7.9.1/firebase-analytics.js"
    }).then(() => {
      firebase.analytics();
    });
    unpkgLoader({
      name: "firebase-performance",
      url: "https://unpkg.com/firebase@7.9.1/firebase-performance.js"
    }).then(() => {
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
