import React, { useEffect, useState, PureComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
    WiDaySunny, WiThermometer, WiDayWindy, WiSunrise, WiSunset, WiHumidity, WiBarometer, WiDayFog, WiThermometerExterior,
    WiRain, WiCloudy, WiDayRainMix, WiDaySnow
} from "weather-icons-react";

const TodayTab = () => {

    
    const dispatch = useDispatch();
    const currentDayWeather = useSelector((state) => state.currentDayWeather);




    const convertTimestampToTime = (timestamp) => {
        // Tạo một đối tượng Date từ timestamp (đơn vị là mili giây, nên cần nhân với 1000)
        const date = new Date(timestamp * 1000);

        // Sử dụng hàm toLocaleTimeString để lấy chuỗi biểu diễn giờ
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        
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
    );
};

export default TodayTab;