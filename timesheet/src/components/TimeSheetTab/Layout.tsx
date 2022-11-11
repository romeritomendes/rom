import styled from "styled-components";

export const Container = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Head = styled.div`
    display: flex;

    background-color: #3441AD;
    color: #FFFFFF;
    font-weight: bold;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;

export const Row = styled.div`
    display: flex;
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

    width: ${p => p.size}rem;
    min-width: 0.5rem;
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