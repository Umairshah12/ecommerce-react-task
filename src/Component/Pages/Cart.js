import React from "react";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import currencyFormater from "currency-formatter";
import { RemoveCartItem, clearCart,IncrementItems,DecrementItems } from "../../Redux/Action/CartAction";

function Cart() {
  const dispatch = useDispatch();
  let cartItems = useSelector((state) => state.CartItemReducer.addedItems);
  console.log("cart items",cartItems)

  const totalItems = () => {
    const countItems = cartItems;
      return (
      countItems &&
      countItems.reduce((prev, current) => prev + +current.tQuantity, 0)
    );
  }
  
  const PriceCount = () => {
     return  cartItems.reduce((total, product) => total + product.price * product.tQuantity, 0).toFixed(2);
    // const countItems = cartItems;
    // return (
    //   countItems &&
    //   countItems.reduce((prev, current) => prev + +current.price, 0)
    // );
  };
  let count = PriceCount();
  let totalQuantity = totalItems();
  

  return (
    
    <>
      <div className="cart">
        <div className="container">
          {cartItems && cartItems.length > 0 ? (
            <>
              <Typography variant="h4" className="cart-heading-message">
                YOUR CART
              </Typography>
              <div className="row mt-4">
                <div className="col-9">
                  <div className="cart-heading-color items-heading">
                    <div className="row">
                      <div className="col-2">picture</div>
                      <div className="col-2">Name</div>
                      <div className="col-2">PRICE</div>
                      <div className="col-2">QTY</div>
                      <div className="col-2">Remove</div>
                    </div>
                  </div>
                  {cartItems &&
                    cartItems.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row vertical-align">
                            <div className="col-2">
                              <div className="cart-image cart-size-image">
                                <img
                                  src={
                                    item.img.includes("https")
                                      ? item.img
                                      : `http://localhost:3000${item.img}`
                                  }
                                  alt="cart-image"
                                />
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="cart-name">{item.name}</div>
                            </div>
                            <div className="col-2">
                              <div className="cart-product-price">
                                {currencyFormater.format(item.price, {
                                  code: "USD",
                                })}
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="buttons">
                                <Button
                                  size='small'
                                    className="btn-bg"
                                    disableElevation
                                     variant='contained'
                                   onClick={() => dispatch(IncrementItems(item.id))}                                  
                                  >
                                    +
                                  </Button>
                              
                                <p>{item.tQuantity}</p>
                                {item.tQuantity === 1 ?
                                    <Button
                                    size='small'
                                    disableElevation
                                    className="btn-bg"
                                    variant='contained'>
                                    <DeleteIcon  onClick={() => {
                                  dispatch(RemoveCartItem(item.id));
                                }} />
                                </Button>
                                :
                                  <Button
                                    size='small'
                                    disableElevation
                                    className="btn-bg"
                                    variant='contained'
                                   onClick={() => dispatch(DecrementItems(item.id))}
                        
                                  >
                                    -
                                  </Button>  }
                                  
                              </div>
                              </div>    
                            </div>
                          </div>
                      );
                    })}
                </div>
                <div className="col-3">
                  <div className="summary">
                    <div className="summary-heading">summary</div>
                    <div className="summary-detail">
                      <div className="row total-mb ">
                        <div className="col-6">TOTAL ITEMS:</div>
                        <div className="col-6">{totalQuantity}</div>
                      </div>

                      <div className="row total-mb">
                        <div className="col-6">TOTAL Price:</div>
                        <div className="col-6">
                          {currencyFormater.format(count, {
                            code: "USD",
                          })}
                        </div>
                
                      </div>
                      <div className="col-12">
                        <button
                          className="clear-cart"
                          onClick={() => {
                            dispatch(clearCart());
                          }}
                        >
                          clear cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Typography variant="h4" className="cart-heading-message">
              YOUR CART IS EMPTY
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
