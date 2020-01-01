/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="firebase-app" src="/__/firebase/7.6.1/firebase-app.js"></script>,
    <script key="firebase-analytics" src="/__/firebase/7.6.1/firebase-analytics.js"></script>,
    <script key="firebase-auth" src="/__/firebase/7.6.1/firebase-auth.js"></script>,
    <script key="firebase-firestore" src="/__/firebase/7.6.1/firebase-firestore.js"></script>,
    <script key="firebase-functions" src="/__/firebase/7.6.1/firebase-functions.js"></script>,
    <script key="firebase-init" src="/__/firebase/init.js"></script>
  ]);
};
