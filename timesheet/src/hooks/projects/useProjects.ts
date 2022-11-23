import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api";
import { IProject } from "../../enities/project";

interface IuseProjects {

}

export const useProjects = (props?: IuseProjects) => {
    const [projects, setProjects] = useState<IProject[]>([]);

    const fetchProjects = async () => {
        const uri = `${BASE_URL}project`;
        const resp = await axios.get(uri);

        if(!resp || !resp.data)
            return;

        const respProjects: IProject[] = resp.data.rows.map(
            (row: any) => (
                {
                    projectId:      row._id,
                    projectName:    row.name,
                    color:          row.color,
                    rateValueHour:  row.rateValueHour,
                    payerId:        row.payerId,
                    payerName:      row.payer.name,
                    receptorId:     row.receptorId,
                    receptorName:   row.receptor.name,
                }
            )
        );
        setProjects(respProjects);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects };
}