import moment from 'moment';
import { useGlobalContextState } from '../../context';
import { getWeeksOfMonth } from '../../utils';
import { IDays } from '../Calendar/Days';
import { Body, Cell, Container, Head, Row } from './Layout';

interface ITimeSheetTab {
    id:         string;
    dayText:    string;
}

interface ITimeSheetTabProps {
    handleDel:  (id: string) => void;
    handleEdit: (id: string) => void;
}

export const TimeSheetTab = ({ handleDel, handleEdit }: ITimeSheetTabProps) => {

    const projectLength = 12;
    const clientPagLength = 6;
    const actionLength = 7;

    const {
        year,
        month,
        tasksWorkDays
    } = useGlobalContextState();

    const mday = moment(`${year}-${month}-01`);
    const lastDay = moment(mday).endOf("month");

    const days: ITimeSheetTab[] = [];
    for (let idx = 1; idx <= parseInt(lastDay.format('DD')); idx++) {

        // const lday = parseInt(mday.format('DD'));
        // const lmonth = parseInt(mday.format("MM"));

        days.push({
            id:         mday.format('DD'),
            dayText:    mday.format('DD'),
            // month:      lmonth,
            // week:       mday.week,
            // weekDay:    mday.weekday(),
            // tasks:      [],
        })

        mday.add(1, 'd');

    }

    const projects = [...new Map(tasksWorkDays.map(m => [m.name, m])).values()]

    return (
        <Container>
            <Head>
                <Cell size={projectLength}>Projeto</Cell>
                <Cell size={clientPagLength}>Cliente Rec.</Cell>
                {days &&
                    days.map(
                        day => <Cell key={day.dayText} size={1} align="center">{day.dayText}</Cell>
                    )
                }
                <Cell size={3}>Total</Cell>
            </Head>
            <Body>
                {
                    projects?.map(
                        project => {
                            const tasks = tasksWorkDays.filter(task => task.name === project.name);

                            let total = 0;

                            return(
                                <Row key={project.name}>
                                    <Cell size={projectLength}>{project.name.substring(0, 30)}</Cell>
                                    <Cell size={clientPagLength}>{project.name.split(" ")[0].substring(0, 10)}</Cell>
                                    {
                                        days?.map(
                                            day => {
                                                const task = tasks.filter(task => task.workday.format('DD') === day.id)[0];
                                                
                                                total += task ? task.workhours:0;
                                                return (
                                                    <Cell
                                                        key={day.dayText}
                                                        size={1}
                                                        align="center"    
                                                    >{task ? task.workhours:'0'}
                                                    </Cell>
                                                )
                                            }
                                        )
                                    }
                                    <Cell size={3} align="space-around">{total}</Cell>
                                </Row>
                            )
                        }
                    )
                }
            </Body>
        </Container>
    )
}