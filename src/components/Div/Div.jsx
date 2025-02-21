import { GameStartButton } from "../Button/Button";
import { CrdBttn } from "../Button/ButtonStyled";
import { HandPredictionForm } from "../Form/Form";
import { GmActnBttns, GmMssgsDv, GmSttsDv, PlyrCrdsDv, PlyrInfDv } from "./DivStyled";

export const PlayerInfo = (props) => {
    return (
        <PlyrInfDv>
            <span><strong>Jogador: </strong>{props.children.playerUsername}</span>
            <span><strong>Mãos Feitas: </strong>{props.children.madeHands}/{props.children.predictedHands}</span>
            <span><strong>Vidas: </strong>{props.children.lifes}</span>
        </PlyrInfDv>
    );
};

export const GameInfo = (props) => {
    return (
        <GmSttsDv>
            <span><strong>Jogadores Conectados: </strong>{props.children.playersQtd}/8</span>
            <span><strong>Status do Jogo: </strong>{props.children.gameStatus}</span>
        </GmSttsDv>
    );
};

export const GameMessages = (props) => {
    return (
        <GmMssgsDv>
            {props.children.map((message, index) => (
                <span key={index}>{message}</span>
            ))}
        </GmMssgsDv>
    );
};

export const PlayerCards = (props) => {
    const renderCards = () => {
        return Object.keys(props.children.cards).map((card) => (
            <CrdBttn key={card} onClick={props.onClick} {...props}>{card}</CrdBttn>
        ));
    };

    return (
        <PlyrCrdsDv>
            {renderCards()}
        </PlyrCrdsDv>
    );
};

export const GameActionButtons = (props) => {
    return (
        <GmActnBttns>
            {props.$gameInfos.gameStatus === "Aguardando Jogadores..." && props.$gameInfos.playersQtd >= 2 ? <GameStartButton onClick={props.onClickStartGame} /> : ''}
            {!props.disablePredictions ? <HandPredictionForm {...props} /> : ''}
        </GmActnBttns>
    );
};