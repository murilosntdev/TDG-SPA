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
        connectingPromise = false;
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

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const joinRoom = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("joinRoom", data);

        socket.on("roomJoined", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const leaveRoom = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("leaveRoom", data);

        socket.on("roomLeft", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const startGame = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("startGame", data);

        socket.on("gameStarted", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const handsPrediction = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("handsPrediction", data);

        socket.on("handsPredicted", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const playCard = (data) => {
    return new Promise((resolve, reject) => {
        if (!socket || !socket.connected) {
            connectSocket().catch((error) => {
                reject(error);
            });

            return;
        };

        socket.emit("playCard", data);

        socket.on("cardPlayed", (message) => {
            resolve(message);
        });

        socket.on("error", (error) => {
            reject(error);
        });
    });
};

export const onPlayerJoined = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("playerJoined", callback);
};

export const onPlayerLeft = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("playerLeft", callback);
};

export const onGameStarted = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("gameStarted", callback);
};

export const onReceiveCards = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("receiveCards", callback);
};

export const onNextMove = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("nextMove", callback);
};

export const onHandsPredicted = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("handsPredicted", callback);
};

export const onCardPlayed = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("cardPlayed", callback);
};

export const onHandWinners = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("handWinners", callback);

    return () => {
        socket.off("handWinners", callback);
    };
};

export const onLivesLost = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("livesLost", callback);

    return () => {
        socket.off("livesLost", callback);
    };
};

export const onGameWinner = (callback) => {
    if (!socket || !socket.connected) {
        throw new Error("Websocket não está conectado.");
    };

    socket.on("gameWinner", callback);

    return () => {
        socket.off("gameWinner", callback);
    };
};