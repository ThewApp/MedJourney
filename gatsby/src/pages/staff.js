import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import QRCodeReader from "../components/QRCodeReader";
import { useFirestore } from "../firebase";

const StaffPage = ({ location }) => {
  const firestore = useFirestore();
  const [staff, setStaff] = useState();
  const [userShortId, setUserShortId] = useState();
  const [manualShortId, setManualShortId] = useState("");
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
      userShortId.length === 8 &&
      !manualShortId &&
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
    } else if (
      stampedUserShortId &&
      (stampedUserShortId === userShortId ||
        stampedUserShortId === manualShortId)
    ) {
      setStatus("Stamped");
    } else if (status === "Stamped") {
      setStatus("Ready");
    }
  }, [
    firestore,
    staff,
    userShortId,
    manualShortId,
    status,
    stampedUserShortId
  ]);

  useEffect(() => {
    if (status === "Success") {
      const timeout = setTimeout(() => setStatus("Ready"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  function manualStamp() {
    if (
      firestore &&
      staff &&
      manualShortId &&
      manualShortId.length === 8 &&
      status === "Ready" &&
      stampedUserShortId !== manualShortId
    ) {
      setStatus("Manual Stamping");
      firestore()
        .collection("stamps")
        .add({
          eventType: staff.eventType,
          staffId: staff.staffId,
          userShortId: manualShortId,
          timestamp: firestore.FieldValue.serverTimestamp()
        })
        .then(
          () => {
            setStatus("Success");
            setStampedUserShortId(manualShortId);
            setManualShortId("");
          },
          error => {
            console.error(error);
            setStatus("An error has occured.");
          }
        );
    }
  }

  return (
    <Layout>
      <SEO title="App" />
      {staff && <h1 className="text-center text-lg">{staff.eventType}</h1>}
      {staff ? (
        <div className="container mx-auto sm:flex">
          <QRCodeReader className="sm:w-1/2 sm:mx-2" setCode={setUserShortId} />
          <div className="sm:mx-2 sm:flex-auto flex justify-between sm:flex-col sm:order-first">
            <div className="p-4 text-lg sm:text-2xl">
              <p>User ID: {manualShortId || userShortId}</p>
              <p>Status: {status}</p>
            </div>
            <div className="p-4 w-1/2 sm:w-auto">
              <label className="block mb-2" htmlFor="userShortId">
                รหัส 8 หลัก
              </label>
              <input
                className="block max-w-full shadow appearance-none bg-white border py-2 px-3 mb-2"
                id="userShortId"
                name="userShortId"
                inputMode="numeric"
                value={manualShortId}
                onChange={event => setManualShortId(event.target.value)}
              />
              <button
                className="bg-primary-100 hover:bg-primary-200 py-2 px-4 rounded"
                onClick={manualStamp}
              >
                Manual Stamp
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
};

export default StaffPage;
