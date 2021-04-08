import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import currencyFormater from "currency-formatter";
import {
  fetchProductListSuccess,
  AddToCart,
} from "../../Redux/Action/CartAction";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function ProductList() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  let inCart = useSelector((state) => state.CartItemReducer.inCart);
  const inCartItems = localStorage.getItem("IncartData");
  inCart = inCartItems && JSON.parse(inCartItems);

  useEffect(() => {
    async function fetchMyAPI() {
      let url = "http://localhost:3000/items";
      let response = await fetch(url);
      response = await response.json();
      dispatch(fetchProductListSuccess(response));
      console.log("images", response);
      setProducts(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="cart-img">
      <div className="container">
        <div className="row">
          {products &&
            products.map((item) => {
              // console.log("image", item.img);
              return (
                <div className="col-3 my-4" key={item.id}>
                  <div className="product">
                    <div className="product-image">
                      <img
                        src={
                          item.img.includes("https")
                            ? item.img
                            : `http://localhost:3000${item.img}`
                        }
                        // src={item.img}
                        alt="product-image"
                      />
                    </div>
                    <div className="product-name">{item.name}</div>
                    <div className="row">
                      <div className="col-12">
                        <div className="product-price">
                          {currencyFormater.format(item.price, {
                            code: "USD",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mt-2">
                        <Button
                          size="small"
                          disabled={
                            inCart &&
                            inCart.find((cartItem) => {
                              return cartItem.id === item.id ? true : false;
                            })
                          }
                          variant="contained"
                          color="primary"
                          onClick={() => dispatch(AddToCart(item.id))}
                        >
                          Add To Cart
                          <AddShoppingCartIcon className="mx-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
