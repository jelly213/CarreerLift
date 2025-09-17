// axios.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔥 Interceptor pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // Bien s'assurer qu'il n'y a PAS de retour à la ligne
        config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
});

export default api;
