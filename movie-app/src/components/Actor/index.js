import React from "react";

//styles
import { Wrapper, Image } from './Actor.styles';

const Actor = ({ name, character, imageUrl }) => (
    <Wrapper>
        <Image className="actor-image" src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
);

export default Actor;