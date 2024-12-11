import { LoadingBar } from "../Loading/Loading";
import { Pppdv, PppSpn } from "./PopupStyled"

export const Popup = (props) => {
    return (
        <Pppdv
            id={props.$infos.type + "-popup"}
            {...props}
        >
            <PppSpn id={props.$infos.type + "-popup-info"}>{props.$infos.content}</PppSpn>
            <LoadingBar {...props} />
        </Pppdv>
    );
};