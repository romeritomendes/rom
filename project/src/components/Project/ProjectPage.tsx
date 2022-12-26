import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IProject } from '../../enities/project';
import { TableList } from '../TableList';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { BASE_URL } from "../../hooks/api";
import axios from 'axios';
import { ProjectForm } from '../ProjectForm';
import { Dialog } from '../Dialog';

type IProjectProps = {}

const NEW_PROJECT: IProject = {
    _id:            undefined,
    name:           '',
    type:           'SAP ABAP',
    payerId:        '',
    payerName:      '',
    receptorId:     '',
    receptorName:   '',
    rateValueDay:   0,
    rateValueHour:  0,
    color:          '',
}

export const ProjectPage = (props: IProjectProps) => {

    const [projetos, setProjetos] = useState<IProject[]>([]);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | undefined>('');
    const [dialog, showDialog] = useState(false);

    useEffect(() => {
        const uri = `${BASE_URL}project`;
    
        axios.get(uri)
        .then(res => {
            const projetosRes: IProject[] =  res.data.rows.map(
                (row: any): IProject => (
                    {
                        _id:            row._id,
                        name:           row.name,
                        type:           row.type,
                        color:          row.color ? `${row.color}` : `#${Math.floor(Math.random()*16777215).toString(16)}`,
                        payerId:        row.payerId,
                        receptorId:     row.receptorId,
                        payerName:      row.payer.name,
                        receptorName:   row.receptor.name,
                        rateValueDay:   row.rateValueDay    ?   row.rateValueDay:0,
                        rateValueHour:  row.rateValueHour   ?   row.rateValueHour:0,
                    }
                )
            );
    
            setProjetos(projetosRes);
        })
        .catch(err => {
            console.log(err);
        });
    }, [dialog]);


    const filteredProject = projetos.filter(
        projeto =>
            projeto.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            || projeto.payerName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            || projeto.receptorName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    const handleClose = () => {
        setSelectedId(undefined);
        showDialog(false);
    }

    const handleDel = (id: string) => {

        if(dialog) //Se Dialog aberto não permite usar o botão
            return;

        const uri = `${BASE_URL}project/${id}`;

        axios.delete(uri)
        .then(res => {
            setProjetos(p => p.filter(projeto => projeto._id !== id));
            alert("Projeto Eliminado!");
        })
        .catch(err => {
            console.log(err);
            alert("Erro ao eliminar o Projeto!")
        })
    }

    const handleEdit = (id: string) => {

        if(dialog) //Se Dialog aberto não permite usar o botão
            return;

        setSelectedId(id);
        showDialog(true);
    }

    const handleNew = () => {
        
        if(dialog) //Se Dialog aberto não permite usar o botão
            return;

        setSelectedId(undefined);
        showDialog(true);
    }

    const selectedProject = selectedId ? projetos.filter(projeto => projeto._id === selectedId)[0] : NEW_PROJECT;

    return (
        <Container>
            <ToolBar>
                <div>
                    <Button
                        size={8}
                        onClick={handleNew}
                    >+ Novo Projeto</Button>
                    <Button>Importar</Button>
                    <Button>Exportar</Button>
                </div>
                <Input
                    placeholder='Pesquisar por Cliente ou Projeto'
                    value={search}
                    onChange={(e => setSearch(e.target.value))}
                />
            </ToolBar>
            <div>
                <FilterBar>
                    <Button size={8} align='left'>Opções</Button>
                    <Button size={13.2} align='left'>Filtro por Projeto</Button>
                </FilterBar>
                <TableList
                    projetos={filteredProject}
                    handleDel={handleDel}
                    handleEdit={handleEdit}
                />
            </div>
            {
                dialog &&
                    <Dialog
                        onClose={handleClose}
                        title='Novo Projeto'
                        Form={ProjectForm}
                        customProps={{ project: selectedProject }}
                    />
            }
        </Container>
    )
}

const Container = styled.article`
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const FilterBar = styled.div`
    display: flex;
    justify-content: space-between;
`;