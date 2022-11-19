import { useState } from "react";
import { IProject } from "../../enities/project";
import { ITaskWorkDays } from "../Calendar/Days";
import { Field } from "../ProjectForm/Field";
import { Body, Cell, Container, Head, Row } from "./Layout";

export interface ITimeSheetTab {
    id:         string;
    dayText:    string;
    weekDay:    number;
    workday:    moment.Moment;
}

// export interface IProjectTab {
//     projectId:  string;
//     name:       string;
//     color:      string;
// }

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
const actionLength = 3;

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
                            const tasks = tasksWorkDays.filter(task => task.name === project.name);

                            let total = 0;

                            return(
                                <Row key={project.name}>
                                    <Cell size={projectLength}>{project.name.substring(0, 40)}</Cell>
                                    <Cell size={clientPagLength}>{project.name.split(" ")[0].substring(0, 10)}</Cell>
                                    {
                                        days?.map(
                                            day => {
                                                const task = tasks.filter(task => task.workday.format('DD') === day.id)[0];
                                                const workhours = task && ( !task.preview || preview ) ? task.workhours:0;

                                                const bgHoliday = day.weekDay === 0 || day.weekDay === 6 ? '#dedede':'';
                                                
                                                total += workhours;
                                                return (
                                                    <Cell
                                                        key={day.dayText}
                                                        size={1.2}
                                                        align="center"
                                                        onClick={() => onDayClick({ id: task?.id, workday: day.workday, projectId: project.projectId })}
                                                        style={{ cursor: 'pointer', backgroundColor: bgHoliday, color: (task?.preview ? 'red':'green') }}
                                                    >{workhours}
                                                    </Cell>
                                                )
                                            }
                                        )
                                    }
                                    <Cell
                                        size={3}
                                        align="space-around"
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