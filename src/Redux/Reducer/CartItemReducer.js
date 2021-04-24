import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  FETCH_PRODUCT_SUCCESS,
  ADD_NEW_ITEMS,
  ERRORS,
  // FETCH_USER_REQUEST
} from "../Action/CartAction";

const initialState = {
  products: [],
  addedItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  inCart: [],
  errorMessage: "",
  // loading:false
};

export function CartItemReducer(state = initialState, action) {
  switch (action.type) {
  // case FETCH_USER_REQUEST:
  //     return {
  //       ...state,
  //       loading: true,
  //     };
    
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products:action.payload,
        // loading: false,
        error:""
      };
    
    case ERRORS:
      return {
        ...state,
        products: [],
        errorMessage: action.payload,
        // loading:false
      }

    case ADD_NEW_ITEMS:
      return {
        ...state,
        products: [...state.products,action.payload]
          
      };

    case ADD_TO_CART:
      let addedToCart = state.products.find(
        (item) => item.id === action.payload
      );

      let inCartdata = state.products.find(
        (item) => item.id === action.payload
      );

      let tPrice = state.totalPrice + addedToCart.price * state.totalQuantity;
      let tQuantity = state.totalQuantity + 1;
      // let allPrice = res.reduce((prev, current) => prev + +current.price, 0);

      return {
        ...state,
        addedItems: [...state.addedItems, addedToCart],
        totalPrice: tPrice,
        totalQuantity: tQuantity,
        inCart: [...state.inCart, inCartdata],
      };

    case REMOVE_CART_ITEM:
    
      // const RemovedItem = state.addedItems.find(
      //   (item) => item.id === action.payload
      // );

      let TotalQuantity = state.totalQuantity - 1;
      if (TotalQuantity < 0) {
        TotalQuantity = state.totalQuantity;
      }

      const removedIncart = state.inCart.filter((item) => {
        return item.id !== action.payload;
      });

      return {
        ...state,
        addedItems: removedIncart,
        inCart: removedIncart,
        totalQuantity: TotalQuantity,
      };

    case CLEAR_CART:
      return {
        ...initialState,
        addedItems: [],
        inCart: [],
      };
    
    default:
      return state;
  }
}
