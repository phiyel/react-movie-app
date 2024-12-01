import React from "react";

//styles
import { Image } from "../Thumb/Thumb.styles";

const Thumb = ({ image, movieId, clickable, title }) => (
    <div>
        <Image src={image} alt={title} />
    </div>
);

export default Thumb;
