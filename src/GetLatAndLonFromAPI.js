import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetLatAndLonFromAPI = () => {
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
        
    } = useSelector((state) => state);

    const [inputCity, setInputCity] = useState("");

    useEffect(() => {
        // Khi giá trị của city thay đổi, gọi API để cập nhật dữ liệu
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=7&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    // Dispatch action để cập nhật store với dữ liệu mới
                    dispatch({ type: "SET_SEVEN_DAYS", payload: data });
                });
        }
    }, [city, dispatch, inputCity]);

    useEffect(() => {
        if (sevendays && sevendays.list && sevendays.list.length > 0) {
            // Declare feelsLikeData using let
            let feelsLikeData;
            let tempOfSevendays;
            let sevenDayHumidity;
            let sevenDayTempMin;
            let sevenDayTempMax;
            let sevenDayPressure;
            // Sử dụng feelsLikeData trong phạm vi của useEffect
            feelsLikeData = sevendays.list.map((item) => item.main.feels_like);
            tempOfSevendays = sevendays.list.map((item) => item.main.temp);
            sevenDayHumidity = sevendays.list.map((item) => item.main.humidity);
            sevenDayTempMin = sevendays.list.map((item) => item.main.temp_min);
            sevenDayTempMax = sevendays.list.map((item) => item.main.temp_max);
            sevenDayPressure = sevendays.list.map((item) => item.main.pressure);
            // Dispatch action để cập nhật store với dữ liệu mới
            dispatch({ type: "SET_FEELS_LIKE", payload: feelsLikeData });
            dispatch({ type: "SET_TEMP", payload: tempOfSevendays });
            dispatch({ type: "SET_HUMIDITY", payload: sevenDayHumidity })
            dispatch({ type: "SET_SEVENDAYTEMP_MIN", payload: sevenDayTempMin })
            dispatch({ type: "SET_SEVENDAYTEMP_MAX", payload: sevenDayTempMax })
            dispatch({ type: "SET_SEVENDAYPRESSURE", payload: sevenDayPressure })
        }


    }, [sevendays, dispatch]);


    const dataForChart = sevendays.list.map(item => ({
        date: item.dt_txt,
        feelsLike: item.main.feels_like,
        temperature: item.main.temp,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
      }));
      
      // ...
      
    //   Sử dụng dataForChart để truyền vào SimpleLineChart
    //   <SimpleLineChart data={dataForChart} />

    const handleCityChange = (event) => {
        setInputCity(event.target.value);
    };

    const handleSearch = () => {
        dispatch({ type: "SET_CITY", payload: inputCity });
    };


    // console.log(sevendays);

    //----------------------------------------------------------------------------------------------------------
    //Weather Today
    useEffect(() => {
        // Khi giá trị của city thay đổi, gọi API để cập nhật dữ liệu
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    // Dispatch action để cập nhật store với dữ liệu mới
                    dispatch({ type: "SET_CURRENTDAYWEATHER", payload: data });
                });
        }
    }, [city, dispatch, inputCity]);

   
    
      

    return (
        <>

            <div>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={inputCity}
                    onChange={handleCityChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            
            <p>lat = {latID}</p>
            <p>lon = {lonID}</p>
            <div>
                <h1>Weather Today</h1>
            </div>
            {sevenDayFeelsLike && sevenDayFeelsLike.length > 0 && (
                <div>
                    <p>Feels Like for the next 7 days: {sevenDayFeelsLike.join(", ")}</p>
                </div>
            )}

            {sevenDayTemp && sevenDayTemp.length > 0 && (
                <div>
                    <p>Temperature for the next 7 days: {sevenDayTemp.join(", ")}</p>
                </div>
            )}

            {sevenDayTemp_Min && sevenDayTemp_Min.length > 0 && (
                <div>
                    <p>Temp_Min for the next 7 days: {sevenDayTemp_Min.join(", ")}</p>
                </div>
            )}

            {sevenDayTemp_Max && sevenDayTemp_Max.length > 0 && (
                <div>
                    <p>Temp_Max for the next 7 days: {sevenDayTemp_Max.join(", ")}</p>
                </div>
            )}


            

        </>
    );
};

export default GetLatAndLonFromAPI;
