// store.js
import { createStore } from "redux";
import weatherReducer from "./WeatherReducer";

const store = createStore(weatherReducer);

export default store;
