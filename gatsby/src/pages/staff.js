import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import QRCodeReader from "../components/QRCodeReader";
import { useFirestore } from "../firebase";

function Stamp({ userShortId, staff, onSuccess }) {
  const firestore = useFirestore();
  const [status, setStatus] = useState("Ready");
  const [stampedUserShortId, setStampedUserShortId] = useState();

  useEffect(() => {
    if (
      firestore &&
      staff &&
      userShortId &&
      userShortId.length === 8 &&
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
            onSuccess();
          },
          error => {
            console.error(error);
            setStatus("An error has occured.");
          }
        );
    } else if (status === "Ready" && stampedUserShortId === userShortId) {
      setStatus("Stamped");
    } else if (status === "Stamped" && stampedUserShortId !== userShortId) {
      setStatus("Ready");
    }
  }, [firestore, staff, userShortId, status, stampedUserShortId, onSuccess]);

  useEffect(() => {
    if (status === "Success") {
      const timeout = setTimeout(() => setStatus("Ready"), 1000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const statusColor = {
    Ready: "green",
    Stamping: "yellow",
    Success: "lime",
    Stamped: "orange",
    "An error has occured.": "red"
  };

  return (
    <div className="flex justify-between sm:flex-col">
      <div className="p-4 text-lg sm:text-2xl">
        <p>User ID: {userShortId}</p>
        <p>Status: {status}</p>
        <div
          className="block my-2 w-full h-5"
          style={{ backgroundColor: statusColor[status] || "gray" }}
        />
      </div>
    </div>
  );
}

const StaffPage = ({ location }) => {
  const firestore = useFirestore();
  const [staff, setStaff] = useState();
  const [mode, setMode] = useState("QR Stamp");
  const [userShortId, setUserShortId] = useState("");
  const [manualUserShortId, setManualUserShortId] = useState("");

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

  return (
    <Layout>
      <SEO title="App" />
      {staff && <h1 className="text-center text-lg">{staff.eventType}</h1>}
      {staff ? (
        <div className="container mx-auto sm:flex">
          <div className="sm:w-1/2 sm:mx-2">
            {mode.includes("QR") && <QRCodeReader setCode={setUserShortId} />}
            {mode.includes("Manual") && (
              <div className="p-4">
                <label className="block mb-2" htmlFor="userShortId">
                  รหัส 8 หลัก
                </label>
                <input
                  className="block w-full shadow appearance-none bg-white border py-2 px-3 mb-2"
                  id="userShortId"
                  name="userShortId"
                  inputMode="numeric"
                  value={manualUserShortId}
                  onChange={event => setManualUserShortId(event.target.value)}
                />
                <button
                  className="bg-primary-100 hover:bg-primary-200 py-2 px-4 rounded w-full"
                  onClick={() => setUserShortId(manualUserShortId)}
                >
                  {mode}
                </button>
              </div>
            )}
          </div>
          <div className="sm:mx-2 sm:flex-auto sm:order-first">
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              value={mode}
              onChange={event => setMode(event.target.value)}
              className="w-full border p-2"
            >
              <option>QR Stamp</option>
              <option>Manual Stamp</option>
              <option>QR Reservation</option>
              <option>Manual Reservation</option>
            </select>
            {mode.includes("Stamp") && (
              <Stamp
                userShortId={userShortId}
                staff={staff}
                onSuccess={() => {
                  setManualUserShortId("");
                }}
              />
            )}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </Layout>
  );
};

export default StaffPage;
