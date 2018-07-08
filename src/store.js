import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';

/*const persistConfig = {
    key: 'root',
    storage,
};*/

// const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            createLogger(),
        ),
    )
);
persistStore(store, null);

export default store;
