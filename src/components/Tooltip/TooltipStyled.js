import styled from "styled-components";

export const Tltp = styled.div`
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 0.6rem;
    color: ${props => props.theme.colors.primary};
    display: none;
    left: 1rem;
    padding: 0.6rem;
    position: absolute;
    text-align: center;
    top: 1rem;
    white-space: nowrap;

    #list {
        list-style-type: none;
    }
`