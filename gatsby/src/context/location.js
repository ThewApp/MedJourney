import React from "react";
import { Location } from "@reach/router";

const LocationContext = React.createContext();

export function LocationProvider(props) {
  return (
    <Location>
      {({ location }) => (
        <LocationContext.Provider value={location} {...props} />
      )}
    </Location>
  );
}

/**
 * @return {location}
 */
function useLocation() {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error(`useLocation must be used within a LocationProvider`);
  }
  return context;
}

export default useLocation;
