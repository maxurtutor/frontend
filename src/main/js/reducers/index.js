// @flow
'use strict';

import {combineReducers} from 'redux'
import page from './page'
import user from './user'
import global from './global'

export default combineReducers({
    user,
    global,
    page,
})