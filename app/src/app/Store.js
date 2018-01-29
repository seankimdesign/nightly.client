import { createStore, applyMiddleware } from 'redux'
import createSaga from 'redux-saga'

import reducers from '../reducers/'
import saga from './Saga'

const sagaMiddleware = createSaga()
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(saga)

export default store
