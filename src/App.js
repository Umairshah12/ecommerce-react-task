import React from "react";
import "./Component/assets/css/style.css";
import ProductList from "./Component/Pages/ProductList";
import AddNewItems from "./Component/Pages/AddNewItems";
import Cart from "./Component/Pages/Cart";
import Navbar from "./Component/Pages/Navbar";
import Home from "./Component/Pages/Home";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" exact path component={Home} />
          <Route exact path="/product-list" component={ProductList} />
          <Route exact path="/checkout-item" component={Cart} />
          <Route exact path="/add-new-item" component={AddNewItems} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
