import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import loader from './loader'

export default combineReducers({
    loader,
    page,
    user
})