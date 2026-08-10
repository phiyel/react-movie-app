import styled from "styled-components";

import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

export const Wrapper = styled.div`
    background: ${({ $backdrop }) =>
        $backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${$backdrop})` : "#000"
    };
    background-size: cover;
    background-position: center;
    padding: 40px 20px;
    animation: animateMovieinfo 1s;

    @keyframes animateMovieinfo {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
export const Content = styled.div`
    display: flex;
    max-width: var(--maxWidth);
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;

    @media screen and (max-width: 768px) {
        display: block;
        max-height: none;
    }


`;
export const Text = styled.div`
    width: 100%;
    padding: 20px 40px;
    color: var(--white);
    overflow: hidden;

    .rating-directors {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 25px;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #fff;
        color: #000;
        font-weight: 800;
        border-radius: 50%;
        margin: 0;
    }

    .director {
        margin: 0 0 0 40px;

        p {
            margin: 0;
        }
    }

    .rate-movie {
        margin-bottom: 25px;
    }

    .video-section {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
    }
    .video-section iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }

    h1, h3, p {
        @media screen and (max-width: 768px) {
            font-size: var(--fontBig);
        }
    }

    a {
        text-decoration: none;
        color: #fff;

        &:hover {
            text-decoration: underline;
        }

        &:visited,
        &:link,
        &:active,
        &:focus {
            color: #fff;
        }
    }
`;
