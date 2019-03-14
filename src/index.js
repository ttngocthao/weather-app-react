import React from "react";
import ReactDOM from "react-dom";
import Today from "./Today";
import ForeCast from "./ForeCast";
import Form from "./Form";
import Location from "./Location";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cityInput: undefined,
      countryInput: undefined,
      currenTemp: undefined,
      weatherId: undefined,
      today: undefined,
      tempMin: undefined,
      tempMax: undefined,
      country: undefined,
      city: undefined,
      forecastTemp: [],
      forecastDay: [],
      forecastIcon: [],
      error: ""
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForeCast = this.renderForeCast.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.getBackground = this.getBackground.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  getWeather = async e => {
    const city = this.state.cityInput;
    const country = this.state.countryInput;
    const today_api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=088a0ac4bc2a245e4028db50368dab23`
    );
    const today_response = await today_api.json();

    const future_api = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=638af793e54c74d310faa043516a7b76`
    );
    const future_response = await future_api.json();
    if (city === undefined || country === undefined) {
      this.setState({
        error: "Please enter the values"
      });
    } else if (today_response.cod === "404" || future_response.cod === "404") {
      this.setState({
        error: today_response.message
      });
    } else {
      this.setState({
        currentTemp: Math.round(today_response.main.temp),
        country: today_response.sys.country,
        city: today_response.name,
        weatherId: today_response.weather[0].id,
        tempMin: Math.round(today_response.main.temp_min),
        tempMax: Math.round(today_response.main.temp_max),
        error: "",
        today: today_response.dt,
        currentDescription: today_response.weather[0].description,
        currentWeatherIcon: today_response.weather[0].icon,
        forecastTemp: [
          future_response.list[0].main.temp,
          future_response.list[8].main.temp,
          future_response.list[16].main.temp,
          future_response.list[24].main.temp
        ].map(temp => Math.round(temp)),
        forecastDay: [
          future_response.list[7].dt_txt,
          future_response.list[15].dt_txt,
          future_response.list[23].dt_txt,
          future_response.list[31].dt_txt
        ].map(item => this.changeDate(item)),
        forecastIcon: [
          future_response.list[0].weather[0].icon,
          future_response.list[8].weather[0].icon,
          future_response.list[16].weather[0].icon,
          future_response.list[24].weather[0].icon
        ]
      });
    }
  };
  changeDate(dateString) {
    var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var date = new Date(dateString.slice(0, 10));
    console.log(date.getDay());
    console.log(dayOfWeek[date.getDay()]);
    return dayOfWeek[date.getDay()];
  }
  //var date = new Date(fObj.list[7].dt_txt.slice(0,10))
  //
  renderForeCast(i) {
    return (
      <ForeCast
        day={this.state.forecastDay[i]}
        temp={this.state.forecastTemp[i]}
        icon={this.state.forecastIcon[i]}
      />
    );
  }
  getBackground(idWeather) {
    let weather = "";
    if (idWeather === 800) {
      weather = "clear";
    } else if (199 < idWeather && idWeather < 250) {
      weather = "thunderstorm";
    } else if (290 < idWeather && idWeather < 480) {
      weather = "drizzle";
    } else if (490 < idWeather && idWeather < 532) {
      weather = "rain";
    } else if (532 < idWeather && idWeather < 623) {
      weather = "snow";
    } else if (623 < idWeather && idWeather < 782) {
      weather = "mist";
    } else if (800 < idWeather) {
      weather = "cloud";
    } else {
      weather = "default";
    }
    const backgroundImg = [
      { weather: "default", img: "https://i.imgur.com/VbqG5MX.jpg" },
      { weather: "thunderstorm", img: "https://i.imgur.com/ZX9IVco.jpg" },
      { weather: "drizzle", img: "https://i.imgur.com/sj8ccS2.jpg" },
      { weather: "rain", img: "https://i.imgur.com/GXrQKRB.jpg" },
      { weather: "snow", img: "https://i.imgur.com/w3jcLJz.jpg" },
      { weather: "mist", img: "https://i.imgur.com/k6NGUX0.jpg" },
      { weather: "clear", img: "https://i.imgur.com/dOr6P2q.jpg" },
      { weather: "cloud", img: "https://i.imgur.com/kid6X2w.jpg" }
    ];
    let url = "";
    for (var item of backgroundImg) {
      if (item.weather === weather) {
        url = item.img;
      }
    }
    return url;
  }
  render() {
    const imgUrl = this.getBackground(this.state.weatherId);
    const appStyle = {
      backgroundImage: "url(" + imgUrl + ")"
    };
    console.log(this.state.forecastDay);
    return (
      <div className="App" style={appStyle}>
        <div className="container">
          <Form
            getWeather={this.getWeather}
            city={this.handleChange}
            country={this.handleChange}
            error={this.state.error}
          />
          <div className="wrapper">
            <div className="today">
              <Location city={this.state.city} country={this.state.country} />
              <Today
                temp={this.state.currentTemp}
                description={this.state.currentDescription}
                icon={this.state.currentWeatherIcon}
                date={this.state.today}
                min={this.state.tempMin}
                max={this.state.tempMax}
              />
            </div>
            <div className="forecast">
              {this.renderForeCast(0)}
              {this.renderForeCast(1)}
              {this.renderForeCast(2)}
              {this.renderForeCast(3)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
