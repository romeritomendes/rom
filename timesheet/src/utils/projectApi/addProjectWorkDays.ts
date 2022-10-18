// import { projects } from "./mockdata";

import { v4 as uuid } from 'uuid';
import { IWorkdays } from "../../components/ProjectForm";
import { projects } from './mockdata';

export interface IaddProjectWorkDays {
    name:       string;
    workdays?:  IWorkdays[];
}

const addProject = ({ name, workdays }) => {
    projects.push({
        id:         uuid(),
        name:       name,
        color:      'green',
        workdays:   workdays
    });
}

const addExistsProjectWorkDays = ({ name, workdays }: IaddProjectWorkDays): boolean => {
    const projetExist = projects.filter(project => project.name === name)[0];

    if(!projetExist)
        return false;
    
    workdays?.forEach(
        workday => {
            const workdayExist = projetExist.workdays?.filter(workdayExist => workdayExist.month === workday.month)[0];

            if(!workdayExist){
                addProject({ name, workdays });
                
                return true;
            }

            workday.hours.forEach(
                hour => {
                    const hourExist = workdayExist.hours.filter(hourExist => hourExist.workday === hour.workday)[0];

                    if(!hourExist){
                        workdayExist.hours.push(
                            {
                                workday: hour.workday,
                                workhours: hour.workhours
                            }
                        )
                        
                        return true;
                    }

                    hourExist.workhours = hourExist.workhours + hour.workhours;
                }
            )
        }
    )

    return true;
}

export const addProjectWorkDays = ({ name, workdays }: IaddProjectWorkDays) => {

    if(addExistsProjectWorkDays({ name, workdays }))
        return;

    addProject({ name, workdays });
}
