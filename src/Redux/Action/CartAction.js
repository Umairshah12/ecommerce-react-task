
export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const ADD_NEW_ITEMS = "ADD_NEW_ITEMS";
export const ERRORS = "ERRORS";
// export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";

 const fetchProductListSuccess = (products) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: products,
  };
};

 const fetchProductListFailure = (error) => {
  return {
    type: ERRORS,
    payload: error,
  };
};

//  const loadingfunction = () => {
//   return {
//     type: FETCH_USER_REQUEST,
//   };
// };

export const fetchProducts = () => {
  return async function (dispatch) {
    try {
      // dispatch(loadingfunction())
      const res = await fetch("http://localhost:3000/items")       
       const products = await res.json();
       dispatch(fetchProductListSuccess(products));
    } catch (error) {
       dispatch(fetchProductListFailure(error));
    }    
  };
};

export const AddToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const AddNewItem = (items) => {
  return {
    type: ADD_NEW_ITEMS,
    payload: items,
  };
};

export const RemoveCartItem = (id) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
