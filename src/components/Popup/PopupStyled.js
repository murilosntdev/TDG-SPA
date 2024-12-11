import styled from "styled-components";

const calculateType = (props) => {
    if (props.$infos.type === 'success') {
        return `${props.theme.colors.success}`
    } else if (props.type === 'warning') {
        return `${props.theme.colors.warning}`
    } else {
        return `${props.theme.colors.danger}`
    };
};

export const Pppdv = styled.div`
    align-items: center;
    background-color: ${props => calculateType(props)};
    border-radius: 1rem;
    box-shadow: 0px 10px 5px -10px ${props => props.theme.colors.background};
    display: ${props => props.$status === true ? "flex" : "none"};
    flex: 1;
    flex-direction: column;
    justify-content: center;
    left: 50%;
    min-height: 5rem;
    padding: 1rem;
    position: fixed;
    top: 5%;
    transform: translate(-50%);
    width: 40rem;
    z-index: 2000;
`

export const PppSpn = styled.span`
    color: ${props => props.theme.colors.secondary};
    text-align: center;
`