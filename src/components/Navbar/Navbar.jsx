import { LgImg, Lnk, Nvbr } from "./NavbarStyled";
import isoLogo from "../../images/isoLogo.svg";

const Navbar = () => {
    return (
        <Nvbr id="navbar">
            <Lnk id="redirect-link" to="/">
                <LgImg id="tdg-isoLogo" src={isoLogo} alt="IsoLogo Truco da Galera" />
            </Lnk>
        </Nvbr>
    );
};


export default Navbar;