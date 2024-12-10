import styled from "styled-components";

export const Frm = styled.form`
    background-color: ${props => props.theme.colors.primary};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 1.5rem 1rem;
`

export const NwAccntFrm = styled(Frm)`
        margin: 0 2rem;
`

export const Lgnd = styled.legend`
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fontSizes.large};
`

export const Fldst = styled.fieldset`
    border: none;
`

export const FrmFld = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
`

export const FldWthTlTp = styled.div`
    display: flex;

    #info {
        margin-left: 0.3rem;
    }
`

export const TlTpIcn = styled.span`
    color: white;
    cursor: pointer;
    position: relative;
    
    &:hover > div {
        display: block;
    }
`
