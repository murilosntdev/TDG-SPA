import { Ftr } from "./FooterStyled";

export const Footer = () => {
    return(
        <Ftr id="footer">Copyright © {process.env.REACT_APP_COPYRIGHT_YEAR_RANGE}, Murilosntdev. Todos os direitos reservados. Truco da Galera {process.env.REACT_APP_VERSION}</Ftr>
    );
};