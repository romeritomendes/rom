import styled from "styled-components";
import { FaBars } from 'react-icons/fa';

interface iToolBar {
    user?: {
        email: string;
        level: number;
    };
}

function App({ user }: iToolBar) {

    return (
        <div>HEADER</div>
        // <Container>
        //     <TopBar>
        //         <Icon>
        //             <FaBars />
        //         </Icon>
        //         <SearchBar></SearchBar>
        //         <UserBar>
        //             {user?.email}
        //         </UserBar>
        //         <CircleBar>
        //             {user?.level}
        //         </CircleBar>
        //     </TopBar>
        // </Container>
    )
}

const Container = styled.nav`
    font-size: 2rem;
`;

const TopBar = styled.article`
    display: flex;
    /* justify-content: start; */
    align-items: center;

    height: 80px;
    --background-color: #060b26;
    background-color: #3441AD;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;

    color: #f5f5f5;

    :hover {
        background-color: #1a83ff;
    }

    cursor: pointer;
`;

const SearchBar = styled.div`
    flex-grow: 1;
`;

const UserBar = styled.div`
    /* padding: 8px 16px; */

    font-size: 1rem;
    color: #f5f5f5;
`;

const CircleBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 3px;
    margin: 0 1rem 0 0.5rem;
    border-radius: 1rem;
    width: 2rem;
    height: 2rem;

    font-size: 0.8rem;
    color: #f5f5f5;
    background-color: #767ec2;
`;

export default App;