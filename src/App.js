// App.js
import React from "react";
import Home from "./pages/Homepage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login"
import WeatherToday from "./pages/components/WeatherToday";
import TodayTab from "./pages/components/TodayTab";
import WeekTab from "./pages/components/WeekTab";
import ChartTab from "./pages/components/ChartTab";
import './App.css';
function App() {
  return (


    <div style={{ width: "100%", height: "100%", backgroundColor: "#d6d7da", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{width:"90%", height:"90%", position:"relative", bottom:"25px"}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} > </Route>

          </Routes>

        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
