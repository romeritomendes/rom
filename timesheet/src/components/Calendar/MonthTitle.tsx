import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import { months } from '../../data/months';

export interface IMonthTitleProps {

}

export const MonthTitle = (props: IMonthTitleProps) => {

    const {
        year,
        month,
        type,
        weekNumber,
        back,
        forward,
    } = useGlobalContextState();
    
    return (
        <Container>
            <button onClick={() => back()}>&lt;&lt;</button>
            {
                type === 'TS'
                    ? <h3>{`Semana ${weekNumber} - ${year}`}</h3>
                    : <h3>{`${months[month-1].title} - ${year}`}</h3>
            }
            <button onClick={() => forward()}>&gt;&gt;</button>
        </Container>
    )
}

const Container = styled.article`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    &>h3 {
        width: 10rem;

        text-align: center;
    }

    &>button {
        width:  2rem;
        height: 2rem;
    }
`;