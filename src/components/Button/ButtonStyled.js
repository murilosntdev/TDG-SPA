import styled from "styled-components";

export const Bttn = styled.button`
    align-items: center;
    border: none;
    border-radius: 0.6rem;
    cursor: pointer;
    display: flex;
    font-size: ${props => props.theme.fontSizes.medium};
    height: 2.5rem;
    justify-content: center;
    pointer-events: ${props => props.$loading ? "none" : "auto"};
`

export const ScBttn = styled(Bttn)`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};

    &:hover {
        background-color: ${props => props.theme.colors.darkSecondary};
    }
`