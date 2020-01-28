import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { navigate } from "gatsby";

import useUser from "../stores/user";

function User({ requiredAuth, location }) {
  const authUser = useUser(state => state.authUser);
  const firestoreUser = useUser(state => state.firestoreUser);

  const [pendingRedirect, setPendingRedirect] = useState();

  useEffect(() => {
    /* global ___loader */
    const isRegisterPage = /^\/register\/?$/.test(location.pathname);
    const isLoginPage = /^\/(login|legacy-login)\/?$/.test(location.pathname);
    const needRegister = firestoreUser && !firestoreUser.name;
    if (isLoginPage && authUser && firestoreUser) {
      if (needRegister) {
        navigate("/register", { replace: true });
      } else {
        navigate(pendingRedirect || "/app", { replace: true });
      }
    }

    if (isRegisterPage && firestoreUser && !needRegister) {
      navigate(pendingRedirect || "/app", { replace: true });
    }

    if (requiredAuth && authUser === null) {
      ___loader.enqueue(location.pathname);
      setPendingRedirect(location.pathname);
      navigate("/login", { replace: true });
    }

    if (requiredAuth && needRegister) {
      ___loader.enqueue(location.pathname);
      setPendingRedirect(location.pathname);
      navigate("/register", { replace: true });
    }
  }, [
    requiredAuth,
    authUser,
    pendingRedirect,
    location.pathname,
    firestoreUser
  ]);

  return (
    <Helmet>
      <link rel="preconnect" href="https://www.googleapis.com/" />
      {authUser && (
        <link rel="preconnect" href="https://firestore.googleapis.com/" />
      )}
    </Helmet>
  );
}

export default User;
