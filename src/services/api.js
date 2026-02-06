import axios from "axios";
console.log(process.env.EXPO_PUBLIC_API_URL);


export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,    
    timeout: 10000,
});