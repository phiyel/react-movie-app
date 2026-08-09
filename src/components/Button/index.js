import React from "react";
import PropTypes from "prop-types";
//styles
import { Wrapper } from "../Button/Button.styles";

const Button = ({ text, callback, gtmEvent, gtmPayload = {} }) => {
    const handleClick = (event) => {
        if (gtmEvent && typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: gtmEvent,
                button_text: text,
                ...gtmPayload
            });
        }

        callback(event);
    };

    return (
        <Wrapper type="button" onClick={handleClick}>
            {text}
        </Wrapper>
    );
};
Button.propTypes = {
    text: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    gtmEvent: PropTypes.string,
    gtmPayload: PropTypes.object
};


export default Button;