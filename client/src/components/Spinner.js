import React from "react";

const Spinner = () => {
  return (
    <div className="center">
      <div className="lds-hourglass" data-testid="spinner"></div>
    </div>
  );
};

export default Spinner;
