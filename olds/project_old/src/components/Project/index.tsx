import React from 'react';
import styled from 'styled-components';
import { TableList } from '../TableList';

type IProjectProps = {}

export const Project = (props: IProjectProps) => {
    return (
        <Container>
            <ToolBar>
                <button>+ Novo Projeto</button>
                <button>Importar</button>
                <button>Exportar</button>
                <input placeholder='Pesquisar por Cliente ou Projeto' />
            </ToolBar>
            <div>
                <FilterBar>
                    <button>Opções</button>
                    <button>Filtro por Projeto</button>
                </FilterBar>
                <TableList></TableList>
            </div>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ToolBar = styled.div`
    display: flex;
    align-items: center;
`;

const FilterBar = styled.div`
    display: flex;
    align-items: center;
`;