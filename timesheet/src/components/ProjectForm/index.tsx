import moment from 'moment';
import styled from 'styled-components';
import { useGlobalContextState } from '../../context';
import { ITaskWorkDays } from '../Calendar/Days';

import { onSave, Wrapper } from './Wrapper';

// const NEW_TASK: ITaskWorkDays = {
//     id:             undefined,
//     description:    '',
//     projectId:      '',
//     name:           '',
//     color:          '',
//     workday:        moment(),
//     workhours:      8,
// }

const ProjectForm = () => {

    const {
        month,
        // selectedDay,
        addTaskWorkDays,
        selectedTask,
        // tasksWorkDays,
        closeDialog,
        dialogShow
    } = useGlobalContextState();

    // let taskEdit = tasksWorkDays.filter(task => task.id === selectedTaskId)[0];
    // if(!taskEdit)
    //     taskEdit = NEW_TASK;

    if(!dialogShow)
        return <></>;

    const handleSave = ({ projectId, newHours }: onSave) => {
        addTaskWorkDays(
            {
                projectId,
                workdays: [
                    {
                        month,
                        hours: newHours
                    }
                ]
            }
        );
    }

    return (
        <Container>
            <Wrapper
                selectedDay={selectedTask.workday}
                task={selectedTask}
                closeDialog={closeDialog}
                onSave={handleSave}
            />
        </Container>
    )
}

const Container = styled.article`
    position: fixed;

    display: flex;
    justify-content: center;

    top: 0;
    /* left: 300px; */
    left: 0;
    width: 100ch;
    height: 100vh;

    background-color: rgb(255 255 255 / 50%);

    z-index: 3;
`;

export default ProjectForm;