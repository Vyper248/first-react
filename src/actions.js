import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAIL
 } from './constants.js';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

export const requestRobots = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(robots => {
            //added check to make sure returned robots is an array that has something in it
            if (Array.isArray(robots) && robots.length > 0) dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: robots })
            else dispatch({ type: REQUEST_ROBOTS_FAIL, payload: 'No Robots Returned'});
        })
        .catch(err => dispatch({ type: REQUEST_ROBOTS_FAIL, payload: err.message }));
};