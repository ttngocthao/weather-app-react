import React from "react";
const Today = props => {
  return (
    <div>
      {props.temp && <h1>{props.temp} &deg;C</h1>}

      {props.icon && (
        <img
          alt=""
          src={`https://openweathermap.org/img/w/${props.icon}.png`}
        />
      )}

      {props.description && <h3>{props.description}</h3>}
      <div className="moreInfo">
        {props.date && <h4>TODAY</h4>}
        <h4>{props.min && <span>Min {props.min}&deg;C</span>}</h4>
        <h4>{props.max && <span>Max {props.max}&deg;C</span>}</h4>
      </div>
    </div>
  );
};
export default Today;
