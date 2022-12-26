import styled from "styled-components";
import { ProjectPage } from "./ProjectPage";


const Project = () => {
    return (
        <Container>
            <ProjectPage />
        </Container>
    );
}

const Container = styled.div`
    padding: 15px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);

    width: 618px;
`;

export default Project;