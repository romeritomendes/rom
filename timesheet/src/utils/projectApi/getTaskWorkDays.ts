import axios from "axios";
import moment from "moment";
import { ITaskWorkDays } from "../../components/Calendar/Days";
import { BASE_URL } from "../../hooks/api";

interface IgetTaskWorkDays {
    year:   number;
    month:  number;
}

export const getTaskWorkDays = async ({ year, month }: IgetTaskWorkDays) => new Promise<ITaskWorkDays[]>((resolve, reject) => {
    const uri = `${BASE_URL}timesheet/month/${year}/${month}`;
    
    axios.get(uri)
    .then(res => {
        const projectsWorkDays: ITaskWorkDays[] = res.data.rows.map(
            (row: any) => (
                {
                    id:             row._id,
                    description:    row.description,
                    projectId:      row.project?._id,
                    name:           row.project?.shortname,
                    color:          row.project?.color ? `#${row.project?.color}` : `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    workday:        moment(row.workday),
                    workhours:      row.hours
                }
            )
        );

        return resolve(projectsWorkDays);
    })
    .catch(err => {
        console.log(err);

        return reject([]);
    });
})

// export const getProjectWorkDays = async ({ year, month }): Promise<ITaskWorkDays[]> => {

//     const uri = `${BASE_URL}timesheet/month/${year}/${month}`;

//     const projectsWorkDays: ITaskWorkDays[] = [];
//     try {
//         const res = await axios.get(uri);

//         if (res.status === 200) {
//             res.data.rows.forEach(
//                 row => {
//                     projectsWorkDays.push(
//                         {
//                             id:         row._id,
//                             color:      row.project?.color ? `#${row.project?.color}` : `#${Math.floor(Math.random()*16777215).toString(16)}`,
//                             workday:    parseInt(moment(row.workday).format('DD')),
//                             workhours:  row.hours
//                         }
//                     )
//                 }
//             );

//             return projectsWorkDays;
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// }
