import {combineReducers} from 'redux';
import project from './project';
import user from './user';

export default combineReducers({
    project,
    user,
});
