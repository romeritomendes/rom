import { IProjectData, IWorkdays } from "../../components/ProjectForm";
import { ITimeSheet } from "../../enities/timesheet";
import { useApi } from "../../hooks/api/useApi";
// import { projects } from './mockdata';

export interface IaddProjectWorkDays {
    projectId:  string;
    workdays?:  IWorkdays[];
}

// const projects: IProjectData[] = [];

const addTask = ({ projectId, workdays }: IaddProjectWorkDays) => {
    
    const { postAPI } = useApi<ITimeSheet[]>({ endpoint: 'timesheet' });

    //const color = Math.floor(Math.random()*16777215).toString(16);

    workdays?.forEach(
        work => {
            work.hours.forEach(
                row => postAPI(
                    {
                        projectId:      projectId,
                        description:    row.description,
                        workday:        row.date,
                        hours:          row.workhours,
                    }
                )
            )
        }
    );
}

// const addExistsProjectWorkDays = ({ projectId, workdays }: IaddProjectWorkDays): boolean => {
//     const projetExist = projects.filter(project => project.id === projectId)[0];

//     if(!projetExist)
//         return false;
    
//     workdays?.forEach(
//         workday => {
//             const workdayExist = projetExist.workdays?.filter(workdayExist => workdayExist.month === workday.month)[0];

//             if(!workdayExist){
//                 addTask({ projectId, workdays });
                
//                 return true;
//             }

//             workday.hours.forEach(
//                 hour => {
//                     const hourExist = workdayExist.hours.filter(hourExist => hourExist.workday === hour.workday)[0];

//                     if(!hourExist){
//                         workdayExist.hours.push(
//                             {
//                                 workday: hour.workday,
//                                 workhours: hour.workhours
//                             }
//                         )
                        
//                         return true;
//                     }

//                     hourExist.workhours = hourExist.workhours + hour.workhours;
//                 }
//             )
//         }
//     )

//     return true;
// }

export const addProjectWorkDays = ({ projectId, workdays }: IaddProjectWorkDays) => {

    // if(addExistsProjectWorkDays({ projectId, workdays }))
    //     return;

    addTask({ projectId, workdays });
}
