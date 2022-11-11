import React, { useEffect } from 'react';
import moment from 'moment';
import { createContext, useState, useContext, PropsWithChildren } from 'react';
import { IProjectWorkDays } from '../components/Calendar/Days';
import { addProjectWorkDays, getProjectWorkDays } from '../utils/projectApi';
import { IaddProjectWorkDays } from '../utils/projectApi/addProjectWorkDays';

interface IProvider {

}

interface IGlobalContext {
    year:               number;
    setYear:            (year: string) => void;
    month:              number;
    setMonth:           (month: string) => void;
    selectedDay:        moment.Moment;
    setDay:             (day: number) => void,
    projectsWorkDays:   IProjectWorkDays[];
    back:               () => void;
    forward:            () => void;
    addProjectWorkDays: (props: IaddProjectWorkDays) => void;
}

const Context = createContext<IGlobalContext>({
    year:               0,
    setYear:            () => {},
    month:              0,
    setMonth:           () => {},
    selectedDay:        moment(),
    setDay:             () => {},
    projectsWorkDays:   [],
    back:               () => {},
    forward:            () => {},
    addProjectWorkDays: () => {},
});

const DEFAULT_YEAR = Number.parseInt(moment().format('YYYY'));
const DEFAULT_MONTH = Number.parseInt(moment().format('MM'));

export const Provider = ({ children }: PropsWithChildren<IProvider>) => {

    const [year, setYear] = useState<number>(DEFAULT_YEAR);
    const [month, setMonth] = useState<number>(DEFAULT_MONTH);
    const [projects, setProjects] = useState<IProjectWorkDays[]>([]);
    const [day, setDay] = useState<number>(parseInt(moment().format('DD')));

    useEffect(() => {
        setProjects(getProjectWorkDays({ year, month }));
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

    return (
        <Context.Provider value={{
            year,
            setYear:            year => setYear(Number.parseInt(year)),
            month,
            setMonth:           month => setMonth(Number.parseInt(month)),
            selectedDay:        moment(`${year}-${month}-${day}`),
            setDay:             setDay,
            projectsWorkDays:   projects,
            back:               handleBackMonth,
            forward:            handleForwardMonth,
            addProjectWorkDays: props => {
                addProjectWorkDays(props);
                setProjects(getProjectWorkDays({ year, month }));
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalContextState = () => {
    return useContext(Context);
}