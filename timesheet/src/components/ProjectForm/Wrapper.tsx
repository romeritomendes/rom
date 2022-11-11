import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IProject } from '../../enities/project';
import { BASE_URL } from '../../hooks/api';
import { useApi } from '../../hooks/api/useApi';
import { IHoursInMonth } from '../../utils/projectApi/addTaskWorkDays';
import { ITaskWorkDays } from '../Calendar/Days';
import { Field } from './Field';
import { FieldRange } from './FieldRange';
import { ISelectOptions } from './Select';

export interface onSave {
    projectId:  string;
    newHours:   IHoursInMonth[];
}

interface IWrapperProps {
    task:               ITaskWorkDays;
    selectedDay:        moment.Moment;
    closeDialog:        () => void;
    onSave:             (props: onSave) => void;
}

export const Wrapper = ({ task, selectedDay, closeDialog, onSave }: IWrapperProps) => {
    

    const [projectId, setProjectId] = useState(task.projectId);
    const [description, setDescription] = useState(task.description);
    const [hours, setHours] = useState<number>(task.workhours);
    const [dateFrom, setDateFrom] = useState(selectedDay);
    const [dateTo, setDateTo] = useState(selectedDay);

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

    const handleSave = () => {
        
        const newHours: IHoursInMonth[] = [];
        const days = dateTo.endOf('D').diff(dateFrom.endOf('D'), 'd');
        const baseDate = moment(dateFrom);
        for (let idx = 0; idx <= days; idx++) {

            if(baseDate.day() !== 0 && baseDate.day() !== 6) {
                newHours.push(
                    {
                        id:             task.id,
                        workday:        parseInt(baseDate.format('DD')),
                        date:           baseDate.toDate(),
                        description:    description,
                        workhours:      hours
                    }
                )
            }

            baseDate.add(1, 'd');
        }

        onSave({ projectId, newHours });
    }

    const handleDel = () => {
        const uri = `${BASE_URL}timesheet/${task.id}`;
        axios.delete(uri)
            .then(() => {
                alert("Apontamento eliminado!");
                closeDialog();
            })
            .catch(err => {
                console.log(err);
                alert("Erro ao eliminar apontamneto!");
            });
    }

    return (
        <Container>
            <TitleLine>Adicionar Atividade</TitleLine>
            <InputLine>
                <Field
                    type="select"
                    options={projectOptions}
                    name="projectId"
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
                disabled={task.id?true:false}
                onChange={({kind, value}) => kind === 'LOW' ? setDateTo(moment(value)):setDateFrom(moment(value))}
            />

            <div>
                <Button onClick={closeDialog}>Cancelar</Button>
                {
                    task.id && <Button onClick={handleDel}>Apagar</Button>
                }
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 300px;
    
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