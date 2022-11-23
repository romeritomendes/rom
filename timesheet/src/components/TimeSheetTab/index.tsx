import moment from 'moment';
import { useState } from 'react';
import { useGlobalContextState } from '../../context';
import { IProject } from '../../enities/project';
import { useFilterTabArr } from '../../hooks/projects/useFilterProjects';
import { useProjects } from '../../hooks/projects/useProjects';
import { Field } from '../ProjectForm/Field';
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

    const typesOfFilters = [
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
        }
    ];
    
    const { FilterBar, filteredProjects } = useFilterTabArr<IProject>({ tabArr: projects, typesOfFilters });

    filteredProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));

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
            <FilterBar />

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