// @flow
'use strict';

import {combineReducers} from 'redux'
import page from './page'
import user from './user'
import global from './global'
import project from './project'

export default combineReducers({
    user,
    global,
    page,
    project
})