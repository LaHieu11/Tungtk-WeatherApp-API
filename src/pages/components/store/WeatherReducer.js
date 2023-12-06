// weatherReducer.js
import * as actionTypes from './weatherActions';
const initialState = {
  city: "",
  inputCity: "",
  latID: "",
  lonID: "",
  sevendays: null,
  sevenDayFeelsLike: [],
  sevenDayTemp: [],
  sevenDayHumidity: [],
  sevenDayTemp_Min: [],
  sevenDayTemp_Max: [],
  sevenDayPressure: [],
  currentDayWeather: null,
  sevenDaydt_txt: [],
  sevenDayWindSpeed: [],
  sevenDaySunrise: [],
  sevenDaySunset: [],
  sevenDayWeatherDescription: [],

};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_INPUT_CITY":
      return { ...state, inputCity: action.payload };
    case "SET_LAT_ID":
      return { ...state, latID: action.payload };
    case "SET_LON_ID":
      return { ...state, lonID: action.payload };
    case "SET_SEVEN_DAYS":
      return { ...state, sevendays: action.payload };
    case "SET_FEELS_LIKE":
      return { ...state, sevenDayFeelsLike: action.payload };
    case "SET_TEMP":
      return { ...state, sevenDayTemp: action.payload };
    case "SET_HUMIDITY":
      return { ...state, sevenDayHumidity: action.payload };
    case "SET_SEVENDAYTEMP_MIN":
      return { ...state, sevenDayTemp_Min: action.payload };
    case "SET_SEVENDAYTEMP_MAX":
      return { ...state, sevenDayTemp_Max: action.payload };
    case "SET_SEVENDAYPRESSURE":
      return { ...state, sevenDayPressure: action.payload };
    case "SET_CURRENTDAYWEATHER":
      return { ...state, currentDayWeather: action.payload };
    case "SET_SEVENDAYDT_TXT":
      return { ...state, sevenDaydt_txt: action.payload };
    case "SET_SEVENDAYWINDSPEED":
      return { ...state, sevenDayWindSpeed: action.payload };
    case "SET_SEVENDAYSUNRISE":
      return { ...state, sevenDaySunrise: action.payload };
    case "SET_SEVENDAYSUNSET":
      return { ...state, sevenDaySunset: action.payload };
    case "SET_SEVENDAYWEATHERDESCRIPTION":
      return { ...state, sevenDayWeatherDescription: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
