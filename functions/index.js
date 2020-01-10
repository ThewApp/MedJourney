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
      throw new functions.https.HttpsError("invalid-data");
    }
    return admin
      .auth()
      .createUser({
        email: `${data.thaiId}@user.mdcuopenhouse.docchula.com`
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
      .then(([customToken]) => ({
        token: customToken
      }));
  });
