import { io } from "socket.io-client";
import { getCookie } from "./cookies";

let socket = null;

export const connectSocket = () => {
    return new Promise((resolve, reject) => {
        if (!socket) {
            const bearerToken = getCookie("bearer_token");

            socket = io(process.env.REACT_APP_API_BASE_URL, {
                query: {
                    bearer_token: bearerToken
                },
                transports: ["websocket"]
            });

            socket.on("connectionSuccess", (message) => {
                resolve(message);
            });

            socket.on("connect_error", (error) => {
                reject(error.message);
            });
        };
    });
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    };
};