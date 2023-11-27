// weatherReducer.js
const initialState = {
  city: "",
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
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
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
    default:
      return state;
  }
};

export default weatherReducer;
