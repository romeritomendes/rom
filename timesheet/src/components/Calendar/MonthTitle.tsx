import React from 'react';
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import { months } from '../../data/months';

export interface IMonthTitleProps {
    title: string;
    back: () => void;
    forward: () => void;
}

export const MonthTitle = () => {

    const {
        year,
        month,
        back,
        forward,
    } = useGlobalContextState();
    
    return (
        <Container>
            <button onClick={back}>&lt;&lt;</button>
            <h3>{`${months[month-1].title} - ${year}`}</h3>
            <button onClick={forward}>&gt;&gt;</button>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: center;
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