import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import '../styles/style.less'
import App from './containers/App'
import configureStore from './store/configureStore'
import 'typeface-roboto'

const store = configureStore();

render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
);