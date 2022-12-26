import { IProject } from "../../enities/project";
import { ITaskWorkDays } from "../Calendar/Days";
import { Body, Cell, Container, Head, Row } from "./Layout";

export interface ITimeSheetTab {
    id:         string;
    dayText:    string;
    weekDay:    number;
    workday:    moment.Moment;
}

interface IOnDayClickProps {
    id?:        string;
    projectId?: string;
    workday:    moment.Moment;
}

interface IMonthTabProps {
    days:           ITimeSheetTab[];
    projects:       IProject[];
    tasksWorkDays:  ITaskWorkDays[];
    onDayClick:     (props: IOnDayClickProps) => void;
    preview:        boolean;
}

const projectLength = 12;
const clientPagLength = 6;

export const MonthTab = ({ days, projects, tasksWorkDays, onDayClick, preview }: IMonthTabProps) => {

    return (
        <Container>
            <Head>
                <Row>
                    <Cell size={projectLength}>Projeto</Cell>
                    <Cell size={clientPagLength}>Cliente Rec.</Cell>
                    {days &&
                        days.map(
                            day => <Cell key={day.dayText} size={1.2} align="center">{day.dayText}</Cell>
                        )
                    }
                    <Cell size={3}>Total</Cell>
                </Row>
            </Head>
            <Body>
                {
                    projects?.map(
                        project => {
                            const tasks = tasksWorkDays.filter(task => task.projectId === project.projectId);

                            let total = 0;

                            return(
                                <Row key={project.projectName}>
                                    <Cell size={projectLength}>{project.projectName.substring(0, 40)}</Cell>
                                    <Cell size={clientPagLength}>{project.projectName.split(" ")[0].substring(0, 10)}</Cell>
                                    {
                                        days?.map(
                                            day => {
                                                const task = tasks.filter(task => task.workday.format('DD') === day.id)[0];
                                                const workhours = task && ( !task.preview || preview ) ? task.workhours:0;

                                                let backgroundColor = day.weekDay === 0 || day.weekDay === 6 ? '#dedede':'#ffffff';

                                                backgroundColor = backgroundColor === '#ffffff' && workhours === 0? '#fffed5':backgroundColor;
                                                
                                                total += workhours;
                                                return (
                                                    <Cell
                                                        key={day.dayText}
                                                        size={1.2}
                                                        justify="center"
                                                        onClick={() => onDayClick({ id: task?.id, workday: day.workday, projectId: project.projectId })}
                                                        style={{ cursor: 'pointer', backgroundColor, color: (task?.preview ? 'red':'green') }}
                                                    >{workhours}
                                                    </Cell>
                                                )
                                            }
                                        )
                                    }
                                    <Cell
                                        size={3}
                                        justify="space-around"
                                        style={{ backgroundColor: '#dedede' }}
                                    >
                                        {total}
                                    </Cell>
                                </Row>
                            )
                        }
                    )
                }
            </Body>
        </Container>
    )
}