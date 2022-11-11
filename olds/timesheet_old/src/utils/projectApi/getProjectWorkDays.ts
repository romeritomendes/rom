import moment from "moment";
import { IProjectWorkDays } from "../../components/Calendar/Days";
import { IProjectData } from "../../components/ProjectForm";
import { ITimeSheet } from "../../enities/timesheet";
import { useApi } from "../../hooks/api/useApi";
// import { projects } from "./mockdata";

export const projects: IProjectData[] = [];

export const getProjectWorkDays = ({ year, month }): IProjectWorkDays[] => {

    const uri = `timesheet/month/${year}/${month}`;
    const { data: projectWorkDays, getAPI } = useApi<ITimeSheet[]>({ endpoint: uri });

    getAPI();

    const projectsWorkDays: IProjectWorkDays[] = [];
    // projectWorkDays?.forEach(
    //     project => {
    //         projectsWorkDays.push(
    //             {
    //                 id:         project._id,
    //                 color:      project.color ? project.color : Math.floor(Math.random()*16777215).toString(16),
    //                 workday:    parseInt(moment(project.workday).format('DD')),
    //                 workhours:  project.hours
    //             }
    //         )
    //     }
    // )

    return projectsWorkDays;
}
