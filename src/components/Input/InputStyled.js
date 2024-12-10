import styled from "styled-components";

export const Inpt = styled.input`
    border: none;
    border-radius: 0.6rem;
    font-size: 1.4rem;
    height: 2.5rem;
    outline: none;
    padding: 0.5rem 1rem;

    &:focus {
        outline: 0.15rem solid ${props => props.theme.colors.secondary};
    }
`

export const InptLbl = styled.label`
    color: white;
`

export const InptSpn = styled.span`
    color: ${props => props.theme.colors.danger};
    font-weight: bold;
    min-height: 1.125rem;
    text-align: right;
`