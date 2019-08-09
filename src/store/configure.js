import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

export const configureStore = () => {
    const createAppStore = applyMiddleware(thunk)(createStore);
    const persistConfig = { key: 'root', blacklist: [], storage }
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createAppStore(persistedReducer)
    const persistor = persistStore(store)
    return { store, persistor }
}