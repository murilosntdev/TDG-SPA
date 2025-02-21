import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { connectSocket, disconnectSocket, handsPrediction, leaveRoom, onCardPlayed, onGameStarted, onGameWinner, onHandsPredicted, onHandWinners, onLivesLost, onNextMove, onPlayerJoined, onPlayerLeft, onReceiveCards, playCard, startGame } from "../../services/ws";
import * as S from "./GameRoomStyled"
import { GameActionButtons, GameInfo, GameMessages, PlayerCards, PlayerInfo } from "../../components/Div/Div"
import { useEffect, useState } from "react";

const GameRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const path = window.location.pathname;
    const extractedRoomId = path.split("/")[2];
    const roomId = extractedRoomId;
    const accountInfos = JSON.parse(sessionStorage.getItem("accountInfos"));
    const [playerInfos, setPlayerInfos] = useState({
        playerUsername: accountInfos.username,
        madeHands: "-",
        predictedHands: "-",
        lifes: "-",
        cards: {}
    });
    const [gameInfos, setGameInfos] = useState({
        playersQtd: location.state.room_info.players_quantity,
        gameStatus: "Aguardando Jogadores..."
    });
    const [gameMessages, setGameMessages] = useState([
        `Bem-vindo ${accountInfos.username}!`
    ]);
    const [disableCards, setDisableCards] = useState(true);
    const [disablePredictions, setDisablePredictions] = useState(true);
    const [handPredictionsFormData, setHandPredictionsFormData] = useState({});

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

    useEffect(() => {
        const handlePlayerJoined = (message) => {
            setGameInfos((prevInfo) => ({
                ...prevInfo,
                playersQtd: message.details.room_info.players_quantity
            }));
            setGameMessages((prevMessages) => [
                ...prevMessages,
                `Jogador ${message.details.player_info.username} entrou na sala.`
            ]);
        };

        onPlayerJoined(handlePlayerJoined);

        const handlePlayerLeft = (message) => {
            setGameInfos((prevInfo) => ({
                ...prevInfo,
                playersQtd: message.details.room_info.players_quantity
            }));
            setGameMessages((prevMessages) => [
                ...prevMessages,
                `Jogador ${message.details.player_info.username} saiu da sala.`
            ]);
        };

        onPlayerLeft(handlePlayerLeft);

        const handleGameStarted = (message) => {
            setPlayerInfos((prevInfo) => ({
                ...prevInfo,
                madeHands: message.details.player_info.handsWon,
                predictedHands: message.details.player_info.predictedHands,
                lifes: message.details.player_info.lives
            }));
            setDisableCards(true);
            setDisablePredictions(true);
        };

        onGameStarted(handleGameStarted);

        const handleReceiveCards = (message) => {
            setPlayerInfos((prevInfo) => ({
                ...prevInfo,
                cards: message.details.cards
            }));
        };

        onReceiveCards(handleReceiveCards);

        const handleNextMove = (message) => {
            setGameInfos((prevInfo) => ({
                ...prevInfo,
                gameStatus: message.message
            }));
            if (message.message.includes("quantas mãos pretende fazer")) {
                setDisableCards(true);
                setDisablePredictions(true);
            };
            if (message.message === "Diga quantas mãos pretende fazer") {
                setDisablePredictions(false);
            };
            if (message.message.includes("escolher uma carta para jogar")) {
                setDisableCards(true);
                setDisablePredictions(true);
            };
            if (message.message === "Escolha uma carta para jogar") {
                setDisableCards(false);
            };
        };

        onNextMove(handleNextMove);

        const handleHandsPredicted = (message) => {
            setGameMessages((prevMessages) => [
                ...prevMessages,
                message.message
            ]);
        };

        onHandsPredicted(handleHandsPredicted);

        const handleCardPlayed = (message) => {
            setGameMessages((prevMessages) => [
                ...prevMessages,
                message.message
            ]);
        };

        onCardPlayed(handleCardPlayed);
    }, []);

    useEffect(() => {
        const handleHandWinners = (message) => {
            setGameMessages((prevMessages) => [
                ...prevMessages,
                message.message
            ]);

            if (message.details.winners.length === 1 && message.details.winners[0] === accountInfos.username) {
                setPlayerInfos((prevInfos) => ({
                    ...prevInfos,
                    madeHands: playerInfos.madeHands + 1
                }));
            };
        };

        const cleanup = onHandWinners(handleHandWinners);

        return cleanup;
    }, [accountInfos.username, playerInfos.madeHands]);

    useEffect(() => {
        const handleLivesLost = (message) => {
            setGameMessages((prevMessages) => [
                ...prevMessages,
                message.message
            ]);

            if (message.details.username === accountInfos.username) {
                setPlayerInfos((prevInfos) => ({
                    ...prevInfos,
                    lifes: message.details.lives
                }));
                if (message.message.includes("foi eliminado")) {
                    setPlayerInfos((prevInfos) => ({
                        ...prevInfos,
                        madeHands: "-",
                        predictedHands: "-",
                        lifes: "-",
                        cards: {}
                    }));
                    setGameInfos((prevInfos) => ({
                        ...prevInfos,
                        gameStatus: "Você foi eliminado"
                    }));
                };
            };
        };

        const cleanup = onLivesLost(handleLivesLost);

        return cleanup;
    }, [accountInfos.username]);

    useEffect(() => {
        const handleGameWinner = (message) => {
            setGameMessages((prevMessages) => [
                ...prevMessages,
                message.message
            ]);
            if (message.details.username === accountInfos.username) {
                setPlayerInfos((prevInfos) => ({
                    ...prevInfos,
                    madeHands: "-",
                    predictedHands: "-",
                    lifes: "-",
                    cards: {}
                }));
                setGameInfos((prevInfos) => ({
                    ...prevInfos,
                    gameStatus: "Você foi o ganhador"
                }));
            };
        };

        onGameWinner(handleGameWinner);
    }, [accountInfos.username]);

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

    async function handleGameStart() {
        const path = window.location.pathname;
        const extractedRoomname = path.split("/")[2];
        const data = {
            room_id: extractedRoomname
        };

        startGame(data);
    };

    function handleHandPredictionsFormDataInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setHandPredictionsFormData({ ...handPredictionsFormData, [inputName]: inputValue });
    };

    async function handleHandPredictionsFormDataSubmit(event) {
        event.preventDefault();

        const data = {
            room_id: roomId,
            hands_quantity: Number(handPredictionsFormData.handPrediction)
        };

        try {
            await handsPrediction(data).then((response) => {
                setPlayerInfos((prevInfos) => ({
                    ...prevInfos,
                    madeHands: 0,
                    predictedHands: response.details.player_info.hands_predicted
                }));
            });
        } catch (error) {
        };
    };

    async function handleCardSelect(event) {
        const data = {
            room_id: roomId,
            card: event.target.innerText
        };

        try {
            await playCard(data).then((response) => {
                setPlayerInfos((prevInfo) => ({
                    ...prevInfo,
                    cards: response.details.player_info.cards
                }));
            });
        } catch (error) {
        };
    };

    return (
        <S.GameRoomPage>
            <Navbar
                action="leaveRoom"
                onClick={handleLeaveRoom}
            />
            <S.Main>
                <PlayerInfo>
                    {playerInfos}
                </PlayerInfo>
                <GameInfo>
                    {gameInfos}
                </GameInfo>
                <GameMessages>
                    {gameMessages}
                </GameMessages>
                <PlayerCards
                    disabled={disableCards}
                    onClick={handleCardSelect}
                >
                    {playerInfos}
                </PlayerCards>
                <GameActionButtons
                    onClickStartGame={handleGameStart}
                    $gameInfos={gameInfos}
                    disablePredictions={disablePredictions}
                    onChangePredictions={handleHandPredictionsFormDataInputChange}
                    onSubmitPredictions={handleHandPredictionsFormDataSubmit}
                />
            </S.Main>
        </S.GameRoomPage>
    );
};

export default GameRoom;