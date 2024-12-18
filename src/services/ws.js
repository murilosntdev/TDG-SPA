import { io } from "socket.io-client";
import { getCookie } from "./cookies";

let socket = null;
let reconnectAttempts = 0;
let connectingPromise = false;
const maxReconnectAttempts = 3;
const reconnectInterval = 3000;

export const connectSocket = () => {
    if (connectingPromise) {
        return connectingPromise;
    };

    connectingPromise = new Promise((resolve, reject) => {
        if (socket && socket.connected) {
            connectingPromise = null;
            return resolve("Conexão WebSocket já estabelecida.");
        };

        const establishConnection = () => {
            if (reconnectAttempts >= maxReconnectAttempts) {
                connectingPromise = null;
                reconnectAttempts = 0;
                return (reject({
                    "status": "error",
                    "message": "Erro de conexão",
                    "details": "Não foi possível conectar ao WebSocket após várias tentativas."
                }));
            };

            const bearerToken = getCookie("bearer_token");

            socket = io(process.env.REACT_APP_API_BASE_URL, {
                query: {
                    bearer_token: bearerToken
                },
                transports: ["websocket"],
                reconnection: false
            });

            socket.on("connectionSuccess", (message) => {
                reconnectAttempts = 0;
                connectingPromise = null;
                resolve(message);
            });

            socket.on("connect_error", () => {
                reconnectAttempts++;
                setTimeout(establishConnection, reconnectInterval);
            });
        };

        establishConnection();
    });

    return connectingPromise;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    };
};

export const createRoom = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("createRoom", data);

        socket.on("roomCreated", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const findRooms = () => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("findRooms");

        socket.on("rooms", (message) => {
            resolve(message);
        });
    });
};