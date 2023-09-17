import axios from "axios";
 
export const movieApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

 