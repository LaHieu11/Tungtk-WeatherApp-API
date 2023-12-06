// WeatherToday.js
import React, { useEffect, useState, PureComponent } from "react";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WeatherToday from "./WeatherToday";
import { setSevendays } from "./store/weatherActions";
const ChartTab = () => {
    const dispatch = useDispatch();
    const sevendays = useSelector((state) => state.sevendays);
    const inputCity = useSelector(state => state.inputCity);
    const sevenDayWindSpeed = useSelector(state => state.sevenDayWindSpeed);
    const sevenDaydt_txt = useSelector(state => state.sevenDaydt_txt);
    const sevenDayTemp = useSelector(state => state.sevenDayTemp);

    

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
        if (inputCity) {
            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&cnt=8&appid=a3095f77e7b58c2de9fa5d42f07ac72e`
            )
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setSevendays(data));
                });
        }
    }, [inputCity]);

   
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

    const [chartSize, setChartSize] = useState({ width: 900, height: 500 });

console.log("sevendays:",sevendays);
    return (
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
    );
};

export default ChartTab;
