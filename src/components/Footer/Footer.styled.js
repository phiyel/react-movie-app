import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
    background: var(--medGrey);
    color: var(--white);
    margin-top: 50px;
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: var(--maxWidth);
    padding: 0 20px;
    margin: 0 auto;

    h2 {
        margin: 0 auto;
    }
`;