import axios from "axios";

export const $mainApi = axios.create({
  baseURL: "https://shop-geeks.up.railway.app/api/v1",
});