import styled from "styled-components";
import { ScBttn } from "../Button/ButtonStyled";

export const GmInfDv = styled.div`
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 15px;
    width: 100%;           
`

export const PlyrInfDv = styled(GmInfDv)`
    background-color: #eaf4fb;
    border-left: 4px solid #3b82f6;
    color: #3b82f6;
    font-weight: bold;
    text-align: left;
`

export const GmSttsDv = styled(GmInfDv)`
    background-color: #f7f7f7;
    border-left: 4px solid #8b8b8b;
    color: #666;
    font-weight: bold;
    text-align: center;
`

export const GmMssgsDv = styled(GmInfDv)`
    background-color: #f9f9f9;
    border-left: 4px solid #ddd;
    color: #555;
    font-size: 0.9em;
    max-height: 150px;
    overflow-y: auto;
`

export const PlyrCrdsDv = styled(GmInfDv)`
    background-color: #f5f5f5;  
    border-left: 4px solid #ddd;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding: 15px;
`

export const GmActnBttns = styled.div`
    display: flex;
    justify-content: center;

    ${ScBttn} {
        width: 8rem;
    }
`
