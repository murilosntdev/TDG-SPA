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

export const CrdBttn = styled.button`
    background-color: ${props => props.disabled ? "#f0f0f0" : "#fff"};
    border: ${props => props.disabled ? "1px solid #bbb" : "1px solid #ccc"};
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    color: #333;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    font-weight: bold;
    min-width: 45px;
    opacity: ${props => props.disabled ? "0.6" : "1"};
    padding: 12px;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        box-shadow: ${props => props.disabled ? "0 2px 5px rbga(0, 0, 0, 0.05)" : "0 3px 8px rbga(0, 0, 0, 0.15)"};
        transform: ${props => props.disabled ? "none" : "scale(1.25)"};
    }
`