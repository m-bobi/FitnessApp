import React, { useState, useEffect } from 'react';

function App() {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetchWeatherForecast();
  }, []);

  const fetchWeatherForecast = async () => {
    try {
      const response = await fetch('http://localhost:5259/weatherforecast');
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      const data = await response.json();
      setForecastData(data);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <ul>
        {forecastData.map((forecast, index) => (
          <li key={index}>
            Date: {forecast.date}, Temperature: {forecast.temperatureC}°C, Summary: {forecast.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
