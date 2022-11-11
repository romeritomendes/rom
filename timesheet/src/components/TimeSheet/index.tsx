import styled from 'styled-components';

import ProjectForm from '../ProjectForm';
import Calendar from '../Calendar';

import { Provider } from '../../context';
import { MonthTitle } from '../Calendar/MonthTitle';
import { useState } from 'react';
import { TimeSheetTab } from '../TimeSheetTab';
import { Field } from '../ProjectForm/Field';

const TimeSheet = () => {

    const [calendar, setCalendar] = useState(true);

    return (
        <Provider>
            <Container>
                <Field
                    type="select"
                    name="tipo"
                    label="TimeSheet"
                    value={calendar ? "true":"false"}
                    options={[ { label: "Calendário", value: "true" }, { label: "Tabela", value: "false" } ]}
                    onChange={v => setCalendar(v === "true")}
                />
                <MonthTitle />
                {
                    calendar && <Calendar /> 
                }
                {
                    !calendar &&
                    <TimeSheetTab
                        handleDel={() => {}}
                        handleEdit={() => {}}
                    /> 
                }
            </Container>
            {
                <ProjectForm />
            }
        </Provider>
    )
}

const Container = styled.section`
    /* display: grid;

    grid-template-columns: auto auto; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &>h3 {
        display: flex;
        align-items: center;

        padding: 0 1rem;

        height: 2rem;

    }
`;

export default TimeSheet;