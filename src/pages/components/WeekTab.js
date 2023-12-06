import React, { useEffect, useState } from "react";
import { Col,  Row } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
    WiDaySunny, WiThermometer, WiDayWindy, WiSunrise, WiSunset, WiHumidity, WiBarometer, WiDayFog, WiThermometerExterior,
    WiRain, WiCloudy, WiDayRainMix, WiDaySnow
} from "weather-icons-react";
import WeatherToday from "./WeatherToday";
import { setSevendays, setSevenDayTemp, setSevenDayHumidity, setSevenDayTemp_Min, setSevenDayTemp_Max, 
    setSevenDayPressure, setSevenDaydt_txt, setSevenDayWindSpeed, setSevenDayWeatherDescription, setSevenDayFeelsLike
} from "./store/weatherActions";

const WeekTab = () => {

    const currentDayWeather = useSelector(state => state.currentDayWeather);
    const city = useSelector(state => state.city);
    const inputCity = useSelector(state => state.inputCity);
    const [activeLink, setActiveLink] = useState(0);
    const [activeCol, setActiveCol] = useState(null);
    const [detailData, setDetailData] = useState({});
    const dispatch = useDispatch();
    const {

        sevendays,
        sevenDayFeelsLike,
        sevenDayTemp,
        sevenDayHumidity,
        sevenDayTemp_Min,
        sevenDayTemp_Max,
        sevenDayPressure,
        sevenDaydt_txt,
        sevenDayWindSpeed,
        sevenDayWeatherDescription,
    

    } = useSelector((state) => state);
    

    useEffect(() => {
        if (inputCity) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setSevendays(data));
                });
        }
    }, [inputCity]);

   
    useEffect(() => {
        if (sevendays && sevendays.list && sevendays.list.length > 0) {
            // ------------------------------
            let feelsLikeData;
            let tempOfSevendays;
            let sevenDayHumidity;
            let sevenDayTempMin;
            let sevenDayTempMax;
            let sevenDayPressure;
            let sevenDaydt_txt1;
            let sevenDaywindspeed;
            let sevenDayDescription;

            feelsLikeData = sevendays.list.map((item) => item.main.feels_like);
            tempOfSevendays = sevendays.list.map((item) => item.main.temp);
            sevenDayHumidity = sevendays.list.map((item) => item.main.humidity);
            sevenDayTempMin = sevendays.list.map((item) => item.main.temp_min);
            sevenDayTempMax = sevendays.list.map((item) => item.main.temp_max);
            sevenDayPressure = sevendays.list.map((item) => item.main.pressure);
            sevenDaydt_txt1 = sevendays.list.map((item) => item.dt_txt);
            sevenDaywindspeed = sevendays.list.map((item) => item.wind.speed);
            sevenDayDescription = sevendays.list.map((item) => item.weather[0].description); // Lấy giá trị description từ mảng weather

            // Dispatch action để cập nhật store với dữ liệu mới
            dispatch({ type: "SET_FEELS_LIKE", payload: feelsLikeData });
            dispatch({ type: "SET_TEMP", payload: tempOfSevendays });
            dispatch({ type: "SET_HUMIDITY", payload: sevenDayHumidity })
            dispatch({ type: "SET_SEVENDAYTEMP_MIN", payload: sevenDayTempMin })
            dispatch({ type: "SET_SEVENDAYTEMP_MAX", payload: sevenDayTempMax })
            dispatch({ type: "SET_SEVENDAYPRESSURE", payload: sevenDayPressure })
            dispatch({ type: "SET_SEVENDAYDT_TXT", payload: sevenDaydt_txt1 })
            dispatch({ type: "SET_SEVENDAYWINDSPEED", payload: sevenDaywindspeed })
            dispatch({ type: "SET_SEVENDAYWEATHERDESCRIPTION", payload: sevenDayDescription })
        }
    }, [sevendays, dispatch]);


    const handleColClick = (colIndex) => {
        setActiveCol(colIndex);
        setDetailData({
            date: sevenDaydt_txt[colIndex],
            tempCurrent: sevenDayTemp[colIndex],
            tempFeelsLike: sevenDayFeelsLike[colIndex],
            tempMin: sevenDayTemp_Min[colIndex],
            tempMax: sevenDayTemp_Max[colIndex],
            humidity: sevenDayHumidity[colIndex],
            windSpeed: sevenDayWindSpeed[colIndex],
            description: sevenDayWeatherDescription[colIndex],
            pressure: sevenDayPressure[colIndex],

        });
    };

    const convertTimestampToTime = (timestamp) => {
        // Tạo một đối tượng Date từ timestamp (đơn vị là mili giây, nên cần nhân với 1000)
        const date = new Date(timestamp * 1000);

        // Sử dụng hàm toLocaleTimeString để lấy chuỗi biểu diễn giờ
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };



    const getWeatherIcon = (description) => {
        switch (description) {
            case 'scattered clouds':
                return <WiDaySunny size={50} color='#ffc518' />;
            case 'broken clouds':
                return <WiCloudy size={50} color='#ffc518' />;
            case 'light rain':
                return <WiDayRainMix size={50} color='#ffc518' />;
            case 'overcast clouds':
                return <WiDayFog size={50} color='#ffc518' />;
            case 'light snow':
                return <WiDaySnow size={50} color='#ffc518' />;
            case 'few clouds':
                return <WiHumidity size={50} color='#ffc518' />
            default:
                return null;
        }
    };

    console.log("inputCity trong week:",inputCity);
    return (
        <div style={{ marginLeft: "35px" }}>
            {sevendays && sevendays.list && sevendays.list.length > 0 && (
                <Row className="week-tab-row">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((colIndex) => (
                        <Col
                            key={colIndex}
                            className={`custom-col-2 ${activeCol === colIndex ? "active-col" : ""}`}
                            xs={3}
                            onClick={() => handleColClick(colIndex)}
                        >
                            <p id={`date-day${colIndex}`} style={{ fontSize: "1rem", color: "rgb(0 0 0/26%)" }}>
                                {sevenDaydt_txt && sevenDaydt_txt.length > 0 && (
                                    <p>{sevenDaydt_txt[colIndex]}</p>
                                )}
                            </p>


                            {sevendays.list[colIndex].weather && (
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    {getWeatherIcon(sevendays.list[colIndex].weather[0].description)}
                                </div>
                            )}

                            <p id={`temp-from-to${colIndex}`} style={{ fontSize: "1rem", color: "#68819c", fontWeight: "700" }}>
                                {sevenDayTemp_Min && sevenDayTemp_Min.length > 0 && sevenDayTemp_Max && sevenDayTemp_Max.length > 0 && (
                                    <div>
                                        <p>{(sevenDayTemp_Min[colIndex] - 273.15).toFixed(1)}° - {(sevenDayTemp_Max[colIndex] - 273.15).toFixed(1)}°</p>
                                    </div>
                                )}
                            </p>
                        </Col>
                    ))}

                </Row>
            )}
            <Row className="detail-for-date" style={{ marginTop: "30px", width: "925px", height: "220px", backgroundColor: "#ffffff", borderRadius: "5px" }}>
                <div>
                    <Row style={{ marginTop: "15px" }}>
                        <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>{detailData.date}</p>

                    </Row>
                    <Row>
                        <Col style={{ fontSize: "1rem", color: "#6c757d" }} xs={6}>
                            <p>Temp current: {(detailData.tempCurrent - 273.15).toFixed(1)} </p>
                            <p>Temp: {(detailData.tempMin - 273.15).toFixed(1)} - {(detailData.tempMax - 273.15).toFixed(1)} </p>
                            <p>Humidity: {detailData.humidity} </p>
                            <p>Wind speed: {detailData.windSpeed}</p>
                        </Col>
                        <Col style={{ fontSize: "1rem", color: "#6c757d" }} xs={6}>
                            {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (

                                <div>
                                    <p>Sunrise: {convertTimestampToTime(currentDayWeather.sys.sunrise)}</p>
                                    <p>Sunset: {convertTimestampToTime(currentDayWeather.sys.sunset)}</p>
                                </div>


                            )}
                            <p>Description: {detailData.description}   </p>
                            <p>Atmospheric pressure: {detailData.pressure} hPa</p>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    );
};

export default WeekTab;



