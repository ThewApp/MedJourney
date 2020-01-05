import { getFirebase } from ".";

getFirebase(firebase => {
  firebase.analytics();
});

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
}

const amplitude = new Amplitude();
amplitude.init();
export const getAmplitude = amplitude.getAmplitude.bind(amplitude);

getAmplitude(amplitude =>
  window.addEventListener("load", () =>
    amplitude.getInstance().logEvent("page_view", { title: document.title })
  )
);

export function logPageView() {
  getFirebase(firebase => {
    firebase.analytics().logEvent("page_view");
  });
  getAmplitude(amplitude =>
    amplitude.getInstance().logEvent("page_view", { title: document.title })
  );
}
