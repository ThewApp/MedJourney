import create from "zustand";
import { getFirebase } from "../firebase";
import { getAmplitude } from "../firebase/analytics";

const [useUser, api] = create(() => ({
  /** @type {firebase.User} */
  authUser: undefined,
  firestoreUser: undefined,
  firestoreUserRef: undefined,
  signOut: () => getFirebase(firebase => firebase.auth().signOut())
}));

getFirebase(firebase =>
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      api.setState({ authUser: user });
      getAmplitude(amplitude => {
        amplitude.getInstance().setUserId(user.uid);
      });
    } else {
      api.setState({ authUser: null });
      getAmplitude(amplitude => amplitude.getInstance().setUserId(null));
    }
  })
);

let firestoreUserListener;
function authUserListener(authUser) {
  if (firestoreUserListener) firestoreUserListener();
  if (authUser) {
    getFirebase(firebase => {
      firestoreUserListener = firebase
        .firestore()
        .doc(`users/${authUser.uid}`)
        .onSnapshot(docSnapshot => {
          if (!docSnapshot.exists) {
            docSnapshot.ref.set({
              createdAt: new Date()
            });
          } else {
            api.setState({
              firestoreUser: docSnapshot.data(),
              firestoreUserRef: docSnapshot.ref
            });
          }
        });
    });
  } else {
    api.setState({ firestoreUser: null, firestoreUserRef: null });
  }
}

api.subscribe(authUserListener, state => state.authUser);

export { api };
export default useUser;
