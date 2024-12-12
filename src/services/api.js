import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export async function authFetch(endpoint, { method = "GET", data = null, headers = {}, navigate } = {}) {
    const createConfig = () => ({
        method,
        url: endpoint,
        headers,
        withCredentials: true,
        ...(data && { data })
    });

    try {
        const response = await api(createConfig());
        return (response.data);
    } catch (error) {
        const status = error.response.data.error.status;

        if (status === 401) {
            try {
                await api.post("/session/refreshToken", {}, { withCredentials: true });

                const response = await api(createConfig());
                return (response.data);
            } catch (refreshTokenError) {
                if (navigate) navigate("/");
            };
        };

        return (error.response.data);
    };
};