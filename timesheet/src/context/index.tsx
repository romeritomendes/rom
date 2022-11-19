import { useEffect } from 'react';
import moment from 'moment';
import { createContext, useState, useContext, PropsWithChildren } from 'react';
import { ITaskWorkDays } from '../components/Calendar/Days';
import { addTaskWorkDays, getTaskWorkDays } from '../utils/projectApi';
import { handleDel, IaddTaskWorkDays } from '../utils/projectApi/addTaskWorkDays';

interface IProvider {

}

const NEW_TASK: ITaskWorkDays = {
    id:             undefined,
    description:    '',
    projectId:      '',
    name:           '',
    color:          '',
    rateValueHour:  0,
    workday:        moment(),
    workhours:      8,
    preview:        false,
}

interface IhandleNewTask {
    projectId?: string;
    workday:    moment.Moment;
}

interface IGlobalContext {
    year:               number;
    // setYear:            (year: string) => void;
    type:               string;
    setType:            (type: string) => void;
    month:              number;
    // setMonth:           (month: string) => void;
    weekNumber:         number;
    newTask:            (props: IhandleNewTask) => void;
    // selectedTaskId:     string | undefined;
    selectedTask:       ITaskWorkDays;
    setSelectedTaskId:  (id: string | undefined) => void;
    tasksWorkDays:      ITaskWorkDays[];
    back:               () => void;
    forward:            () => void;
    addTaskWorkDays:    (props: IaddTaskWorkDays) => void;
    dialogShow:         boolean;
    openDialog:         () => void;
    closeDialog:        () => void;
    onDelTask:          (id: string) => void;
}

const Context = createContext<IGlobalContext>({
    year:               0,
    // setYear:            () => {},
    type:               'TM',
    month:              0,
    setType:            () => {},
    // setMonth:           () => {},
    weekNumber:         0,
    newTask:            () => {},
    selectedTask:       NEW_TASK,
    setSelectedTaskId:  () => {},
    tasksWorkDays:      [],
    back:               () => {},
    forward:            () => {},
    addTaskWorkDays:    () => {},
    dialogShow:         false,
    openDialog:         () => {},
    closeDialog:        () => {},
    onDelTask:          () => {},
});

const DEFAULT_YEAR = Number.parseInt(moment().format('YYYY'));
const DEFAULT_MONTH = Number.parseInt(moment().format('MM'));
const DEFAULT_WEEK = moment().isoWeek();

export const Provider = ({ children }: PropsWithChildren<IProvider>) => {

    const [year, setYear] = useState<number>(DEFAULT_YEAR);
    const [month, setMonth] = useState<number>(DEFAULT_MONTH);
    const [weekNumber, setWeek] = useState<number>(DEFAULT_WEEK);
    const [tasks, setTasks] = useState<ITaskWorkDays[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
    const [dialogShow, setDialogShow] = useState(false);

    const [type, setType] = useState('TM');

    useEffect(() => {

        if(type === 'TS')
            return;

        getTaskWorkDays({ year, month }).then(
            (resTasks: ITaskWorkDays[])=> setTasks(resTasks)
        )
    }, [year, month, type]);

    useEffect(() => {

        if(type !== 'TS')
            return;

        const mday = moment().day("Sunday").week(weekNumber);
        const newMonth = parseInt(mday.format("MM"));

        getTaskWorkDays({ year, weekNumber }).then(
            (resTasks: ITaskWorkDays[])=> setTasks(resTasks)
        )

        if(newMonth !== month)
            setMonth(newMonth);
    }, [year, weekNumber, type]);

    const LAST_WEEK_YEAR = moment(`${("0000"+year).slice(-4)}-12-31`).isoWeek();

    const handleBackMonth = () => {
        setMonth(month =>
            month === 1
                ? 12
                : month - 1
        );
    }

    const handleForwardMonth = () => {
        setMonth(month =>
            month === 12
                ? 1
                : month + 1
        );
    }

    const handleBackWeek = () => {
        setWeek(week =>
            week === 1
                ? LAST_WEEK_YEAR
                : week - 1
        );
    }

    const handleForwardWeek = () => {
        setWeek(week =>
            week === LAST_WEEK_YEAR
                ? 1
                : week + 1
        );
    }

    const handleSelectedTaskId = (id: string | undefined) => {
        
        setSelectedTaskId(id);

        if(id)
            setDialogShow(true);
    }

    let taskEdit = tasks.filter(task => task.id === selectedTaskId)[0];

    const handleNewTask = ({ workday, projectId }: IhandleNewTask) => {
        setSelectedTaskId(undefined);
        NEW_TASK.projectId = projectId ? projectId:'';
        NEW_TASK.workday = moment(workday);
        setDialogShow(true);
    }

    return (
        <Context.Provider value={{
            year,
            // setYear:            year => setYear(Number.parseInt(year)),
            type,
            setType,
            month,
            // setMonth:           month => setMonth(Number.parseInt(month)),
            weekNumber,
            newTask:            handleNewTask,
            selectedTask:       selectedTaskId ? taskEdit : NEW_TASK,
            setSelectedTaskId:  handleSelectedTaskId,
            tasksWorkDays:      tasks,
            back:               () => type === 'TS' ? handleBackWeek() : handleBackMonth(),
            forward:            () => type === 'TS' ? handleForwardWeek() : handleForwardMonth(),
            addTaskWorkDays: props => {
                addTaskWorkDays(props)
                .finally(() => {
                    getTaskWorkDays({ year, month, weekNumber: (type === 'TS' ? weekNumber:undefined) }).then(
                        (resTasks: ITaskWorkDays[]) => setTasks(resTasks)
                    );
                    setDialogShow(false);
                });
                
            },
            dialogShow,
            openDialog:         () => setDialogShow(true),
            closeDialog:        () => setDialogShow(false),
            onDelTask:          id => {
                handleDel(id)
                .then(() => {
                    getTaskWorkDays({ year, month, weekNumber: (type === 'TS' ? weekNumber:undefined) }).then(
                        (resTasks: ITaskWorkDays[]) => setTasks(resTasks)
                    );
                    setDialogShow(false);
                })
            },
        }}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalContextState = () => {
    return useContext(Context);
}