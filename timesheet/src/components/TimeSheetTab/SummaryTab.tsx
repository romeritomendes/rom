import { IProject } from "../../enities/project";
import { ITaskWorkDays } from "../Calendar/Days";
import { Body, Cell, Container, Head, Row } from "./Layout";

export interface ITimeSheetTab {
    id:         string;
    dayText:    string;
    weekDay:    number;
    workday:    moment.Moment;
}

interface ISummaryTabProps {
    projects:       IProject[];
    tasksWorkDays:  ITaskWorkDays[];
    preview:        boolean;
}

const projectLength = 12;
const clientPagLength = 6;
const HOURSLength = 4;
const AMOUNTLength = 5;

export const SummaryTab = ({ projects, tasksWorkDays, preview }: ISummaryTabProps) => {

    let totalHrs = 0;
    let totalAmount = 0;

    return (
        <Container>
            <Head>
                <Row>
                    <Cell size={projectLength}>Projeto</Cell>
                    <Cell size={clientPagLength}>Cliente Rec.</Cell>
                    <Cell size={HOURSLength}>Total (H)</Cell>
                    <Cell size={AMOUNTLength}>Total Liq. (€)</Cell>
                    <Cell size={AMOUNTLength}>IVA (€)</Cell>
                    <Cell size={AMOUNTLength}>Total Brt. (€)</Cell>
                </Row>
            </Head>
            <Body>
                {
                    projects?.map(
                        project => {
                            const tasks = tasksWorkDays.filter(task => task.projectId === project.projectId);

                            let totalHrsProject = 0;
                            let totalAmountProject = 0;
                            tasks.forEach(task => {
                                totalHrsProject = totalHrsProject + task.workhours;
                                totalAmountProject = totalAmountProject + ( task.workhours * project.rateValueHour );
                            });

                            totalHrs = totalHrs + totalHrsProject;
                            totalAmount = totalAmount + totalAmountProject;

                            return(
                                <Row key={project.name} color={project.color}>
                                    <Cell size={projectLength}>{project.name.substring(0, 40)}</Cell>
                                    <Cell size={clientPagLength}>{project.name.split(" ")[0].substring(0, 10)}</Cell>
                                    <Cell
                                        size={HOURSLength}
                                        align="space-around"
                                    >
                                        {totalHrsProject}
                                    </Cell>
                                    <Cell
                                        size={AMOUNTLength}
                                        align="right"
                                    >
                                        {totalAmountProject.toFixed(2)}
                                    </Cell>
                                    <Cell
                                        size={AMOUNTLength}
                                        align="right"
                                    >
                                        {(totalAmountProject * 0.23).toFixed(2)}
                                    </Cell>
                                    <Cell
                                        size={AMOUNTLength}
                                        align="right"
                                    >
                                        {(totalAmountProject * 1.23).toFixed(2)}
                                    </Cell>
                                </Row>
                            )
                        }
                    )
                }
                <Row>
                    <Cell size={projectLength}></Cell>
                    <Cell size={clientPagLength}></Cell>
                    <Cell
                        size={HOURSLength}
                        align="space-around"
                        style={{ backgroundColor: '#dedede', fontWeight: "bold" }}
                    >{totalHrs}</Cell>
                    <Cell
                        size={AMOUNTLength}
                        align="right"
                        style={{ backgroundColor: '#dedede', fontWeight: "bold" }}
                    >{totalAmount.toFixed(2)}</Cell>
                    <Cell
                        size={AMOUNTLength}
                        align="right"
                        style={{ backgroundColor: '#dedede', fontWeight: "bold" }}
                    >{(totalAmount * 0.23).toFixed(2)}</Cell>
                    <Cell
                        size={AMOUNTLength}
                        align="right"
                        style={{ backgroundColor: '#dedede', fontWeight: "bold" }}
                    >{(totalAmount * 1.23).toFixed(2)}</Cell>
                </Row>
            </Body>
        </Container>
    )
}