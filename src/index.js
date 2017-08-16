import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './Containers/App'
import configureStore from './store/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const store = configureStore();

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);