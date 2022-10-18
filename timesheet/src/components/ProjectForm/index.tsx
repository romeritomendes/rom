import moment from 'moment';
import React, { useState } from 'react'
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';

import { months } from '../../data/months';

export interface IHoursInMonth {
    workday:    number;
    workhours:  number;
}

export interface IWorkdays {
    month:  number;
    hours:  IHoursInMonth[];
}

export interface IProjectData {
    id:         string;
    name:       string;
    color:      string;
    workdays?:  IWorkdays[];
}

const ProjectForm = () => {

    const {
        month,
        setMonth,
        addProjectWorkDays,
    } = useGlobalContextState();

    const [project, setProject] = useState("");
    const [hours, setHours] = useState<number>(8);
    const [dateFrom, setDateFrom] = useState(moment());
    const [dateTo, setDateTo] = useState(moment());

    const handleSave = () => {
        
        const newHours: IHoursInMonth[] = [];
        const days = dateTo.endOf('D').diff(dateFrom.endOf('D'), 'd');
        const baseDate = moment(dateFrom);
        for (let idx = 0; idx <= days; idx++) {

            if(baseDate.day() !== 0 && baseDate.day() !== 6) {
                newHours.push(
                    {
                        workday:    parseInt(baseDate.format('DD')),
                        workhours:  hours
                    }
                )
            }

            baseDate.add(1, 'd');
        }
        
        addProjectWorkDays(
            {
                name: project,
                workdays: [
                    {
                        month,
                        hours: newHours
                    }
                ]
            }
        );
    }

    return (
        <Container>
            <div>
                <label htmlFor="month">Mês</label>
                <select name="month" defaultValue={month} onChange={e => setMonth(e.target.value)}>
                    {months &&
                        months.map(
                            row => <option key={row.id} value={row.id}>{row.title}</option>
                        )
                    }
                </select>
            </div>
            <div>
                <label htmlFor="project">Projeto</label>
                <input type="text" name="project" value={project} onChange={e => setProject(e.target.value)} />
            </div>
            <div>
                <label htmlFor="dataFrom">Data</label>
                <input type="date" name="dataFrom" value={dateFrom.format('YYYY-MM-DD')} onChange={e => setDateFrom(moment(e.target.value))} />
                <input type="date" name="dataTo" value={dateTo.format('YYYY-MM-DD')} onChange={e => setDateTo(moment(e.target.value))} />
            </div>
            <div>
                <label htmlFor="hours">Tempo</label>
                <input type="number" name="hours" value={hours} onChange={e => setHours(parseInt(e.target.value))} />
            </div>

            <button onClick={handleSave}>Salvar</button>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5rem;

    border: 1px solid black;
`;

export default ProjectForm;
