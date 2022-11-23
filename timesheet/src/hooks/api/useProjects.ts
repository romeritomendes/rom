import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from ".";
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

        setProjects(
            () => resp.data.rows.map(
                (row: any) => (
                    {
                        projectId:      row._id,
                        name:           row.name,
                        color:          row.color,
                        rateValueHour:  row.rateValueHour,
                        payerId:        row.payerId,
                        receptorId:     row.receptorId,
                    }
                )
            )
        );
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects };
}