import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { CartItemReducer } from "../Reducer/CartItemReducer";

const root = combineReducers({
  CartItemReducer,
});
const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));
export default store;
