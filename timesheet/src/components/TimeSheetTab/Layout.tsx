import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    /* overflow: auto; */
    /* width: 300px; */

    width:  max-content;
`;

export const Head = styled.div`
    display: inline-block;

    background-color: #3441AD;
    color: #FFFFFF;
    font-weight: bold;
`;

export const Body = styled.div`
    display: inline-block;
`;

interface IRow {
    color?:     string;
}

export const Row = styled.div<IRow>`
    display: flex;

    background-color: #${p => p.color};
    color: ${p => p.color ? '#ffffff':''};
`;

interface ICell {
    size?:  number;
    align?: string;
}

export const Cell = styled.div<ICell>`
    display: flex;
    align-items: center;
    justify-content: ${p => p.align};

    border: 1px solid #EAEAEA;
    padding: 0 0.5rem;

    min-width: ${p => p.size}rem;
    height: 2rem;

    font-size: 0.8rem;

    &>a {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 4px;

        width: 1.5rem;
        height: 1.5rem;

        box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);

        cursor: pointer;

        &:hover {
            border: 1px solid hsl(200,100%,50%);

            color: hsl(200,100%,50%);
        }
    }
`;