import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Home.css"; // Import your custom CSS file

export default function Home() {
    const [activeLink, setActiveLink] = useState(0);
    const [activeCol, setActiveCol] = useState(null);
    const [detailData, setDetailData] = useState({});

    const handleTabSelect = (index) => {
        setActiveLink(index);
    };

    const handleColClick = (colIndex) => {
        setActiveCol(colIndex);
        // Thực hiện logic cập nhật dữ liệu cho detail-for-date dựa trên colIndex
        // Ví dụ:
        setDetailData({
            date: `Date for Day ${colIndex}`,
            temperature: `Temperature for Day ${colIndex}`,
            // Thêm các trường dữ liệu khác cần hiển thị
        });
    };

    return (
        <Container>
            <Row>
                <Col className="side-bar" xs={3}>
                    <input className="search-input" placeholder="Search" />
                    <img
                        style={{ height: "110px", width: "130px" }}
                        src="https://react-weather-app-762e5.web.app/img/Clear.png"
                        alt="Weather"
                    />
                    <h1 id="location">Ha Noi</h1>
                    <h1 id="temperature">28℃</h1>
                    <h3 id="date-time">Tuesday, 2:17 pm</h3>
                    <h4 id="detail-weather">Clear Sky</h4>
                    <h4 id="clear-percent">Clear 5%</h4>
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
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>UV Index</p>
                                        <h1 id="uv-index">Index</h1>
                                    </Col>
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Wind Status</p>
                                        <h1 id="wind-status">Index</h1>
                                    </Col>
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Sunrise & Sunset</p>
                                        <h1 id="sunrise">Index</h1>
                                        <h1 id="sunset">Index</h1>
                                    </Col>
                                </Row>
                                <Row className="today-tab-row">
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Humidity</p>
                                        <h1 id="huminity">Index</h1>
                                    </Col>
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Visibility</p>
                                        <h1 id="visibility">Index</h1>
                                    </Col>
                                    <Col className="custom-col" xs={3}>
                                        <p style={{ fontSize: "1.25rem", color: "#bdbdcc" }}>Pressure</p>
                                        <h1 id="pressure">Index</h1>
                                    </Col>
                                </Row>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* Content for Week */}
                            <div style={{ marginLeft: "35px" }}>
                                <Row className="week-tab-row">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((colIndex) => (
                                        <Col
                                            key={colIndex}
                                            className={`custom-col-2 ${activeCol === colIndex ? "active-col" : ""}`}
                                            xs={3}
                                            onClick={() => handleColClick(colIndex)}
                                        >
                                            <p id={`date-day${colIndex}`} style={{ fontSize: "1rem", color: "#bdbdcc" }}>
                                                Date {colIndex}
                                            </p>
                                            <p id={`temp-from-to${colIndex}`} style={{ fontSize: "1rem", color: "#68819c", fontWeight: "700" }}>
                                                Temperature {colIndex}
                                            </p>
                                        </Col>
                                    ))}
                                </Row>
                                <Row className="detail-for-date" style={{ marginTop: "30px", width: "925px", height: "220px", backgroundColor: "#ffffff", borderRadius: "5px" }}>
                                    <div>
                                        <p>{detailData.date}</p>
                                        <p>{detailData.temperature}</p>
                                        {/* Thêm các trường dữ liệu khác cần hiển thị */}
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
