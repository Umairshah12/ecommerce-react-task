import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import currencyFormater from "currency-formatter";
import {
  fetchProducts,
  AddToCart,
} from "../../Redux/Action/CartAction";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function ProductList() {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.CartItemReducer.products);

  let error = useSelector((state) => state.CartItemReducer.errorMessage);
  let inCart = useSelector((state) => state.CartItemReducer.inCart);


  useEffect(() => {
   dispatch(fetchProducts())
  }, []);

  return (
    <div className="cart-img">
      <div className="container">
        <div className="row">
          {products &&
            products.map((item) => {
              // console.log("image", item.img);
              // console.log("image", item.img.includes("https"));
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
