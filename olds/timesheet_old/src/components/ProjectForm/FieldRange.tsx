import React from 'react';
import styled from 'styled-components';
import { Input } from './Input';

interface IFieldProps {
    type?:      string;
    name:       string;
    label:      string;
    width?:     number;
    lowValue:   string;
    highValue:  string;
    onChange:   (props: { kind: string; value: string }) => void;
}

export const FieldRange = ({ type, name, label, width, lowValue, highValue, onChange }: IFieldProps) => {

    return (
        <Container>
            <label htmlFor={name}>{label}</label>
            <InputLine>
                <Input
                    type={type === 'date' ? type : 'text'}
                    name={`${name}Low`}
                    value={lowValue}
                    onChange={e => onChange({ kind: 'LOW', value: e.target.value})}
                    style={
                        {
                            textAlign: (type === 'number' ? 'right':'left'),
                            width: `${width}rem`
                        }
                    }
                />
                <Input
                    type={type ? type : 'text'}
                    name={`${name}High`}
                    value={highValue}
                    onChange={e => onChange({ kind: 'HIGH', value: e.target.value})}
                    style={
                        {
                            textAlign: (type === 'number' ? 'right':'left'),
                            width: `${width}rem`
                        }
                    }
                />
            </InputLine>
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

const InputLine = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;