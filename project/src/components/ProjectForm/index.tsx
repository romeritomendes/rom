import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ICustomer } from "../../enities/customer";
import { IProject } from "../../enities/project";
import { BASE_URL } from "../../hooks/api";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { ISelectOptions } from "../ui/Select";

interface IProjectForm {
    handleClose:    () => void;

    project:        IProject;
}

export const ProjectForm = ({ handleClose, project }: IProjectForm) => {

    const [projectName, setProjectName] = useState(project.name);
    const [payerId, setPayerId] = useState(project.payerId);
    const [receptorId, setReceptorId] = useState(project.receptorId);
    const [color, setColor] = useState(project.color);
    const [type, setType] = useState(project.type);

    const [clientList, setClientList] = useState<ICustomer[]>([]);

    useEffect(() => {
        const uri = `${BASE_URL}customer`;

        axios.get(uri)
        .then(res => {
            setClientList(res.data.rows);
        })
    }, []);

    const payerList: ISelectOptions[] = clientList.filter((row: any) => row.type === 'payer').map((row: any) => (
        {
            label: row.name,
            value: row._id,
        }
    ));

    const receptorList: ISelectOptions[] = clientList.filter((row: any) => row.type === 'receptor').map((row: any) => (
        {
            label: row.name,
            value: row._id,
        }
    ));

    const typeList: ISelectOptions[] = [
        {
            label: 'SAP ABAP',
            value: 'SAP ABAP'
        }
    ]

    const payer: ICustomer = clientList.filter(client => client._id === payerId)[0];

    const save = () => {
        let uri = `${BASE_URL}project`;

        const payload = {
            _id:            project._id,
            name:           projectName,
            type:           type,
            shortname:      projectName.split(' ')[0].substring(0, 12),
            color:          color,
            payerId:        payerId,
            receptorId:     receptorId,
            rateValueDay:   payer.rateValueDay ? payer.rateValueDay : payer.rateValue,
            rateValueHour:  payer.rateValueHour ? payer.rateValueHour : payer.rateValue / 8,
        }

        if(project._id === undefined){

            axios.post(uri, payload)
            .then(res => {
                handleClose();
                alert('Projeto Salvo!');
            })
            .catch(err => {
                console.log(err)
                alert('Error ao gravar projeto!');
            });

        } else {

            uri = `${uri}/${project._id}`;

            axios.put(uri, payload)
            .then(res => {
                handleClose();
                alert('Projeto Salvo!');
            })
            .catch(err => {
                console.log(err)
                alert('Error ao gravar projeto!');
            });

        }
    }

    return (
        <Container>
            <Field
                label="Projeto"
                name="project"
                value={projectName}
                onChange={setProjectName}
                required={true}
            />
            <Field
                type="select"
                label="Tipo"
                name="type"
                value={type}
                onChange={setType}
                options={typeList}
                required={true}
            />
            <Field
                type="select"
                label="Ciente Rec."
                name="receptorId"
                value={receptorId}
                onChange={setReceptorId}
                options={receptorList}
                required={true}
            />
            <Field
                type="select"
                label="Ciente Pag."
                name="payerId"
                value={payerId}
                onChange={setPayerId}
                options={payerList}
                required={true}
            />
            <Field
                label="Cor"
                name="color"
                value={color}
                onChange={setColor}
                required={true}
            />
            <Button
                onClick={save}
            >Salvar</Button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;