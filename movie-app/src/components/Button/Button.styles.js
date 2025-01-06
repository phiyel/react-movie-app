import styled from 'styled-components';

export const Wrapper = styled.button`
    display: block;
    background: var(--darkGrey);
    width: 25%;
    min-width: 200px;
    height: 60px;
    margin: 45px auto;
    border-radius: 30px;
    color: var(--white);
    border: 0;
    font-size: var(--fontBig);
    transition: all 0.3s;
    outline: none;
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }

    :focus {
        outline: none;
    }

    @media screen and (max-width: 768px) {
        width: 70%;
    }

    
`;