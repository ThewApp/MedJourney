import React, { useState, useEffect } from "react";

import QRCode from "qrcode";

import Layout from "../components/layout";
import SEO from "../components/seo";
import useUser from "../firebase/useUser";

const ProfilePage = () => {
  const [, firestoreUser] = useUser();
  const [qrcodeUrl, setqrcodeUrl] = useState();

  useEffect(() => {
    if (firestoreUser && firestoreUser.shortId) {
      QRCode.toDataURL(
        firestoreUser.shortId,
        { margin: 2, scale: 50 },
        (err, url) => {
          setqrcodeUrl(url);
        }
      );
    }
  }, [firestoreUser]);

  return (
    <Layout>
      <SEO title="Profile" />
      {firestoreUser ? (
        <div className="container mx-auto">
          <img
            alt="QR Code"
            aria-describedby="shortId"
            className="w-1/2 sm:w-1/3 md:w-1/4 mx-auto"
            src={qrcodeUrl}
          />
          <p id="shortId" className="text-center">
            {firestoreUser.shortId}
          </p>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
};

export default ProfilePage;
