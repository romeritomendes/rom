import axios from "axios";
import { BASE_URL } from "../../hooks/api";

export interface IHoursInMonth {
    id:             string | undefined;
    workday:        number;
    date:           Date;
    description:    string;
    workhours:      number;
    preview:        boolean;
}

export interface IWorkdays {
    month:  number;
    hours:  IHoursInMonth[];
}

export interface IaddTaskWorkDays {
    projectId:  string;
    workdays:  IWorkdays[];
}

const addTask = async ({ projectId, workdays }: IaddTaskWorkDays) => {

    // const color = Math.floor(Math.random()*16777215).toString(16);

    let uri = `${BASE_URL}timesheet`;

    try {
        
        for (const work of workdays) {
            for (const row of work.hours) {
                if(row.id) {
                    uri = `${uri}/${row.id}`;

                    await axios.put(uri,
                        {
                            projectId:      projectId,
                            description:    row.description,
                            workday:        row.date,
                            hours:          row.workhours,
                            preview:        row.preview,
                        }
                    )
                } else {
                    await axios.post(uri,
                        {
                            projectId:      projectId,
                            description:    row.description,
                            workday:        row.date,
                            hours:          row.workhours,
                            preview:        row.preview,
                        }
                    )
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

// const addExistsTaskWorkDays = ({ projectId, workdays }: IaddTaskWorkDays): boolean => {
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

export const addTaskWorkDays = ({ projectId, workdays }: IaddTaskWorkDays) => new Promise<void>((resolve, reject) => {

        // if(addExistsTaskWorkDays({ projectId, workdays }))
        //     return;
    
    addTask({ projectId, workdays })
        .catch(err => console.log(err))
        .finally(() => resolve());
})



export const handleDel = (id: string) => new Promise<void>((resolve, reject) => {
    const uri = `${BASE_URL}timesheet/${id}`;
    axios.delete(uri)
        .then(() => {
            alert("Apontamento eliminado!");
        })
        .catch(err => {
            console.log(err);
            alert("Erro ao eliminar apontamneto!");
        })
        .finally(() => resolve());
});