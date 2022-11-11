import React from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { ISelectOptions, Select } from './Select';

interface IFieldProps {
    type?:      string;
    options?:   ISelectOptions[];
    name:       string;
    label:      string;
    width?:     number;
    value:      string;
    onChange:   (value: string) => void;
    required?:  boolean;
}

export const Field = ({ type, options, name, label, width, value, onChange, required }: IFieldProps) => {

    const handlerChangeNumber = (value: string) => {
        let newValue = value === '' ? '0':value.replace(/\D/g, '');
        return newValue;
    }

    if(type === 'select' && options) {
        return (
            <Container width={width}>
                <label htmlFor={name}>{label}</label>
                <Select
                    options={options}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </Container>
        )
    }

    return (
        <Container width={width}>
            <label htmlFor={name}>{label}</label>
            <Input
                type={type === 'date' ? type : 'text'}
                name={name}
                value={value}
                onChange={e => onChange(type === 'number' ? handlerChangeNumber(e.target.value):e.target.value)}
                style={
                    {
                        textAlign: (type === 'number' ? 'right':'left'),
                    }
                }
                required={required}
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

    gap: 0.4rem;

    padding-bottom: 1rem;
    width: ${p => p.width ? `${p.width}rem`:`100%`};

    &>label {
        padding: 0 8px;
        
        font-size: 1rem;
        font-weight: bold;
    }
`;