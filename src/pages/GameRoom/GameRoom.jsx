import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { leaveRoom } from "../../services/ws";
import * as S from "./GameRoomStyled"

const GameRoom = () => {
    const navigate = useNavigate();

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