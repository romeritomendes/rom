import React from 'react';
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import Week from './Week';

import { months } from '../../data/months';
import { getWeeksOfMonth } from '../../utils';
import { MonthTitle } from './MonthTitle';

export interface ICalendar {

}

const Calendar = ({  }: ICalendar) => {

    const {
        year,
        month,
        back,
        forward,
        projectsWorkDays
    } = useGlobalContextState();

    const weeknumbers: number[] = getWeeksOfMonth({ year, month });

    return (
        <Container>
            <MonthTitle
                title={`${months[month-1].title} - ${year}`}
                back={back}
                forward={forward}
            />
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

const Weeks = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid black;
`;

export default Calendar;