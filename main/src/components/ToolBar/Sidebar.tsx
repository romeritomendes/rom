import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import { menuItens } from "./config";

interface ISidebar {
    handleClose: () => void;
    level?:      number;
}

const Sidebar = ({ handleClose, level } : ISidebar) => {

    const currentLevel = level ? level : 0;

    return (
        <Container>
            <Bar>
                <Menu>
                    <ItemClose>
                        <Icon onClick={handleClose}>
                            <AiOutlineClose />
                        </Icon>
                    </ItemClose>
                    {menuItens.filter(item => item.level <= currentLevel).map(
                        item => {
                            const Icon = item.icon;
                            return (
                                <Item key={item._id}>
                                    <Link to={`${item.path}?title=${item.title}`}>
                                        <CLink onClick={handleClose}>
                                            <div><Icon /></div>
                                            <span>{item.title}</span>
                                        </CLink>
                                    </Link>
                                </Item>
                            )
                        }
                    )}
                </Menu>
            </Bar>
        </Container>
    )
}

const Container = styled.section`
    background: none;
`;

const Bar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: fixed;
    top: 0;
    transition: 850ms;

    width: 250px;
    /*height: 100vh;*/

    background-color: #060b26;

    z-index: 100;
`;

const Menu = styled.ul`
    margin: 0px;
    padding: 0px; 
    width: 100%;
`;

const Item = styled.li`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
`;

const ItemClose = styled.li`
    display: flex;
    justify-content: end;
    align-items: center;

    list-style: none;
    height: 60px;
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

    & span {
        margin-left: 16px;
        font-size: 18px;
    }

    cursor: pointer;
`;

const CLink = styled.div`
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-radius: 4px;
    width: 95%;
    height: 100%;

    text-decoration: none;

    color: #f5f5f5;

    :hover {
        background-color: #1a83ff;
    }

    & span {
        margin-left: 16px;
        font-size: 18px;
    }

    cursor: pointer;
`;

export default Sidebar;