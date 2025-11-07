import { useEffect, useState } from 'react';
import './App.css'
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import WeeklyForecast from './components/WeeklyForecast.jsx';
import { getWeatherData } from './api';
import { parse } from 'date-fns';

const getGradientClass = (hour) => { 
  if (hour >= 6 && hour < 9) return 'bg-sunrise';
  if (hour > 9 && hour < 17) return 'bg-day';
  if (hour > 17 && hour < 20) return 'bg-sunset';
  console.log("time: ", hour);
  return 'bg-night'; 
}

function App() {
  const [city, setCity] = useState('Los Angeles');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hour = weatherData?.location?.localtime
  ? new Date(weatherData.location.localtime).getHours()
  : new Date().getHours();

  const gradientClass = getGradientClass(hour);

  useEffect(() => {
    const fetchWeather = async() => {
      setLoading(true);
      setError('');

      try {
        const data = await getWeatherData(city);

        const { mintemp_f, maxtemp_f } = data.forecast.forecastday[0].day;

        setWeatherData({
          current: { ...data.current, mintemp_f, maxtemp_f },
          hourly: data.forecast.forecastday[0].hour,
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        })
      }
      catch (e) {
        setError(e.message || 'An error occurred.')
      } 
      finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city])

  console.log(weatherData);

  return (
    <div className={`app ${gradientClass}`}>
      <div className="app__container">
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            <CurrentWeather data={weatherData.current} 
            location={weatherData.location}/>
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div> 
    </div>
  )
}

export default App;
