const loadedPackages = [];

export default function cdnLoader(pkg) {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  const loaded = loadedPackages.find(
    loadedPackage => loadedPackage.name === pkg.name
  );
  if (loaded && !loaded.loading) {
    return Promise.resolve(window[pkg.name]);
  } else if (loaded) {
    return loaded.loading;
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = pkg.url;
    script.onload = () => {
      if (loaded?.loading) delete loaded.loading;
      resolve(window[pkg.name]);
    };
    script.onerror = e => reject(e);
    document.head.appendChild(script);
  });
  loadedPackages.push({ name: pkg.name, loading: promise });
  return promise;
}
