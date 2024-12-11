import { LdngBr, LdngCrcl } from "./LoadingStyled"

export const LoadingCircle = () => {
    return <LdngCrcl />
};

export const LoadingBar = (props) => {
    return <LdngBr id={props.$infos.type + "-popup-timer"} />
};