import { IProjectWorkDays } from "../../components/Calendar/Days";
import { projects } from "./mockdata";

export const getProjectWorkDays = ({ month }): IProjectWorkDays[] => {
    const projectsMonth = projects.filter(project => project.workdays?.filter(work => work.month === month));

    const projectsWorkDays: IProjectWorkDays[] = [];
    projectsMonth.forEach(
        project => {
            const WorkMonth = project.workdays?.filter(work => work.month === month)[0];
            
            WorkMonth?.hours.forEach(
                row =>
                    projectsWorkDays.push(
                        {
                            id:         project.id,
                            name:       project.name,
                            color:      project.color,
                            workday:    row.workday,
                            workhours:  row.workhours
                        }
                    )
            )
        }
    )

    return projectsWorkDays;
}
