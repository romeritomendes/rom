import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useGlobalContextState } from '../../context';
import { IProject } from '../../enities/project';
import { BASE_URL } from '../../hooks/api';
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
    const [projects, setProjects] = useState<IProject[]>([]);

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
    
    useEffect(() => {
        const uri = `${BASE_URL}project`;

        axios.get(uri)
        .then(res => {
            setProjects(
                () => res.data.rows.map(
                    (row: any) => (
                        {
                            projectId:      row._id,
                            name:           row.name,
                            color:          row.color,
                            rateValueHour:  row.rateValueHour
                        }
                    )
                )
            )
            
        });
    }, [])

    projects.sort((a, b) => a.name.localeCompare(b.name));

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

            <MonthTab
                    days={days}
                    projects={projects}
                    tasksWorkDays={tasksWorkDays}
                    onDayClick={handleClick}
                    preview={showPreview}
                />
            <SummaryTab
                projects={projects}
                tasksWorkDays={tasksWorkDays}
                preview={showPreview}
            />
        </>
    )
}