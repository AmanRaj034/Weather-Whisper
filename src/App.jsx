import Search from "./Components/search/Search.jsx";
import "./App.css";
import CurrentWeather from "./Components/current_weather/Current_weather.jsx";
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api.jsx";
import { useState } from "react";
import Forecast from "./Components/forecast/Forecast.jsx";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(
      `${
        import.meta.env.VITE_WEATHER_API_URL
      }/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );
    const currentWeatherFetch = fetch(
      `${
        import.meta.env.VITE_WEATHER_API_URL
      }/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );
    const forecastFetch = fetch(
      `${
        import.meta.env.VITE_WEATHER_API_URL
      }/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse }).catch(
        (err) => console.log(err)
      );
    });
  };

  // console.log(currentWeather);
  // console.log(forecast);

  return (
    <>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
