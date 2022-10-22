import React from 'react';
import styled from 'styled-components';

export interface IProjectWorkDays {
    id:         string;
    name:       string;
    color:      string;
    workday:    number;
    workhours:  number;
}

export interface IDays {
    dayText:    string;
    size:       number;
    disable:    boolean;
    holiday:    boolean;
    projects:   IProjectWorkDays[];
    onClick:    () => void;
}

const Days = ({ dayText, size, disable, holiday, projects, onClick }: IDays) => {
    return (
        <Container
            size={size}
            disable={disable}
            holiday={holiday}
            onClick={onClick}
        >
            <Text>
                {dayText}
            </Text>
            {projects &&
                projects.map(
                    project => 
                        <ProjectLine key={project.id} color={project.color} />
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
`;

const Text = styled.b`
    position: absolute;

    margin: auto;

    cursor: pointer;
`;

export default Days;