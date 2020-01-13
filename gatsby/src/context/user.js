import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import { useAuth, useFirestore } from "../firebase";
import Helmet from "react-helmet";

const UserContext = React.createContext();

export function UserProvider(props) {
  const auth = useAuth();
  const firestore = useFirestore();
  const [authUser, setAuthUser] = useState();
  const [firestoreUser, setFirestoreUser] = useState();
  useEffect(() => {
    if (auth) {
      return auth().onAuthStateChanged(user => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser({});
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    if (firestore) {
      if (authUser && authUser.uid) {
        return firestore()
          .doc(`users/${authUser.uid}`)
          .onSnapshot(docSnapshot => {
            if (!docSnapshot.exists) {
              docSnapshot.ref.set({});
            } else {
              setFirestoreUser(docSnapshot.data());
            }
          });
      } else {
        setFirestoreUser({});
      }
    }
  }, [authUser, firestore]);

  function updateFirestoreUser(data) {
    if (firestore) {
      firestore()
        .doc(`users/${authUser.uid}`)
        .update(data);
    }
  }

  const user = {
    authUser,
    firestoreUser,
    updateFirestoreUser
  };

  const helmet = (
    <Helmet>
      <link rel="preconnect" href="https://www.googleapis.com/" />
      {authUser && (
        <link rel="preconnect" href="https://firestore.googleapis.com/" />
      )}
    </Helmet>
  );

  return (
    <UserContext.Provider value={user} {...props}>
      {props.children}
      {helmet}
    </UserContext.Provider>
  );
}

/**
 * @callback updateFirestoreUser
 * @param {firebase.firestore.UpdateData} data
 */

/**
 * @typedef {Object} user
 * @property {firebase.User} user.authUser
 * @property {Object} user.firestoreUser
 * @property {updateFirestoreUser} user.updateFirestoreUser
 */

/**
 * @return {user}
 */
function useUser({ path } = {}) {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  if (path) {
    if (context.authUser && !context.authUser.uid) {
      sessionStorage.setItem("loginRedirect", path);
      navigate("/login", { replace: true });
    }
  }
  return context;
}

export default useUser;
