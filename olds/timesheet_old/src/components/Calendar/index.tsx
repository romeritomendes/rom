import React from 'react';
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import Week from './Week';

import { getWeeksOfMonth } from '../../utils';

export interface ICalendar {

}

const Calendar = ({  }: ICalendar) => {

    const {
        year,
        month,
        projectsWorkDays
    } = useGlobalContextState();

    const weeknumbers: number[] = getWeeksOfMonth({ year, month });

    return (
        <Container>
            <TitleLine>
                <WeekTitle>Domingo</WeekTitle>
                <WeekTitle>Segunda</WeekTitle>
                <WeekTitle>Terça</WeekTitle>
                <WeekTitle>Quarta</WeekTitle>
                <WeekTitle>Quinta</WeekTitle>
                <WeekTitle>Sexta</WeekTitle>
                <WeekTitle>Sabado</WeekTitle>
            </TitleLine>
            <Weeks>
                {weeknumbers &&
                    weeknumbers.map(
                        weeknumber => <Week key={weeknumber} month={month} weekNumber={weeknumber} projects={projectsWorkDays} />
                    )
                }
            </Weeks>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleLine = styled.div`
    display: flex;
    /* justify-content: center;
    align-items: center; */

    margin-bottom: 0.5rem;
    border: 1px solid black;

    background-color: #FFFFFF;
`;

const WeekTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px dashed black;

    width: 6rem;
    height: 3.125rem;

    font-size: 1rem;
    font-weight: bold;
`;

const Weeks = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid black;
`;

export default Calendar;