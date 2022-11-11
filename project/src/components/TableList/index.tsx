import { IProject } from '../../enities/project';
import { Body, Cell, Container, Head, Row } from './Layout';

interface ITableListProps {
    projetos:   IProject[];
    handleDel:  (id: string) => void;
    handleEdit: (id: string) => void;
}

export const TableList = ({ projetos, handleDel, handleEdit }: ITableListProps) => {
    const projectLength = 12;
    const clientPagLength = 6;
    const actionLength = 7;

    return (
        <Container>
            <Head>
                <Cell size={projectLength}>Projeto</Cell>
                <Cell size={clientPagLength}>Cliente Pag.</Cell>
                <Cell>Taxa (D)</Cell>
                <Cell>Taxa (H)</Cell>
                <Cell size={7}></Cell>
            </Head>
            <Body>
                {
                    projetos?.map(
                        projeto => (
                            <Row key={projeto._id}>
                                <Cell size={projectLength}>{projeto.name.substring(0, 30)}</Cell>
                                <Cell size={clientPagLength}>{projeto.payerName}</Cell>
                                <Cell align='right'>{projeto.rateValueDay.toFixed(2)}</Cell>
                                <Cell align='right'>{projeto.rateValueHour.toFixed(2)}</Cell>
                                <Cell size={actionLength} align="space-around">
                                    <a onClick={() => handleDel(projeto._id ? projeto._id : 'noID')}>del</a>
                                    <a onClick={() => handleEdit(projeto._id ? projeto._id : 'noID')}>edit</a>
                                </Cell>
                            </Row>
                        )
                    )
                }
            </Body>
        </Container>
    )
}