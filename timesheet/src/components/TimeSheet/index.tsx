import React from 'react';
import styled from 'styled-components';

import ProjectForm from '../ProjectForm';
import Calendar from '../Calendar';

import { Provider } from '../../context';

const TimeSheet = () => {
    return (
        <Provider>
            <h1>TimeSheet</h1>
            <Container>
                <ProjectForm />
                <Calendar />
            </Container>
        </Provider>
    )
}

const Container = styled.section`
    display: flex;
    gap: 1rem;
`;

export default TimeSheet;