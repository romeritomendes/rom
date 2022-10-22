import React from 'react';
import styled from 'styled-components';

interface IFieldProps {
    type?:      string;
    name:       string;
    label:      string;
    lowValue:      string;
    highValue:      string;
    onChange:   (props: { kind: string; value: string }) => void;
}

export const FieldRange = ({ type, name, label, lowValue, highValue, onChange }: IFieldProps) => {

    return (
        <Container>
            <label htmlFor={name}>{label}</label>
            <InputLine>
                <input
                    type={type === 'date' ? type : 'text'}
                    name={`${name}Low`}
                    value={lowValue}
                    onChange={e => onChange({ kind: 'LOW', value: e.target.value})}
                    style={
                        {
                            textAlign: (type === 'number' ? 'right':'left'),
                        }
                    }
                />
                <input
                    type={type ? type : 'text'}
                    name={`${name}High`}
                    value={highValue}
                    onChange={e => onChange({ kind: 'HIGH', value: e.target.value})}
                    style={
                        {
                            textAlign: (type === 'number' ? 'right':'left'),
                        }
                    }
                />
            </InputLine>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;

    padding-bottom: 1rem;
    width: 100%;

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

    &>input {
        border: 0.3px solid black;
        border-radius: 6px;
        padding: 0 8px;

        height: 22px;
        font-size: 0.9rem;
        
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        box-sizing: border-box;
    }
`;