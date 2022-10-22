import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Days, { IProjectWorkDays } from './Days';
import { useGlobalContextState } from '../../context';

export interface IWeek {
    month:      number;
    weekNumber: number;
    projects:   IProjectWorkDays[];
}

interface Idays {
    id:         string;
    dayText:    string;
    day:        number;
    month:      number;
    week:       number;
    weekDay:    number;
    projects:   IProjectWorkDays[];
}

const Week = ({ weekNumber, month, projects }: IWeek) => {

    const {
        setDay,
    } = useGlobalContextState();

    const mday = moment().day("Sunday").week(weekNumber);

    const days: Idays[] = [];
    for (let idx = 1; idx <= 7; idx++) {

        const lday = parseInt(mday.format('DD'));
        const lmonth = parseInt(mday.format("MM"));

        days.push({
            id:         `${weekNumber}_${mday.format('DD')}`,
            dayText:    mday.format('DD'),
            day:        lday,
            month:      lmonth,
            week:       weekNumber,
            weekDay:    mday.weekday(),
            projects:   lmonth === month ? projects.filter(project => project.workday === lday):[],
        })

        mday.add(1, 'd');

    }

    return (
        <Container>
            {days &&
                days.map(
                    day =>
                        <Days
                            key={day.id}
                            dayText={day.dayText}
                            size={6}
                            disable={day.month !== month}
                            holiday={day.weekDay === 0 || day.weekDay === 6}
                            projects={day.projects}
                            onClick={() => setDay(day.day)}
                        />
                )
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`;

export default Week;