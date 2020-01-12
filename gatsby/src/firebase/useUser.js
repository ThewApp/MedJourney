import { useEffect, useState } from "react";
import { navigate } from "gatsby";

import useAuth from "./useAuth";
import useFirestore from "./useFirestore";

export default function() {
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
          navigate(`/login`, { replace: true });
        }
      });
    }
  }, [auth]);

  useEffect(() => {
    if (firestore) {
      if (authUser) {
        firestore()
          .doc(`users/${authUser.uid}`)
          .get()
          .then(docSnapshot => {
            if (!docSnapshot.get("firstName")) {
              navigate("/register", { replace: true });
            }
            setFirestoreUser(docSnapshot.data());
          });
      } else {
        setFirestoreUser();
      }
    }
  }, [authUser, firestore]);

  return [authUser, firestoreUser];
}
