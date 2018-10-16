import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    };
}
    
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    };
};

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
        };
    }
    
    render(){
        const { robots } = this.state;
        const {searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));
        if (robots.length === 0){
            return <h1 id='heading'>Loading Robots!!</h1>
        } else {
            return (
                <div className='page'>
                    <h1 id='heading'>Robo Friends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
    
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(robots => this.setState({ robots: robots }))
            .catch(err => console.log(err.message));
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);