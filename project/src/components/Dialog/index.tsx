import styled from "styled-components";
import { Button } from "../ui/Button";

interface IDialog {
    onClose:    () => void;
    title:          string;
    Form:           (props: any) => React.ReactElement;
    customProps:    any;
}

export const Dialog = ({ onClose, title, Form, customProps }: IDialog) => {

    return (
        <Container>
            <Wrapper>
                <ToolBar>
                    <span>{title}</span><button onClick={onClose}>X</button>
                </ToolBar>
                <Form handleClose={onClose} {...customProps} />
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;

    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    /* background-color: #ca3c3c;
    opacity: 50%; */
    background-color: rgb(255 255 255 / 50%);
`;

const Wrapper = styled.div`
    position: absolute;
    top: 100px;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;

    gap: 1rem;

    background-color: #FFFFFF;
    box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);
    opacity: 100%;
`;

const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;

    &>span {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    &>button {
        border: none;
        background: none;

        font-weight: bold;
        text-align: center;
        font-size: 0.7rem;

        cursor: pointer;

        &:hover {
            border: 1px solid hsl(200,100%,50%);
            color: hsl(200,100%,50%);
        }
    }
`;