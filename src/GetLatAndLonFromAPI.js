import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetLatAndLonFromAPI = () => {
    const dispatch = useDispatch();
    const { city, infor, latID, lonID, sevendays, sevenDayFeelsLike, sevenDayTemp, sevenDayHumidity } = useSelector((state) => state);

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
            // Sử dụng feelsLikeData trong phạm vi của useEffect
            feelsLikeData = sevendays.list.map((item) => item.main.feels_like);
            tempOfSevendays = sevendays.list.map((item) => item.main.temp);
            sevenDayHumidity = sevendays.list.map((item) => item.main.humidity);
            // Cập nhật state của component với dữ liệu từ feelsLikeData
           
            // Dispatch action để cập nhật store với dữ liệu mới
            dispatch({ type: "SET_FEELS_LIKE", payload: feelsLikeData });
            dispatch({type: "SET_TEMP", payload:tempOfSevendays});
            dispatch({type: "SET_HUMIDITY", payload:sevenDayHumidity})
        }

        
    }, [sevendays, dispatch]);

    const handleCityChange = (event) => {
        setInputCity(event.target.value);
    };

    const handleSearch = () => {
        // Khi người dùng nhấn nút tìm kiếm, cập nhật biến city và gọi API
        dispatch({ type: "SET_CITY", payload: inputCity });
    };

 
    console.log(sevenDayHumidity);

    //----------------------------------------------------------------------------------------------------------
    //Weather Today
    // useEffect(() => {
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=a3095f77e7b58c2de9fa5d42f07ac72e`)
    //         .then(res => res.json())
    //         .then(data => setPosts(data));
 
    // }, [id]);



    return (
        <>
            <div>
                <h1>Weather Today</h1>

            </div>
            <div>
                {/* Thêm thẻ input và nút tìm kiếm */}
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={inputCity}
                    onChange={handleCityChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {infor && (
                <div>
                    <p>Temperature: {infor.main.temp}</p>
                    <p>timezone: {infor.timezone}</p>
                </div>
            )}

            {sevenDayFeelsLike && sevenDayFeelsLike.length > 0 && (
                <div>
                    {/* Hiển thị thông tin từ state của component */}
                    <p>Feels Like for the next 7 days: {sevenDayFeelsLike.join(", ")}</p>
                </div>
            )}

            {sevenDayTemp && sevenDayTemp.length > 0 && (
                <div>
                    <p>Temperature for the next 7 days: {sevenDayTemp.join(", ")}</p>
                </div>
            )}
        </>
    );
};

export default GetLatAndLonFromAPI;
