function generateShortId(snap) {
  console.log(`Creating shortId for ${snap.id}`);
  function shortIdExists(shortId) {
    return snap.ref.parent
      .where("shortId", "==", shortId)
      .get()
      .then(querySnapshot => {
        return !querySnapshot.empty;
      });
  }

  function generateShortId() {
    const shortId = String(Math.floor(Math.random() * 10 ** 8)).padStart(
      8,
      "0"
    );
    return shortIdExists(shortId).then(exists => {
      if (exists) {
        return generateShortId();
      } else {
        console.log(`Generated shortId: ${shortId}`);
        return shortId;
      }
    });
  }

  return generateShortId().then(shortId => snap.ref.update({ shortId }));
}

module.exports = generateShortId;
