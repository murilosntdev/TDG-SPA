import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { connectSocket, disconnectSocket, leaveRoom } from "../../services/ws";
import * as S from "./GameRoomStyled"
import { useEffect } from "react";

const GameRoom = () => {
    const navigate = useNavigate();

    useEffect(() => {
        connectSocket();

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        const handleUnload = () => {
            disconnectSocket();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("unload", handleUnload);
        };
    }, []);

    async function handleLeaveRoom() {
        const path = window.location.pathname;
        const extractedRoomname = path.split("/")[2];
        const data = {
            room_id: extractedRoomname
        };
        const accountInfos = JSON.parse(sessionStorage.getItem("accountInfos"));

        try {
            await leaveRoom(data).then(() => {
                navigate(`/u/${accountInfos.username}`);
            });
        } catch (error) {
            navigate(`/u/${accountInfos.username}`);
            return;
        };
    };

    return (
        <S.GameRoomPage>
            <Navbar
                action="leaveRoom"
                onClick={handleLeaveRoom}
            />
        </S.GameRoomPage>
    );
};

export default GameRoom;