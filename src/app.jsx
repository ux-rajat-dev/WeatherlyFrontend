import React, { useState } from 'react';
import './style.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 New state

  const getWeather = async () => {
    if (!city) return setError('Please enter a city name');

    try {
      setError('');
      setLoading(true); // 👈 Start loading

      const response = await fetch(
        `https://weatherlybackend.onrender.com/weather/${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError('City not found!');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false); // 👈 Stop loading
    }
  };

  return (
    <div className="container">
      <div className="discp">
        <h1>Weatherly</h1>
        <p>Check your city weather</p>
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather} disabled={loading} className="search-btn">
          {loading ? (
            <>
              <div className="spinner"></div>
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Condition: {weather.weather}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind_speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
