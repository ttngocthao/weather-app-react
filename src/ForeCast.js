import React from "react";
const ForeCast = props => {
  return (
    <div className="forecast-detail">
      <h2> {props.day} </h2>
      {props.icon && (
        <img
          alt=""
          src={`https://openweathermap.org/img/w/${props.icon}.png`}
        />
      )}
      {props.temp && <h3>{props.temp}&deg;C</h3>}
    </div>
  );
};
export default ForeCast;
