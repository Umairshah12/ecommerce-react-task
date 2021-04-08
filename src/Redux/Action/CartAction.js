export const ADD_TO_CART = "ADD_TO_CART";
export const CLEAR_CART = "CLEAR_CART";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const ADD_NEW_ITEMS = "ADD_NEW_ITEMS";

export const fetchProductListSuccess = (products) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: products,
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
