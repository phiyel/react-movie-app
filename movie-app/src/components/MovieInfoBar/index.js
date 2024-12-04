import React from "react";
//helpers
import { calcTime, convertMoney } from '../../helpers';
//styles
import { Wrapper, Content } from './MovieInfoBar.styles';


const MovieInfoBar = ({ time, budget, revenue }) => (
    <Wrapper>
        <Content>
            <div className="column">
                <p>Running time: {calcTime(time)}</p>
            </div>
            <div className="column">
                <p>Budget: {budget !== 0 ? convertMoney(budget) : 'NA'}</p>
            </div>
            <div className="column">
                <p>Revenue: {revenue !== 0 ? convertMoney(revenue) : 'NA'}</p>
            </div>
        </Content>
    </Wrapper>
);

export default MovieInfoBar;