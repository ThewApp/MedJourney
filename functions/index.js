const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.legacyLogin = functions
  .region("asia-east2")
  .https.onCall((data, context) => {
    if (
      !(typeof data.thaiId === "string") ||
      data.thaiId.length === 0 ||
      !(typeof data.birthday === "string" || data.birthday.length === 0)
    ) {
      throw new functions.https.HttpsError("invalid-argument");
    }

    const usersDomain = "users.mdcuopenhouse.docchula.com";

    const getUser = admin
      .auth()
      .getUserByEmail(`${data.thaiId}@${usersDomain}`)
      .then(userRecord =>
        admin
          .firestore()
          .doc("users/" + userRecord.uid)
          .get()
      )
      .then(
        doc => {
          if (data.birthday === doc.get("birthday")) {
            return admin.auth().createCustomToken(doc.id);
          } else {
            throw new functions.https.HttpsError(
              "unauthenticated",
              "wrong-birthday"
            );
          }
        },
        error => {
          if (error.code !== "auth/user-not-found") throw error;
        }
      );

    const createUser = admin
      .auth()
      .createUser({
        email: `${data.thaiId}@${usersDomain}`
      })
      .then(userRecord => {
        return Promise.all([
          admin.auth().createCustomToken(userRecord.uid),
          admin
            .firestore()
            .doc("users/" + userRecord.uid)
            .set({
              thaiId: data.thaiId,
              birthday: data.birthday
            })
        ]);
      })
      .then(
        ([customToken]) => customToken,
        error => {
          if (error.code !== "auth/email-already-exists") throw error;
        }
      );

    return Promise.all([getUser, createUser]).then(
      ([userToken, newUserToken]) => {
        return { token: userToken || newUserToken };
      }
    );
  });
