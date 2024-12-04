import React from "react";
import { Link } from "react-router-dom";

//styles
import { Image } from "../Thumb/Thumb.styles";

const Thumb = ({ image, movieId, clickable, title }) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt={title} />
            </Link>
        ) : (
            <Image src={image} alt={title} />
        )}
    </div>
);

export default Thumb;
