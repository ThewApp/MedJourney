import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import QRCodeReader from "../components/QRCodeReader";
import { useFirestore } from "../firebase";

const StaffPage = ({ location }) => {
  const firestore = useFirestore();
  const [staff, setStaff] = useState();
  const [userShortId, setUserShortId] = useState();
  const [status, setStatus] = useState("Ready");
  const [stampedUserShortId, setStampedUserShortId] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const staffId = urlParams.get("staffId");
    if (firestore && staffId) {
      firestore()
        .doc(`staffs/${staffId}`)
        .get()
        .then(docSnapshot => {
          setStaff({ ...docSnapshot.data(), staffId });
        });
    }
  }, [firestore, location]);

  useEffect(() => {
    if (
      firestore &&
      staff &&
      userShortId &&
      status === "Ready" &&
      stampedUserShortId !== userShortId
    ) {
      setStatus("Stamping");
      firestore()
        .collection("stamps")
        .add({
          eventType: staff.eventType,
          staffId: staff.staffId,
          userShortId,
          timestamp: firestore.FieldValue.serverTimestamp()
        })
        .then(
          () => {
            setStatus("Success");
            setStampedUserShortId(userShortId);
          },
          error => {
            console.error(error);
            setStatus("An error has occured.");
          }
        );
    } else if (stampedUserShortId && stampedUserShortId === userShortId) {
      setStatus("Stamped");
    } else if (status === "Stamped") {
      setStatus("Ready");
    }
  }, [firestore, staff, userShortId, status, stampedUserShortId]);

  useEffect(() => {
    if (status === "Success") {
      const timeout = setTimeout(() => setStatus("Ready"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  return (
    <Layout>
      <SEO title="App" />
      {staff && <h1 className="text-center text-lg">{staff.eventType}</h1>}
      {staff ? (
        <div className="container mx-auto md:flex">
          <QRCodeReader className="md:w-1/2 md:mx-2" setCode={setUserShortId} />
          <div className="md:mx-2 md:flex-grow md:order-first">
            <p>Code: {userShortId}</p>
            <p>Status: {status}</p>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
};

export default StaffPage;
