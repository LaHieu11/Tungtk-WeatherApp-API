import React, { useEffect, useState, PureComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    WiDaySunny, WiThermometer, WiDayWindy, WiSunrise, WiSunset, WiHumidity, WiBarometer, WiDayFog, WiThermometerExterior,
    WiRain, WiCloudy, WiDayRainMix, WiDaySnow
} from "weather-icons-react";

export default function Home() {
    const [activeLink, setActiveLink] = useState(0);
    const [activeCol, setActiveCol] = useState(null);
    const [detailData, setDetailData] = useState({});
    const [inputCity, setInputCity] = useState('');
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [city, setCity] = useState(null);
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
        currentDayWeather,

    } = useSelector((state) => state);
    useEffect(() => {
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: "SET_CURRENTDAYWEATHER", payload: data });
                });
        }
    }, [city]);

    useEffect(() => {
        if (currentDayWeather && currentDayWeather.coord) {
            const { lat, lon } = currentDayWeather.coord;

            dispatch({ type: "SET_LAT_ID", payload: lat });
            dispatch({ type: "SET_LON_ID", payload: lon });
        }
    }, [currentDayWeather, dispatch]);

    //--------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch({ type: "SET_SEVEN_DAYS", payload: data });
                });
        }
    }, [city]);
    const [chartSize, setChartSize] = useState({ width: 900, height: 500 });

    let transformedChartData = [];

    if (sevendays && sevendays.list && sevendays.list.length > 0) {

        transformedChartData = sevendays.list.map((item, index) => {

            // Kiểm tra xem có dữ liệu không
            let temperature = sevenDayTemp[index] ? (sevenDayTemp[index] - 273.15).toFixed(1) : 0;

            return {
                name: sevenDaydt_txt[index],
                Temperature: temperature,
                windSpeed: (sevenDayWindSpeed[index] ?? 0).toFixed(1)
            }
        })

    }
    useEffect(() => {
        const updateChartSize = () => {
            const container = document.getElementById('chart-container');
            if (container) {
                const { width, height } = container.getBoundingClientRect();
                setChartSize({ width, height });
            }
        };

        window.addEventListener('resize', updateChartSize);

        updateChartSize();

        return () => {
            window.removeEventListener('resize', updateChartSize);
        };
    }, []);



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

    const [tabStyles, setTabStyles] = useState([
        { color: "#707880", textDecoration: "none" },
        { color: "#707880", textDecoration: "none" },
        { color: "#707880", textDecoration: "none" },
    ]);


    const handleTabSelect = (index) => {
        setActiveLink(index);

        // Tạo một bản sao mới của mảng styles
        const newTabStyles = [...tabStyles];

        // Đặt màu và gạch chân cho tab được chọn
        newTabStyles.forEach((style, i) => {
            if (i === index) {
                style.color = "black";
                style.textDecoration = "underline";
                style.backgroundColor = "transparent";
                style.border = "none";
            } else {
                style.color = "#707880";
                style.textDecoration = "none";
                style.backgroundColor = "transparent";
                style.border = "none";
            }
        });

        // Cập nhật state tabStyles
        setTabStyles(newTabStyles);
    };

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

    const handleCityChange = (event) => {
        setInputCity(event.target.value); 
      }

    const handleSearch = () => {
        setCity(inputCity);
    }

    const handleEnterPress = (event) => {
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

                <Col className="content" xs={9}>
                    <Tabs onSelect={handleTabSelect} selectedIndex={activeLink}>
                        <TabList className="menu-list">
                            <Tab style={{ ...tabStyles[0], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Today</Tab>
                            <Tab style={{ ...tabStyles[1], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Week</Tab>
                            <Tab style={{ ...tabStyles[2], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Chart</Tab>
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
                        </TabPanel>
                        <TabPanel>
                            <div id="chart-container" style={{ width: '100%', height: '100%', marginTop: "80px" }}>
                                <LineChart
                                    width={chartSize.width}
                                    height={chartSize.height}
                                    data={transformedChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="windSpeed" stroke="#82ca9d" activeDot={{ r: 8 }} />
                                </LineChart>
                            </div>
                        </TabPanel>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
