import styled from "styled-components";
import { useGlobalContextState } from "../../context";
import Calendar from "../Calendar";
import { MonthTitle } from "../Calendar/MonthTitle";
import { Field } from "../ProjectForm/Field";
import { TimeSheetTab } from "../TimeSheetTab";

interface ITimeSheetPageProps {
    
}

export const TimeSheetPage = (props: ITimeSheetPageProps) => {

    const {
        type,
        setType
    } = useGlobalContextState();

    const Render = () => {
        switch (type) {
            case 'CL':
                return <Calendar />
        
            default:
                return <TimeSheetTab />
        }
    }

    const tipos = [
        { label: "Calendário",      value:  'CL' },
        { label: "Tabela - Mês",    value:  'TM' },
        { label: "Tabela - Semana", value:  'TS' },
    ];

    return (
        <Container>
            <div style={{ width: '300px' }}>
                <Field
                    type="select"
                    name="tipo"
                    label="TimeSheet"
                    value={type}
                    options={tipos}
                    onChange={v => setType(v)}
                />
            </div>
            <MonthTitle />
            {Render()}
        </Container>
    )
}

const Container = styled.section`
    /* display: grid;

    grid-template-columns: auto auto; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &>h3 {
        display: flex;
        align-items: center;

        padding: 0 1rem;

        height: 2rem;

    }
`;