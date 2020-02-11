const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

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

exports.generateShortId = functions
  .region("asia-east2")
  .https.onCall((data, context) => {
    if (!context.auth || !context.auth.uid) {
      throw new functions.https.HttpsError("unauthenticated");
    }
    const uid = context.auth.uid;

    function generateShortId(documentSnapshot) {
      function shortIdExists(shortId) {
        return documentSnapshot.ref.parent
          .where("shortId", "==", shortId)
          .get()
          .then(querySnapshot => {
            return !querySnapshot.empty;
          });
      }

      const shortId = String(Math.floor(Math.random() * 10 ** 8)).padStart(
        8,
        "0"
      );

      return shortIdExists(shortId)
        .then(exists => {
          if (exists) {
            console.log(`Existed shortId: ${shortId}`);
            return generateShortId(documentSnapshot);
          } else {
            console.log(`Generated shortId: ${shortId}`);
            return documentSnapshot.ref.update({ shortId });
          }
        })
        .then(result => console.log(result));
    }

    return admin
      .firestore()
      .doc("users/" + uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log(`Creating shortId for ${uid}`);
          return generateShortId(documentSnapshot);
        } else {
          throw new functions.https.HttpsError("not-found");
        }
      });
  });
