import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    background: var(--darkGrey);
    padding: 0 20px;

    @media screen and (max-width: 768px) {
        height: 70px;
    }


`;
export const Content = styled.div`
    position: relative;
    max-width: var(--maxWidth);
    width: 100%;
    height: 55px;
    background: var(--medGrey);
    margin: 0 auto;
    border-radius: 40px;
    color: var(--white);

    img {
        position: absolute;
        left: 15px;
        top: 14px;
        width: 30px;
    }

    input {
        font-size: var(--fontBig);
        position: absolute;
        left: 0;
        margin: 8px 0;
        padding: 0 0 0 60px;
        border: 0;
        width: 95%;
        background: transparent;
        height: 40px;
        color: var(--white);

        &:focus {
            outline: none;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active{
            -webkit-text-fill-color: var(--white);
            -webkit-box-shadow: 0 0 0px 1000px var(--medGrey) inset;
            left: 4%;
        }

        @media screen and (max-width: 768px) {
            font-size: var(--fontMed);
        }
    }

`;