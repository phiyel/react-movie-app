import styled from "styled-components";

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 20px 0;
    margin: 0 auto;

    a {
        color: var(--white);
        text-decoration: none;

    }
`;

export const LogoImg = styled.img`
    width: 200px;
    @media screen and (max-width: 500px) {
        width: 150px;
        
    }   
`;

export const TMDBLogoImg = styled.img`
    width: 100px;
    @media screen and (max-width: 500px) {
        width: 80px;
        display: none;
    }
`;

export const Login = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;


    .login,
    .loggedOut {
        margin: 0 20px;
        color: var(--white);
        
    }

    a:first-child {
        border-right: 1px solid var(--white);
    }

    .logged-in-text {
        @media screen and (min-width: 600px) {
            display: block;
            margin-bottom: 8px;
        }
       
    }
    .loggedOut {
        @media screen and (max-width: 600px) {
            text-align: right;

            button {margin-top: 10px;}
        }
    }
`;