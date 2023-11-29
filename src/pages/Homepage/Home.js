import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
    WiDaySunny, WiThermometer, WiDayWindy, WiSunrise, WiSunset, WiHumidity, WiBarometer, WiDayFog, WiThermometerExterior,
    WiRain, WiCloudy, WiDayRainMix, WiDaySnow
} from "weather-icons-react";

export default function Home() {
    const [activeLink, setActiveLink] = useState(0);
    const [activeCol, setActiveCol] = useState(null);
    const [detailData, setDetailData] = useState({});
    const [inputCity, setInputCity] = useState("");
    const dispatch = useDispatch();
    const {
        city,
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
        currentDayWeather,

    } = useSelector((state) => state);
    useEffect(() => {
        // Khi giá trị của city thay đổi, gọi API để cập nhật dữ liệu
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: "SET_CURRENTDAYWEATHER", payload: data });
                });
        }
    }, [city, dispatch, inputCity]);

    useEffect(() => {
        if (currentDayWeather && currentDayWeather.coord) {
            const { lat, lon } = currentDayWeather.coord;

            // Dispatch action để cập nhật store với dữ liệu mới
            dispatch({ type: "SET_LAT_ID", payload: lat });
            dispatch({ type: "SET_LON_ID", payload: lon });
        }
    }, [currentDayWeather, dispatch]);

    //--------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // Khi giá trị của city thay đổi, gọi API để cập nhật dữ liệu
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    // Dispatch action để cập nhật store với dữ liệu mới
                    dispatch({ type: "SET_SEVEN_DAYS", payload: data });
                });
        }
        // if(currentDayWeather && currentDayWeather.list.length >0){
        //     let sunrise;
        //     let sunset;

        //     sunrise = currentDayWeather.sys.sunrise;
        //     sunset = currentDayWeather.sys.sunset; 


        // }
    }, [city, dispatch, inputCity]);

    // Trong useEffect xử lý dữ liệu 7 ngày
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



    const handleTabSelect = (index) => {
        setActiveLink(index);
    };

    const handleColClick = (colIndex) => {
        setActiveCol(colIndex);
        // Thực hiện logic cập nhật dữ liệu cho detail-for-date dựa trên colIndex
        // Ví dụ:
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

    const handleCityChange = (event) => {
        setInputCity(event.target.value);
    };

    const handleSearch = () => {
        dispatch({ type: "SET_CITY", payload: inputCity });
    };

    const handleEnterPress = (event) => {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const convertTimestampToTime = (timestamp) => {
        // Tạo một đối tượng Date từ timestamp (đơn vị là mili giây, nên cần nhân với 1000)
        const date = new Date(timestamp * 1000);

        // Sử dụng hàm toLocaleTimeString để lấy chuỗi biểu diễn giờ
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    //----lấy ngày
    // const EightDaysForecast = ({ dates }) => (
    //     <div>
    //         <ul>
    //             {dates.map((date, index) => (
    //                 <li key={index}>
    //                     <p>Thứ {date.toLocaleDateString("en-US", { weekday: "long" })}</p>
    //                     <p>Ngày {date.toLocaleDateString()}</p>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    const getWeatherIcon = (description) => {
        switch (description) {
            case 'scattered clouds':
                return <WiDaySunny />;
            case 'broken clouds':
                return <WiCloudy />;
            case 'light rain':
                return <WiDayRainMix />;
            case 'overcast clouds':
                return <WiDayFog />;
            case 'light snow':
                return <WiDaySnow />;
            case 'few clouds':
                return <WiHumidity/>
            default:
                return null;
        }
    };



    return (
        <Container style={{ height: "90vh" }}>
            <Row>
                <Col className="side-bar" xs={3}>
                    <div style={{ width: "100%", height: "35px", display: "flex", justifyContent: "center" }}>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Enter city name"
                            value={inputCity}
                            onChange={handleCityChange}
                            onKeyDown={handleEnterPress}
                        />
                    </div>
                    {/* <img
                        style={{ height: "110px", width: "130px" }}
                        src="https://react-weather-app-762e5.web.app/img/Clear.png"
                        alt="Weather"
                    /> */}
                    <div>
                        {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                            <div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    {getWeatherIcon(currentDayWeather.weather[0].description)}
                                </div>
                                <h1 id="location">{currentDayWeather.name}</h1>               
                                <h1 id="temperature">{(currentDayWeather.main.temp - 273.15).toFixed(1)} °C</h1>
                                <div>
                                    <p style={{ fontSize: "1.25rem" }}>{date}</p>
                                    <p style={{ fontSize: "1.25rem" }}>{time}</p>
                                </div>
                                <h4 id="detail-weather"> {currentDayWeather.weather[0].description}</h4>
                                <h4 id="clear-percent">Clear {currentDayWeather.clouds.all}%</h4>
                            </div>
                        )}
                    </div>



                </Col>

                <Col className="content" xs={9}>
                    <Tabs onSelect={handleTabSelect} selectedIndex={activeLink}>
                        <TabList className="menu-list">
                            <Tab style={{ color: "#707880", fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Today</Tab>
                            <Tab style={{ color: "#707880", fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Week</Tab>
                            <Tab style={{ color: "#707880", fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Chart</Tab>
                        </TabList>

                        <TabPanel>
                            <div style={{ marginLeft: "43px" }}>
                                <Row className="today-tab-row">
                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Feels like</p>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><WiThermometer size={60} color='#ffc518' /></div>
                                            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", width: "100%", display: "flex", justifyContent: "center", color: "#6c757d" }} id="uv-index">{(currentDayWeather.main.feels_like - 273.15).toFixed(1)}°C</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Wind Status</p>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><WiDayWindy size={60} color='#5f9ffd' /></div>
                                            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", width: "100%", display: "flex", justifyContent: "center", color: "#6c757d" }} id="wind-status">{currentDayWeather.wind.speed} km/h</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Sunrise & Sunset</p>
                                            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6c757d" }} id="sunrise"><WiSunrise size={50} color='#ffc518' />{convertTimestampToTime(currentDayWeather.sys.sunrise)}</h1>
                                            <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#6c757d" }} id="sunset"> <WiSunset size={50} color='#ffc518' />{convertTimestampToTime(currentDayWeather.sys.sunset)}</h1>
                                        </Col>
                                    )}

                                </Row>
                                <Row className="today-tab-row">
                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Humidity</p>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><WiHumidity size={60} color='#5f9ffd' /></div>
                                            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", width: "100%", display: "flex", justifyContent: "center", color: "#6c757d" }} id="huminity">{currentDayWeather.main.humidity}%</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Visibility</p>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><WiBarometer size={60} color='#ffc518' /></div>
                                            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", width: "100%", display: "flex", justifyContent: "center", color: "#6c757d" }} id="visibility">{currentDayWeather.visibility / 1000} km</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Pressure</p>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><WiThermometerExterior size={60} color='#5f9ffd' /></div>
                                            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", width: "100%", display: "flex", justifyContent: "center", color: "#6c757d" }} id="pressure">{currentDayWeather.main.pressure} hPa</h1>
                                        </Col>
                                    )}

                                </Row>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Week */}
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

                                                {/* Display weather icon based on the description */}
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
                                )};
                                <Row className="detail-for-date" style={{ marginTop: "30px", width: "925px", height: "220px", backgroundColor: "#ffffff", borderRadius: "5px" }}>
                                    <div>
                                        <Row>
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
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Chart */}
                            <div>Content for Chart</div>
                        </TabPanel>
                    </Tabs>
                    {/* ... your existing code ... */}
                </Col>
            </Row>
        </Container>
    );
}
