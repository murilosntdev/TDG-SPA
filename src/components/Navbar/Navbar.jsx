import { LgImg, Lnk, Nvbr } from "./NavbarStyled";
import isoLogo from "../../images/isoLogo.svg";
import { SecondaryButton } from "../Button/Button";

const Navbar = (props) => {
    return (
        <Nvbr id="navbar">
            <Lnk id="redirect-link" to="/">
                <LgImg id="tdg-isoLogo" src={isoLogo} alt="IsoLogo Truco da Galera" />
            </Lnk>
            {props.action === "logout" ? <SecondaryButton id="logout-button" onClick={props.onClick}>Sair</SecondaryButton> : ''}
            {props.action === "leaveRoom" ? <SecondaryButton id="leaveRoom-button" onClick={props.onClick}>Sair da Sala</SecondaryButton> : ''}
        </Nvbr>
    );
};


export default Navbar;