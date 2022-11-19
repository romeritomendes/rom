import styled from 'styled-components';
import { useGlobalContextState } from '../../context';

import { onSave, Wrapper } from './Wrapper';

const ProjectForm = () => {

    const {
        month,
        addTaskWorkDays,
        selectedTask,
        closeDialog,
        dialogShow,
        onDelTask,
    } = useGlobalContextState();

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
                onDel={onDelTask}
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