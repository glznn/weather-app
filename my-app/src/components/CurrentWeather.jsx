import { format, parse } from 'date-fns';
import './CurrentWeather.css'

const getWindDescription = (value) => {
    if (value < 10) return 'Calm';
    if (value < 20) return 'A little breezy';
    if (value < 30) return 'Windy';
    return 'Very windy';
}

const getHumidityDescription = (value) => {
    if (value < 30) return 'Dry';
    if (value < 60) return 'Comfortable';
    if (value < 80) return 'Humid';
    return 'Sticky';
}

const getUVDescription = (value) => {
    if (value < 3) return 'Low';
    if (value < 6) return 'Moderate';
    if (value < 8) return 'High';
    if (value < 11) return 'Very High';
    return 'Extreme';
}

const getDayAndHHMM = (rawdate) => {
    const date = parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a')
}

const CurrentWeather = ({data, location}) => {
    const { localtime, name } = location; 
    const { temp_f, condition, feelslike_f, maxtemp_f, mintemp_f,
            wind_mph, humidity, uv
    } = data;

    return (
        <div className="current__weather">
            <div className="card left-card">
                <div>
                    <h2>{name}</h2>
                    <h1 className="temp">{Math.round(temp_f)}</h1>
                    <p>
                        ⬆ {Math.round(maxtemp_f)}° / ⬇ {Math.round(mintemp_f)}°
                    </p>
                    <p>Feels like {feelslike_f}°</p>
                    <p>{getDayAndHHMM(localtime)}</p>
                </div>
                <div className="condition">
                    <img src={condition.icon} alt={condition.text}/>
                    <h2 className="condition-text">{condition.text}</h2>
                </div>
            </div>
            <div className="card right-card">
                <div className="detail-item">
                    <span className="detail-label">💨 Wind </span>
                    <span className="detail-value">
                        {wind_mph} mp/h 
                        <br/>
                        <small>{getWindDescription(wind_mph)}</small>
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">💧 Humidity </span>
                    <span className="detail-value">
                        {humidity}%
                        <br/>
                        <small>{getHumidityDescription(wind_mph)}</small>
                    </span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">🔆 UV Index </span>
                    <span className="detail-value">
                        {uv} 
                        <br/>
                        <small>{getUVDescription(uv)}</small>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default CurrentWeather;