import React from "react";
const Form = props => {
  return (
    <div className="form">
      <div>
        <input name="cityInput" placeholder="City/Town" onChange={props.city} />
        <input
          name="countryInput"
          placeholder="Country"
          onChange={props.country}
        />
      </div>
      <br />
      <button className="searchBtn" onClick={props.getWeather}>
        <i className="fas fa-search" />
      </button>
      {props.error && <div className="error">{props.error}</div>}
    </div>
  );
};
export default Form;
