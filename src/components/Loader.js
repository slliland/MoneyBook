import React from "react";
import Ionicon from "react-ionicons";

const Loader = () => (
  <div className="loading-component text-center">
    <Ionicon icon="ios-refresh" fontSize="40px" color="#3498db" rotate={true} />
    <h5>Loading...</h5>
  </div>
);

export default Loader;