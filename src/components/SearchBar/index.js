import React, { Component } from "react";
//image
import searchIcon from "../../images/search-icon.svg";
//styles
import { Wrapper, Content } from "../SearchBar/SearchBar.styles";

class SearchBar extends Component {

    state = { value: '' };
    timeout = null;

    // use of lifecycle method
    componentDidUpdate(_prevProps, prevState) {
        if(this.state.value !== prevState.value){
            const { setSearchTerm } = this.props;

            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
            }, 500);
        }
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };
     
    render(){

        const { state } = this.state;

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon' />
                    <input 
                        type='text'
                        id="search"
                        name="search"
                        placeholder='Search Movie'
                        onChange={this.handleChange}
                        value={state}
                    />
                </Content>
            </Wrapper>
        );
    
    }
    
}

export default SearchBar;