import { Lnk } from "./LinkStyled";

export const Link = (props) => {
    return <Lnk id={props.id} onClick={props.onClick}>{props.children}</Lnk>;
};