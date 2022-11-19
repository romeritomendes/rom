import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{}

export const CheckBox = (props: ICheckBoxProps) => {
    return (
        <Container {...props} />
    )
}

const Container = styled.input`
    border: .05rem solid #777;
    border-radius: 6px;
    padding: 0 1rem;
    
    min-height: 2.563rem;
    font-size: 1rem;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;

    outline: none;

    vertical-align: middle;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;