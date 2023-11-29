// App.js
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Home from "./pages/Homepage/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Today from "./components/Today";
import Week from "./components/Week";
import Chart from "./components/Chart";
import GetLatAndLonFromAPI from "./GetLatAndLonFromAPI";
import Login from "./pages/Login/Login"
  function App() {
    return (
      
       
<div style={{ height: "100vh", backgroundColor: "#d6d7da", display: "flex", justifyContent: "center", alignItems: "center" }}>
       <BrowserRouter>
         <Routes>
           <Route path='/home' element={<Home/>} > </Route>
           <Route path='/' element={<Login/>} ></Route>
         </Routes>
        
       </BrowserRouter>
     </div>
    );
  }

export default App;
