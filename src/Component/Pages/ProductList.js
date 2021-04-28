import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
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
  // let error = useSelector((state) => state.CartItemReducer.errorMessage);
  let inCart = useSelector((state) => state.CartItemReducer.inCart);


  useEffect(() => {
   dispatch(fetchProducts())
  }, []);

  return (
    <div className="grid-wrapper">
     <Grid container spacing={3}>
        {products?.map(item => {
            return (
              <>
                <Grid item key={item.id} xs={12} sm={4}>
                  <div className="Wrapper">
                    <img
                        src={
                          item.img.includes("https")
                            ? item.img
                            : `http://localhost:3000${item.img}`
                        }
                        alt="product-image"
                      />                   
                    <hr></hr>
                    <div>
                      <h3>{item.name}</h3>                  
                      <h3>Price: {currencyFormater.format(item.price, {
                            code: "USD",
                          })}</h3>
                    </div>
                    <Button                          
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
                </Grid>
              </>
            )
          })}
     </Grid>
      </div>
  );
}

export default ProductList;
