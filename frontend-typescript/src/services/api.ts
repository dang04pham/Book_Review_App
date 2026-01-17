import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials:true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});

// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use(
    async (config) => {
        // Jwt Token
        const token = localStorage.getItem("JWT_TOKEN");
        if(token) {
            config.headers.Authorization= `Bearer ${token}`;
        }

        // CSRT Token
        let csrfToken = localStorage.getItem("CSRF_TOKEN");
        if(!csrfToken) {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/csrf-token`,
                    { withCredentials: true }
                );

                csrfToken = response.data.token;
                if (csrfToken) {
                    localStorage.setItem("CSRF_TOKEN", csrfToken);
                }
            } catch(error) {
                console.log("Failed to fetch CSRF token", error);
            }
        }
        if (csrfToken) {
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
        console.log("X-XSRF-TOKEN " + csrfToken);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;