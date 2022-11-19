import moment from 'moment';
import styled from 'styled-components';
import Days, { ITaskWorkDays } from './Days';
import { useGlobalContextState } from '../../context';

export interface IWeek {
    month:      number;
    weekNumber: number;
    tasks:      ITaskWorkDays[];
}

interface Idays {
    id:         string;
    mday:       moment.Moment,
    dayText:    string;
    day:        number;
    month:      number;
    week:       number;
    weekDay:    number;
    tasks:      ITaskWorkDays[];
}

const Week = ({ weekNumber, month, tasks }: IWeek) => {

    const {
        newTask,
        setSelectedTaskId,
    } = useGlobalContextState();

    const mday = moment().day("Sunday").week(weekNumber);

    const days: Idays[] = [];
    for (let idx = 1; idx <= 7; idx++) {

        const lday = parseInt(mday.format('DD'));
        const lmonth = parseInt(mday.format("MM"));

        days.push({
            id:         `${weekNumber}_${mday.format('DD')}`,
            mday:       moment(mday),
            dayText:    mday.format('DD'),
            day:        lday,
            month:      lmonth,
            week:       weekNumber,
            weekDay:    mday.weekday(),
            tasks:      lmonth === month ? tasks.filter(task => parseInt(task.workday.format('DD')) === lday):[],
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
                            tasks={day.tasks}

                            onDayClick={() => newTask({ workday: day.mday })}
                            onTaskClick={setSelectedTaskId}
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