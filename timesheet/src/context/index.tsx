import { useEffect } from 'react';
import moment from 'moment';
import { createContext, useState, useContext, PropsWithChildren } from 'react';
import { ITaskWorkDays } from '../components/Calendar/Days';
import { addTaskWorkDays, getTaskWorkDays } from '../utils/projectApi';
import { IaddTaskWorkDays } from '../utils/projectApi/addTaskWorkDays';

interface IProvider {

}

const NEW_TASK: ITaskWorkDays = {
    id:             undefined,
    description:    '',
    projectId:      '',
    name:           '',
    color:          '',
    workday:        moment(),
    workhours:      8,
}

interface IGlobalContext {
    year:               number;
    setYear:            (year: string) => void;
    month:              number;
    setMonth:           (month: string) => void;
    newTask:            (day: moment.Moment) => void;
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
}

const Context = createContext<IGlobalContext>({
    year:               0,
    setYear:            () => {},
    month:              0,
    setMonth:           () => {},
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
});

const DEFAULT_YEAR = Number.parseInt(moment().format('YYYY'));
const DEFAULT_MONTH = Number.parseInt(moment().format('MM'));

export const Provider = ({ children }: PropsWithChildren<IProvider>) => {

    const [year, setYear] = useState<number>(DEFAULT_YEAR);
    const [month, setMonth] = useState<number>(DEFAULT_MONTH);
    const [tasks, setTasks] = useState<ITaskWorkDays[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
    const [dialogShow, setDialogShow] = useState(false);

    useEffect(() => {
        getTaskWorkDays({ year, month }).then(
            (resTasks: ITaskWorkDays[])=> setTasks(resTasks)
        )
    }, [year, month]);

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

    const handleSelectedTaskId = (id: string | undefined) => {
        
        setSelectedTaskId(id);

        if(id)
            setDialogShow(true);
    }

    let taskEdit = tasks.filter(task => task.id === selectedTaskId)[0];

    const handleNewTask = (mday: moment.Moment) => {
        setSelectedTaskId(undefined);
        // taskEdit = NEW_TASK;
        NEW_TASK.workday = moment(mday);
        setDialogShow(true);
    }

    return (
        <Context.Provider value={{
            year,
            setYear:            year => setYear(Number.parseInt(year)),
            month,
            setMonth:           month => setMonth(Number.parseInt(month)),
            newTask:            handleNewTask,
            selectedTask:       selectedTaskId ? taskEdit : NEW_TASK,
            setSelectedTaskId:  handleSelectedTaskId,
            tasksWorkDays:      tasks,
            back:               handleBackMonth,
            forward:            handleForwardMonth,
            addTaskWorkDays: props => {
                addTaskWorkDays(props)
                .finally(() => {
                    getTaskWorkDays({ year, month }).then(
                        (resTasks: ITaskWorkDays[]) => setTasks(resTasks)
                    );
                    setDialogShow(false);
                });
                
            },
            dialogShow,
            openDialog:         () => setDialogShow(true),
            closeDialog:        () => setDialogShow(false),
        }}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalContextState = () => {
    return useContext(Context);
}