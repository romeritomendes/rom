import React from 'react';
import styled from 'styled-components';

import ProjectForm from '../ProjectForm';
import Calendar from '../Calendar';

import { Provider } from '../../context';
import { MonthTitle } from '../Calendar/MonthTitle';

const TimeSheet = () => {
    return (
        <Provider>
            <Container>
                <h3>TimeSheet</h3>
                <MonthTitle />
                <ProjectForm />
                <Calendar />
            </Container>
        </Provider>
    )
}

const Container = styled.section`
    display: grid;

    grid-template-columns: auto auto;
    gap: 0.5rem;

    &>h3 {
        display: flex;
        align-items: center;

        padding: 0 1rem;

        height: 2rem;

    }
`;

export default TimeSheet;