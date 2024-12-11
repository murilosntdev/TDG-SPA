import styled from "styled-components";

export const Ftr = styled.footer`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secondary};
    min-height: 2rem;
    padding: 0.5rem;
    text-align: center;
`