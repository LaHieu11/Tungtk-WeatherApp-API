// weatherReducer.js
const initialState = {
  city: "", // Thêm city vào initialState
  infor: null,
  latID: "",
  lonID: "",
  sevendays: null,
  sevenDayFeelsLike: [],
  sevenDayTemp: [],
  sevenDayHumidity: []
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_INFOR":
      return { ...state, infor: action.payload };
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
    default:
      return state;
  }
};

export default weatherReducer;
