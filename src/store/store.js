import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../Reducers/index'

const loggerMiddleware = createLogger()

let middleware = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, loggerMiddleware]
}

const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    )

    return store
}

export default configureStore