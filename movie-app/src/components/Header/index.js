import React, { useContext } from "react";
import { Link } from "react-router-dom";    
import RMDBLogo from "../../images/react-movie-logo.svg";

import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg, Login } from "../Header/Header.styles";

//context
import { Context } from "../../context";

const Header = () => {
    const [user] = useContext(Context);
 
    return (
    <Wrapper>
        <Content>
        <Link to="/">
        <LogoImg src={RMDBLogo} alt="rmdb-logo" />
        </Link>
        <Login>
            {user ? (
                <div className="loggedOut"><span className="logged-in-text">Logged in as:</span> {user.username}</div>
            ) : (
                <Link to="/login">
                <div className="login">Log in</div>
                </Link>
            )}
            <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
        </Login>
        </Content>
    </Wrapper>
    );
};

export default Header;