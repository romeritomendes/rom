import moment from 'moment';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import { IProject } from '../../enities/project';
// import { PROJECTS } from '../../data/projects';
import { useApi } from '../../hooks/api/useApi';

import { Field } from './Field';
import { FieldRange } from './FieldRange';
import { ISelectOptions } from './Select';

export interface IHoursInMonth {
    workday:        number;
    date:           Date;
    description:    string;
    workhours:      number;
}

export interface IWorkdays {
    month:  number;
    hours:  IHoursInMonth[];
}

export interface IProjectData {
    id:         string;
    // name:       string;
    color:      string;
    workdays?:  IWorkdays[];
}

const ProjectForm = () => {

    const {
        month,
        selectedDay,
        addProjectWorkDays,
    } = useGlobalContextState();

    const [projectId, setProjectId] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState<number>(8);
    const [dateFrom, setDateFrom] = useState(selectedDay);
    const [dateTo, setDateTo] = useState(selectedDay);

    // console.log(selectedDay === moment())
    // console.log(moment().format('YYYY-MM-DD'))
    console.log(selectedDay.format('YYYY-MM-DD'))

    useEffect(() => {
        setDateFrom(selectedDay);
        setDateTo(selectedDay);
    }, [selectedDay])

    const handleSave = () => {
        
        const newHours: IHoursInMonth[] = [];
        const days = dateTo.endOf('D').diff(dateFrom.endOf('D'), 'd');
        const baseDate = moment(dateFrom);
        for (let idx = 0; idx <= days; idx++) {

            if(baseDate.day() !== 0 && baseDate.day() !== 6) {
                newHours.push(
                    {
                        workday:        parseInt(baseDate.format('DD')),
                        date:           baseDate.toDate(),
                        description:    description,
                        workhours:      hours
                    }
                )
            }

            baseDate.add(1, 'd');
        }
        
        addProjectWorkDays(
            {
                projectId,
                workdays: [
                    {
                        month,
                        hours: newHours
                    }
                ]
            }
        );
    }

    const { data: projects, getAPI } = useApi<IProject[]>({ endpoint: 'project' });

    useEffect(() => {
        getAPI();
    }, []);
    
    const projectOptions: ISelectOptions[] = [];
    projects?.forEach(
        project => projectOptions.push(
            {
                label: project.name,
                value: project._id
            }
        )
    );

    return (
        <Container>
            <TitleLine>Adicionar Atividade</TitleLine>
            <InputLine>
                <Field
                    type="select"
                    options={projectOptions}
                    name="project"
                    label="Projeto"
                    width={20}
                    value={projectId}
                    onChange={value => setProjectId(value)}
                />
                <Field
                    type="number"
                    name="hours"
                    label="Tempo (H)"
                    width={7}
                    value={hours.toString()}
                    onChange={value => setHours(parseInt(value))}
                />
            </InputLine>
            <Field
                type="text"
                name="description"
                label="Descrição"
                value={description}
                onChange={value => setDescription(value)}
            />
            <FieldRange
                type="date"
                name="date"
                label="Data"
                width={14}
                lowValue={dateFrom.format('YYYY-MM-DD')}
                highValue={dateTo.format('YYYY-MM-DD')}
                onChange={({kind, value}) => kind === 'LOW' ? setDateFrom(moment(value)):setDateTo(moment(value))}
            />

            <Button onClick={handleSave}>Salvar</Button>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    gap: 0.5rem;

    padding: 0.5rem;

    border: 1px solid black;

    background-color: #FFFFFF;
`;

const TitleLine = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3.125rem;

    font-size: 2rem;
    font-weight: bold;
`;

const InputLine = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
`;

const Button = styled.button`
    border: 0.1px solid #000000;
    border-radius: 4px;

    width:  5rem;
    min-height: 2.563rem;

    background: #FCFCFC;

    box-sizing: border-box;

    font-weight: bold;

    cursor: pointer;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
        color: hsl(200, 100%, 50%);
    }
`;

export default ProjectForm;