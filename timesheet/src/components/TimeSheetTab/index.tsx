import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useGlobalContextState } from '../../context';
import { IProject } from '../../enities/project';
import { useProjects } from '../../hooks/api/useProjects';
import { Field } from '../ProjectForm/Field';
import { ISelectOptions } from '../ProjectForm/Select';
import { MonthTab, ITimeSheetTab } from './MonthTab';
import { SummaryTab } from './SummaryTab';



interface ITimeSheetTabProps {

}

interface IhandleClick {
    id?:        string;
    projectId?: string;
    workday:    moment.Moment;
}

export const TimeSheetTab = (props: ITimeSheetTabProps) => {

    const {
        year,
        month,
        type,
        weekNumber,
        tasksWorkDays,
        setSelectedTaskId,
        newTask
    } = useGlobalContextState();

    const [showPreview, setShowPreview] = useState(false);
    // const [projects, setProjects] = useState<IProject[]>([]);
    const [filterType, setFilterType] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filterOptions, setFilterOptions] = useState<ISelectOptions[]>([]);

    const { projects } = useProjects();

    const mday = type === 'TS' ? moment().day("Sunday").week(weekNumber) : moment(`${year}-${month}-01`);
    const lastDay = type === 'TS' ? moment().day("Saturday").week(weekNumber) : moment(mday).endOf("month");

    const days: ITimeSheetTab[] = [];
    const qntdDays = lastDay.diff(mday, "d");
    for (let idx = 0; idx <= qntdDays; idx++) {

        days.push({
            id:         mday.format('DD'),
            dayText:    mday.format('DD'),
            weekDay:    mday.weekday(),
            workday:    moment(mday),
        })

        mday.add(1, 'd');
    }

    // useEffect(() => {
    //     setFilterOptions(
    //         option => {
    //             switch (filterType) {
    //                 case value:
                        
    //                     break;
                
    //                 default:
    //                     break;
    //             }
    //         }
    //     )
    // }, [filterType]);
    

    const projectOptions: ISelectOptions[] = projects?.map(
        project => (
            {
                label: project.name,
                value: project.projectId
            }
        )
    );

    const filteredProjects: IProject[] = projects.filter(
        project => !filterType || !filterValue || project[filterType] === filterValue
    );
    filteredProjects.sort((a, b) => a.name.localeCompare(b.name));

    const handleClick = ({ id, workday, projectId }: IhandleClick) => {
        if(id)
            setSelectedTaskId(id);
        else
            newTask({ workday, projectId });
    }

    return (
        <>
        
            <Field
                name="preview"
                type="checkbox"
                value={showPreview ? 'X':''}
                onChange={v => setShowPreview(v === 'X')}
            />

            <Field
                type="select"
                options={[
                    {
                        label:  'Sem filtro',
                        value:  ''
                    },
                    {
                        label:  'Projeto',
                        value:  'projectId'
                    },
                    {
                        label:  'Cliente Rec.',
                        value:  'receptorId'
                    },
                    {
                        label:  'Cliente Pag.',
                        value:  'payerId'
                    },
                    {
                        label:  'Preview',
                        value:  'preview'
                    }
                ]}
                name="filterType"
                width={20}
                value={filterType}
                onChange={value => setFilterType(value)}
            />

            <Field
                type="select"
                options={projectOptions}
                name="filterValue"
                width={20}
                value={filterValue}
                onChange={value => setFilterValue(value)}
            />

            <MonthTab
                    days={days}
                    projects={filteredProjects}
                    tasksWorkDays={tasksWorkDays}
                    onDayClick={handleClick}
                    preview={showPreview}
                />
            <SummaryTab
                projects={filteredProjects}
                tasksWorkDays={tasksWorkDays}
                preview={showPreview}
            />
        </>
    )
}