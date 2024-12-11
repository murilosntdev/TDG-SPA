import { LoadingCircle } from "../Loading/Loading";
import { ScBttn } from "./ButtonStyled"

export const SecondaryButton = (props) => {
    return (
        <ScBttn {...props}>{props.$loading === true ? <LoadingCircle /> : props.children}</ScBttn>
    );
};