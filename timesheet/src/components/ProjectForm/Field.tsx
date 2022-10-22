import React from 'react';
import styled from 'styled-components';

interface IFieldProps {
    type?:      string;
    name:       string;
    label:      string;
    width?:     number;
    value:      string;
    onChange:   (value: string) => void;
}

export const Field = ({ type, name, label, width, value, onChange }: IFieldProps) => {

    const handlerChangeNumber = (value: string) => {
        let newValue = value === '' ? '0':value.replace(/\D/g, '');
        return newValue;
    }

    return (
        <Container width={width}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type === 'date' ? type : 'text'}
                name={name}
                value={value}
                onChange={e => onChange(type === 'number' ? handlerChangeNumber(e.target.value):e.target.value)}
                style={
                    {
                        textAlign: (type === 'number' ? 'right':'left'),
                    }
                }
            />
        </Container>
    )
}

interface IContainerProps {
    width?: number;
}

const Container = styled.div<IContainerProps>`
    display: flex;
    flex-direction: column;

    padding-bottom: 1rem;
    width: ${p => p.width ? `${p.width}rem`:`100%`};

    &>label {
        padding: 0 8px;
        
        font-size: 1rem;
        font-weight: bold;
    }

    &>input {
        border: 0.3px solid #000000;
        border-radius: 6px;
        padding: 0 8px;

        height: 22px;
        font-size: 0.9rem;

        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
    }
`;