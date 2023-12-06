// App.js
import React from "react";
import Home from "./pages/Homepage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login"
import WeatherToday from "./pages/components/WeatherToday";
import TodayTab from "./pages/components/TodayTab";
import WeekTab from "./pages/components/WeekTab";
import ChartTab from "./pages/components/ChartTab";
function App() {
  return (


    <div style={{ height: "100vh", backgroundColor: "#d6d7da", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} > </Route>
         
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
