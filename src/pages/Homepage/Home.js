import React, { useEffect, useState, PureComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css";
import WeatherToday from "../components/WeatherToday";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    WiDaySunny, WiThermometer, WiDayWindy, WiSunrise, WiSunset, WiHumidity, WiBarometer, WiDayFog, WiThermometerExterior,
    WiRain, WiCloudy, WiDayRainMix, WiDaySnow
} from "weather-icons-react";
import TodayTab from "../components/TodayTab";
import WeekTab from "../components/WeekTab";
import ChartTab from "../components/ChartTab";

export default function Home() {
    const [activeLink, setActiveLink] = useState(0);
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

    return (
        <Container style={{ height: "90vh" }}>
            <Row>
                <Col className="side-bar" xs={3}>
                    <WeatherToday/>
                </Col>

                <Col className="content" xs={9}>
                    <Tabs onSelect={handleTabSelect} selectedIndex={activeLink}>
                        <TabList className="menu-list">
                            <Tab style={{ ...tabStyles[0], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Today</Tab>
                            <Tab style={{ ...tabStyles[1], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Week</Tab>
                            <Tab style={{ ...tabStyles[2], fontSize: "25px", fontWeight: "600", display: "inline-block" }}>Chart</Tab>
                        </TabList>

                        <TabPanel>
                            <TodayTab/>
                        </TabPanel>

                        <TabPanel>
                            <WeekTab/>
                        </TabPanel>

                        <TabPanel>
                            <ChartTab/>
                        </TabPanel>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
