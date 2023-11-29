import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css"; // Import your custom CSS file
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
    const [activeLink, setActiveLink] = useState(0);
    const [activeCol, setActiveCol] = useState(null);
    const [detailData, setDetailData] = useState({});
    const [inputCity, setInputCity] = useState("");

    const dispatch = useDispatch();
    const {
        city,
        latID,
        lonID,
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
   
    return (
        <Container>
            <Row>
                <Col className="side-bar" xs={3}>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={inputCity}
                            onChange={handleCityChange}
                            onKeyDown={handleEnterPress}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <img
                        style={{ height: "110px", width: "130px" }}
                        src="https://react-weather-app-762e5.web.app/img/Clear.png"
                        alt="Weather"
                    />

                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                        <div>
                            <h1 id="location">{currentDayWeather.name}</h1>
                            <div>
                                <p>Ngày: {date}</p>
                                <p>Giờ: {time}</p>
                            </div>
                            <h1 id="temperature">Nhiệt độ: {(currentDayWeather.main.temp - 273.15).toFixed(1)} °C</h1>
                            <h4>Thời tiết: {currentDayWeather.weather[0].main}</h4>
                            <h4 id="detail-weather">Description: {currentDayWeather.weather[0].description}</h4>
                            <h4 id="clear-percent">Clear: {currentDayWeather.clouds.all}%</h4>
                        </div>
                    )}

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
                                            <h1 id="uv-index">{(currentDayWeather.main.feels_like - 273.15).toFixed(1)}°C</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Wind Status</p>
                                            <h1 id="wind-status">{currentDayWeather.wind.speed} km/h</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Sunrise & Sunset</p>
                                            <h1 id="sunrise">{convertTimestampToTime(currentDayWeather.sys.sunrise)}</h1>
                                            <h1 id="sunset">{convertTimestampToTime(currentDayWeather.sys.sunset)}</h1>
                                        </Col>
                                    )}

                                </Row>
                                <Row className="today-tab-row">
                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Humidity</p>
                                            <h1 id="huminity">{currentDayWeather.main.humidity}%</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Visibility</p>
                                            <h1 id="visibility">{currentDayWeather.visibility / 1000} km</h1>
                                        </Col>
                                    )}

                                    {currentDayWeather && currentDayWeather.main && currentDayWeather.weather && (
                                        <Col className="custom-col" xs={3}>
                                            <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Pressure</p>
                                            <h1 id="pressure">{currentDayWeather.main.pressure} hPa</h1>
                                        </Col>
                                    )}

                                </Row>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Week */}
                            <div style={{ marginLeft: "35px" }}>
                                <Row className="week-tab-row">
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((colIndex) => (
                                        <Col
                                            key={colIndex}
                                            className={`custom-col-2 ${activeCol === colIndex ? "active-col" : ""}`}
                                            xs={3}
                                            onClick={() => handleColClick(colIndex)}
                                        >
                                            <p id={`date-day${colIndex}`} style={{ fontSize: "1rem", color: "#bdbdcc", color: "black" }}>
                                                {sevenDaydt_txt && sevenDaydt_txt.length > 0 && (

                                                    <p>{sevenDaydt_txt[colIndex]}</p>

                                                )}
                                            </p>
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
                                <Row className="detail-for-date" style={{ marginTop: "30px", width: "925px", height: "220px", backgroundColor: "#ffffff", borderRadius: "5px" }}>
                                    <div>
                                        <Row>
                                            <p>{detailData.date}</p>

                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <p>Temp current: {(detailData.tempCurrent -273.15).toFixed(1)} </p>
                                                <p>Temp: {(detailData.tempMin -273.15).toFixed(1)} - {(detailData.tempMax - 273.15).toFixed(1)} </p>
                                                <p>Humidity: {detailData.humidity} </p>
                                                <p>Wind speed: {detailData.windSpeed}</p>
                                            </Col>
                                            <Col xs={6}>
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
