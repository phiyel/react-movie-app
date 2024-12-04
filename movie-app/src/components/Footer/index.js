import React from "react";
//styles
import { Wrapper, Content } from './Footer.styled';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Wrapper>
            <Content>
                <h2>© {currentYear} | <span>All Rights Reserved. Developed by @rbonney</span></h2>
            </Content>
        </Wrapper>
    );
};

export default Footer;