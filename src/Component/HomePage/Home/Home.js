import React from "react";

export function Home({ selectedLocation }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <div>This place is located in</div>
        <div>{selectedLocation}</div>
      </div>
    </div>
  );
}
