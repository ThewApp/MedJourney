import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import QRCodeReader from "../components/QRCodeReader";
import { useFirestore } from "../firebase";

function Stamp({ userShortId, staff, onSuccess }) {
  const firestore = useFirestore();
  const [status, setStatus] = useState("Ready");
  const [stampedUserShortIds, setStampedUserShortIds] = useState([]);

  useEffect(() => {
    if (firestore && staff) {
      const stamped = stampedUserShortIds.includes(userShortId);
      if (
        userShortId &&
        userShortId.length === 8 &&
        status === "Ready" &&
        !stamped
      ) {
        setStatus("Stamping");
        performance.mark("Start stamp");
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
              performance.measure("Stamp", "Start stamp");
              setStatus("Success");
              setStampedUserShortIds(stampedUserShortIds => [
                userShortId,
                ...stampedUserShortIds.slice(0, 4)
              ]);
              onSuccess();
            },
            error => {
              console.error(error);
              setStatus("An error has occured.");
            }
          );
      } else if (status === "Ready" && stamped) {
        setStatus("Stamped");
      } else if (status === "Stamped" && !stamped) {
        setStatus("Ready");
      }
    }
  }, [firestore, staff, userShortId, status, stampedUserShortIds, onSuccess]);

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
    <div>
      <p className="text-lg sm:text-2xl">User ID: {userShortId}</p>
      <p className="text-lg sm:text-2xl">Status: {status}</p>
      <div
        className="block my-2 w-full h-5"
        style={{ backgroundColor: statusColor[status] || "gray" }}
      />
      {stampedUserShortIds.length > 0 && (
        <>
          <p>Stamped:</p>
          <ul className="ml-2">
            {stampedUserShortIds.map(stampedUserShortId => (
              <li key={stampedUserShortId}>{stampedUserShortId}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Booking({ userShortId, staff, onSuccess }) {}

const StaffPage = ({ location, data }) => {
  const firestore = useFirestore();
  const [staff, setStaff] = useState();
  const [mode, setMode] = useState("QR Stamp");
  const [userShortId, setUserShortId] = useState("");
  const [manualUserShortId, setManualUserShortId] = useState("");

  console.log(data);

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
    <Layout location={location}>
      <SEO title="App" />
      {staff && <h1 className="text-center text-lg">{staff.eventType}</h1>}
      {staff ? (
        <div className="container mx-auto sm:flex">
          <div className="sm:w-1/2 p-4">
            {mode.includes("QR") && <QRCodeReader setCode={setUserShortId} />}
            {mode.includes("Manual") && (
              <div>
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
          <div className="sm:flex-auto sm:order-first p-4">
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              value={mode}
              onChange={event => setMode(event.target.value)}
              className="w-full border p-2 my-2"
            >
              <option>QR Stamp</option>
              <option>Manual Stamp</option>
              <option>QR Booking</option>
              <option>Manual Booking</option>
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
            {mode.includes("Booking") && (
              <Booking
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

export const query = graphql`
  query {
    allEventsYaml {
      nodes {
        id
        eventName
        eventPath
      }
    }
  }
`;
