const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.registerLegacy = functions.region('asia-east2').https.onCall((data, context) => {
    return data
  });
