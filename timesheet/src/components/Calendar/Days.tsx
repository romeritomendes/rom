import moment from 'moment';
import styled from 'styled-components';

export interface ITaskWorkDays {
    id:             string | undefined;
    description:    string;
    projectId:      string;
    name:           string;
    color:          string;
    workday:        moment.Moment;
    workhours:      number;
}

export interface IDays {
    dayText:        string;
    size:           number;
    disable:        boolean;
    holiday:        boolean;
    tasks:          ITaskWorkDays[];
    onDayClick:     () => void;
    onTaskClick:    (id: string) => void;
}

const Days = ({ dayText, size, disable, holiday, tasks, onDayClick, onTaskClick }: IDays) => {

    const handleClick = (e: React.MouseEvent, onClick: () => void) => {
        e.preventDefault();

        onClick();
    }

    return (
        <Container
            size={size}
            disable={disable}
            holiday={holiday}
        >
            <Text
                onClick={e => handleClick(e, onDayClick)}
            >
                {dayText}
            </Text>
            {tasks &&
                tasks.map(
                    task => 
                        <ProjectLine
                            key={task.id}
                            color={task.color}
                            onClick={() => task.id && onTaskClick(task.id)}
                        >
                                <p>{task.name.split(' ')[0].substring(0, 12)}</p>
                        </ProjectLine>
                )
            }
        </Container>
    )
}

interface IContainer {
    size:       number;
    disable:    boolean;
    holiday:    boolean;
}

const Container = styled.div<IContainer>`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px dashed black;

    width: ${p => p.size}rem;
    height: ${p => p.size}rem;

    background-color: ${p => {
        if(p.disable)
            return 'grey';

        if(p.holiday)
            return 'rgba(134, 134, 134, 0.1)';
         
        return 'white';
    }};
    opacity: ${p => p.disable || p.holiday ? 30:100}%;

    font-size: 1.5rem;
`;

export interface IProjectLine {
    color:  string;
}

const ProjectLine = styled.div<IProjectLine>`
    width: 100%;
    min-height: 1rem;

    border: 1px solid black;
    /* border-top: 1px solid black;
    border-bottom: 1px solid black; */

    background-color: ${p => p.color};
    opacity: 30%;

    cursor: pointer;

    box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);

    &:hover {
        opacity: 100%;
        
        min-height: 1.5rem;

        font-weight: bold;

        z-index: 3;
    }

    &>p {
        margin: 0;
        color: ${p => p.color};
        mix-blend-mode: difference;

        font-size: 0.9rem;
        text-align: center;
    }
`;

const Text = styled.b`
    position: absolute;

    margin: auto;

    cursor: pointer;

    z-index: 3;
`;

export default Days;