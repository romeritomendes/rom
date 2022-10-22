import moment from 'moment';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';

import { months } from '../../data/months';
import { Field } from './Field';
import { FieldRange } from './FieldRange';

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
        selectedDay,
        addProjectWorkDays,
    } = useGlobalContextState();

    const [project, setProject] = useState("");
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
            <TitleLine>Adicionar Atividade</TitleLine>
            <InputLine>
                <Field
                    type="text"
                    name="project"
                    label="Projeto"
                    width={10}
                    value={project}
                    onChange={value => setProject(value)}
                />
                <Field
                    type="number"
                    name="hours"
                    label="Tempo"
                    width={5}
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

    padding: 0 0.5rem;

    border: 1px solid black;

    background-color: #FFFFFF;
`;
const TitleLine = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 0.5rem;

    width: 100%;
    height: 3.125rem;

    font-size: 1rem;
    font-weight: bold;
`;

const InputLine = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    width: 100%;
`;

const Button = styled.button`
    border: 0.1px solid #000000;
    border-radius: 4px;

    width:  5rem;
    height: 1.375rem;

    background: #FCFCFC;

    box-sizing: border-box;

    font-weight: bold;

    cursor: pointer;
`;

export default ProjectForm;