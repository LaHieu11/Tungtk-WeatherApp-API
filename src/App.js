// App.js
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Home from "./pages/Homepage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Today from "./components/Today";
import Week from "./components/Week";
import Chart from "./components/Chart";

  function App() {
    return (
      <BrowserRouter>
        <div style={{ height: "100vh", backgroundColor: "#d6d7da", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Home />
          {/* <Row>
          <Col>
            <Routes>
              <Route path="/today" element={<Today />} />
              <Route path="/week" element={<Week />} />
              <Route path="/chart" element={<Chart />} />
            </Routes>
          </Col>
        </Row> */}
        </div>
      </BrowserRouter>

    );
  }

export default App;
