import React from 'react';
import styled from 'styled-components';

export interface IMonthTitleProps {
    title: string;
    back: () => void;
    forward: () => void;
}

export const MonthTitle = ({ title, back, forward }: IMonthTitleProps) => {
    return (
        <Container>
            <button onClick={back}>&lt;&lt;</button>
            <h3>{title}</h3>
            <button onClick={forward}>&gt;&gt;</button>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 1rem;

    &>h3 {
        width: 10rem;

        text-align: center;
    }

    &>button {
        width:  2rem;
        height: 2rem;
    }
`;