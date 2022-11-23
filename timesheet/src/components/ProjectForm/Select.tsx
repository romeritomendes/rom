import { useState } from 'react'
import styled from 'styled-components';

export interface ISelectOptions {
    label: string;
    value: any;
}

interface ISelectProps {
    options: ISelectOptions[];
    value?: any;
    onChange: (value: string) => void;
}

export const Select = ({ options, value, onChange }: ISelectProps) => {
    
    const [show, setShow] = useState(false);

    const selectedOption = options.find(o => o.value === value);

    const handleClick = (itemValue: string) => {
        onChange(itemValue);
        setShow(false);
    }

    return (
        <Container tabIndex={0}>
            <Value
                onClick={() => setShow(open => !open)}
            >
                {selectedOption?.label}
            </Value>
            <ClearBtn onClick={() => handleClick("")}>&times;</ClearBtn>
            <Divider/>
            <Caret onClick={() => setShow(open => !open)}/>
            <List show={show}>
                {options.map(
                    item =><ListItem key={item.value} onClick={() => handleClick(item.value)}>{item.label}</ListItem>
                )}
                
            </List>
        </Container>
    )
}

const Container = styled.article`
    position: relative;

    display: flex;
    align-items: center;
    gap: .5rem;

    border: .05rem solid #777;
    border-radius: .5rem;
    padding: .5rem;

    min-height: 1.5rem;
    outline: none;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;

const Value = styled.span`
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
`;

const ClearBtn = styled.button`
    border: none;
    padding: 0;
    background: none;
    color: #777;

    outline: none;

    font-size: 1.25rem;

    cursor: pointer;

    &:focus, &:hover {
        color: #333;
    }
`;

const Divider = styled.div`
    align-self: stretch;

    width: .05rem;

    background-color: #777;
`;

const Caret = styled.div`
    border: .25em solid transparent;
    translate: 0 25%;
    border-top-color: #777;

    cursor: pointer;
`;

interface IListProps {
    show: Boolean;
}

const List = styled.ul<IListProps>`
    position: absolute;
    display: ${p => p.show ? "block":"none"};

    margin: 0;
    padding: 0;

    border: .05rem solid #777;
    border-radius: .5rem;

    list-style: none;

    left: 0;
    top: calc(100% + .25rem);

    width:  100%;
    max-height: 15rem;
    overflow-y: auto;

    z-index: 1;
    background-color: #FFF;
`;

const ListItem = styled.li`
    padding: .25rem .5rem;

    cursor: pointer;

    &:focus, &:hover {
        color: #FFF;
        background-color: hsl(200, 100%, 50%);
    }
`;