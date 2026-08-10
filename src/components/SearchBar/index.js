import React, { Component } from "react";
//image
import searchIcon from "../../images/search-icon.svg";
//styles
import { Wrapper, Content } from "../SearchBar/SearchBar.styles";

class SearchBar extends Component {

    state = { value: '' };
    timeout = null;

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    // use of lifecycle method
    componentDidUpdate(_prevProps, prevState) {
        if(this.state.value !== prevState.value){
            const { setSearchTerm } = this.props;

            if (this.timeout) clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'search movie',
                    action: 'search',
                    searchTerm: value
                });
            }, 500);
        }
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };
     
    render(){

        const { value } = this.state;

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
                        value={value}
                    />
                </Content>
            </Wrapper>
        );
    
    }
    
}

export default SearchBar;