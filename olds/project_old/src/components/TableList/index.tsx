import React from 'react';
import styled from 'styled-components';

interface ITableListProps {
    
}

export const TableList = (props: ITableListProps) => {
    return (
        <Container>
            <Head>
                <Cell>Projeto</Cell>
                <Cell>Cliente Pag.</Cell>
                <Cell>Taxa (D)</Cell>
                <Cell>Taxa (H)</Cell>
                <Cell></Cell>
            </Head>
            <Body></Body>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    align-items: center;
`;

const Head = styled.div`
    display: flex;
    align-items: center;

    background-color: #3441AD;
`;

const Body = styled.div`
    display: flex;
    align-items: center;
`;

const Cell = styled.div`
    display: flex;
    align-items: center;

    border: 1px solid #EAEAEA;
    padding: 0 0.5rem;

    min-width: 4rem;
    height: 2rem;

    font-size: 0.8rem;
    font-weight: bold;
    color: #FFFFFF;
`;