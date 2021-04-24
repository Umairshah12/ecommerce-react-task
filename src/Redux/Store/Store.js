import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { CartItemReducer } from "../Reducer/CartItemReducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
   whitelist: ['CartItemReducer'] 
}
const root = combineReducers({
  CartItemReducer,
});

const persistedReducer = persistReducer(persistConfig, root)
 export const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)))
 export const persistor = persistStore(store)

// const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
