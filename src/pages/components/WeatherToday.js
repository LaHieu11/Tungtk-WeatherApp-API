// WeatherToday.js
import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { WiDaySunny, WiCloudy, WiDayRainMix, WiDayFog, WiDaySnow, WiHumidity } from 'weather-icons-react';
import {setCurrentDayWeather, setCity, setInputCity} from './store/weatherActions'

const WeatherToday = () => {

    const dispatch = useDispatch();
    const currentDayWeather = useSelector(state => state.currentDayWeather);
    const city = useSelector(state => state.city);
    const inputCity = useSelector(state => state.inputCity);
    

    useEffect(() => {
        if (inputCity) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setCurrentDayWeather(data));
                });
        }
    }, [inputCity]);
    

    const handleCityChange = (event) => {
        dispatch(setInputCity(event.target.value));
    };

    const handleSearch = () => {
        setInputCity(inputCity);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };


    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        // Tạo một interval để cập nhật thời gian mỗi giây
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Clear interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Lấy thông tin ngày và giờ từ đối tượng Date
    const date = currentDateTime.toLocaleDateString();
    const time = currentDateTime.toLocaleTimeString();

    const convertTimestampToTime = (timestamp) => {
        // Tạo một đối tượng Date từ timestamp (đơn vị là mili giây, nên cần nhân với 1000)
        const date = new Date(timestamp * 1000);

        // Sử dụng hàm toLocaleTimeString để lấy chuỗi biểu diễn giờ
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getWeatherIcon2 = (description) => {
        switch (description) {
            case 'scattered clouds':
                return <WiDaySunny size={200} color='#ffc518' />;
            case 'broken clouds':
                return <WiCloudy size={200} color='#ffc518' />;
            case 'light rain':
                return <WiDayRainMix size={200} color='#ffc518' />;
            case 'overcast clouds':
                return <WiDayFog size={200} color='#ffc518' />;
            case 'light snow':
                return <WiDaySnow size={200} color='#ffc518' />;
            case 'few clouds':
                return <WiHumidity size={200} color='#ffc518' />
            default:
                return null;
        }
    };



    return (
        <Col className="side-bar" style={{marginLeft: '120px'}} xs={3}>
            <div style={{ width: "220%", height: "35px", display: "flex", justifyContent: "center" }}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter city name"
                    value={inputCity}
                    onChange={handleCityChange}
                    onKeyDown={handleEnterPress}
                />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                    <div>
                        <div style={{ marginTop: "30px", width: "100%", display: "flex", justifyContent: "center" }}>
                            {getWeatherIcon2(currentDayWeather.weather[0].description)}
                        </div>
                        <h1 id="location">{currentDayWeather.name}</h1>
                        <h1 id="temperature">{(currentDayWeather.main.temp - 273.15).toFixed(1)} °C</h1>
                        <div>
                            <p style={{ textAlign: "center", fontSize: "1.25rem" }}>{date}</p>
                            <p style={{ textAlign: "center", fontSize: "1.25rem" }}>{time}</p>
                        </div>
                        <h4 id="detail-weather"> {currentDayWeather.weather[0].description}</h4>
                        <h4 id="clear-percent">Clear {currentDayWeather.clouds.all}%</h4>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <img style={{ borderRadius: "5px", width: "90%" }} src="https://us.123rf.com/450wm/macrovector/macrovector1805/macrovector180500152/100615959-weather-forecast-web-page-with-heavy-rain-on-dark-cloudy-day-with-people-under-umbrellas-vector-illu.jpg?ver=6" />
                        </div>
                    </div>
                )}
            </div>
        </Col>
    );
};

export default WeatherToday;
