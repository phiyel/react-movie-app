import React, { useContext } from "react";
import { Link } from "react-router-dom";    

import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, LogoImg, TMDBLogoImg, Login } from "./Header.styles";

//context
import { UserContext } from "../../context/UserProvider";

const Header = () => {
    const [user, setUser] = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem("guest_session_id");
        setUser(null);
    };

    return (
        <Wrapper>
            <Content>
                <Link to="/">
                    <LogoImg src={RMDBLogo} alt="rmdb-logo" />
                </Link>
                <Login>
                    {user ? (
                        <div className="loggedOut">
                            <span className="logged-in-text">
                                {user.username ? `Logged in as ${user.username}` : `Logged in as Guest`}
                            </span>
                            <button onClick={handleLogout}>Sign Out</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <div className="login">Log in</div>
                            </Link>
                            <Link to="/signup">
                                <div className="login">Sign Up</div>
                            </Link>
                        </>
                    )}
                    <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
                </Login>
                
            </Content>
        </Wrapper>
    );
};

export default Header;