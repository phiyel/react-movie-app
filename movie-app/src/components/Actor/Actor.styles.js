import styled from "styled-components";

export const Wrapper = styled.div`
    color: var(--white);
    background: var(--darkGrey);
    padding: 20px;
    border-radius: 20px;
    text-align: center;

    h3 {
        margin: 10px 0 0 0;
    }

    p {
        margin: 5px 0;
    }   
`;

export const Image = styled.img`
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;

    .actor-image {  
        display: block;
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 15px;
    }
`;