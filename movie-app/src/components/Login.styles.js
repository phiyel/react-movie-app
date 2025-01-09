import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 320px;
    padding: 20px 0;
    margin: 70px auto;
    color: var(--darkGrey);

    @media (min-width: 768px) {
        max-width: 450px;
        padding: 20px;
        
    }

    label {
        align-self: start;
        margin-top: 20px;
        font-size: var(--fontMed);
    }
    
    input {
        font-size: var(--fontMed);
        width: 100%;
        height: 50px;
        border: 1px solid var(--darkGrey);
        border-radius: 30px;
        margin: 10px 0;
        padding: 20px;
        
    }

    .error {
        align-self: flex-start;
        color: red;
        margin: 10px 0;
    }
`;
