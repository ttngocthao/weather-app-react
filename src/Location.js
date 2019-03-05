import React from "react";
const Location = props => {
  return (
    <div className="location">
      {props.city && props.country && (
        <h2>
          {props.city} {props.country}
        </h2>
      )}
    </div>
  );
};
export default Location;
