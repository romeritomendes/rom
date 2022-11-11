import styled from "styled-components";

interface IButton {
    size?: number;
    align?: string;
}

export const Button = styled.button<IButton>`
    border: 0.1px solid #000000;
    border-radius: 4px;

    width:  ${p => p.size ? p.size:5}rem;
    min-height: 2.563rem;

    background: #FCFCFC;

    box-sizing: border-box;

    font-weight: bold;
    text-align: ${p => p.align ? p.align:'center'};

    cursor: pointer;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
        color: hsl(200, 100%, 50%);
    }
`;