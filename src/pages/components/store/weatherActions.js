// weatherActions.js

export const setCity = (city) => ({
    type: "SET_CITY",
    payload: city,
  });
  
  export const setLatId = (latID) => ({
    type: "SET_LAT_ID",
    payload: latID,
  });
  
  export const setInputCity = (inputCity) => ({
    type: "SET_INPUT_CITY",
    payload: inputCity,
  });

  export const setLonId = (lonID) => ({
    type: "SET_LON_ID",
    payload: lonID,
  });

  export const setSevendays = (sevendays) => ({
    type: "SET_SEVEN_DAYS",
    payload: sevendays,
  });

  export const setSevenDayFeelsLike = (sevenDayFeelsLike) => ({
    type: "SET_FEELS_LIKE",
    payload: sevenDayFeelsLike,
  });

  export const setSevenDayTemp = (sevenDayTemp) => ({
    type: "SET_TEMP",
    payload: sevenDayTemp,
  });

  export const setSevenDayHumidity = (sevenDayHumidity) => ({
    type: "SET_HUMIDITY",
    payload: sevenDayHumidity,
  });

  export const setSevenDayTemp_Min = (sevenDayTemp_Min) => ({
    type: "SET_SEVENDAYTEMP_MIN",
    payload: sevenDayTemp_Min,
  });

  export const setSevenDayTemp_Max = (sevenDayTemp_Max) => ({
    type: "SET_SEVENDAYTEMP_MAX",
    payload: sevenDayTemp_Max,
  });

  export const setSevenDayPressure = (sevenDayPressure) => ({
    type: "SET_SEVENDAYPRESSURE",
    payload: sevenDayPressure,
  });

  export const setCurrentDayWeather = (currentDayWeather) => ({
    type: "SET_CURRENTDAYWEATHER",
    payload: currentDayWeather,
  });

  export const setSevenDaydt_txt = (sevenDaydt_txt) => ({
    type: "SET_SEVENDAYDT_TXT",
    payload: sevenDaydt_txt,
  });

  export const setSevenDayWindSpeed = (sevenDayWindSpeed) => ({
    type: "SET_SEVENDAYWINDSPEED",
    payload: sevenDayWindSpeed,
  });

  export const setSevenDaySunrise = (sevenDaySunrise) => ({
    type: "SET_SEVENDAYSUNRISE",
    payload: sevenDaySunrise,
  });

  export const setSevenDaySunset = (sevenDaySunset) => ({
    type: "SET_SEVENDAYSUNSET",
    payload: sevenDaySunset,
  });

  export const setSevenDayWeatherDescription = (sevenDayWeatherDescription) => ({
    type: "SET_SEVENDAYWEATHERDESCRIPTION",
    payload: sevenDayWeatherDescription,
  });
