import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  FETCH_PRODUCT_SUCCESS,
  ADD_NEW_ITEMS,
  ERRORS,
  DECREMENT_ITEMS,
  INCREMENT_ITEMS
  // FETCH_USER_REQUEST
} from "../Action/CartAction";

const initialState = {
  products: [],
  addedItems: [],
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
        productss: [...state.products,action.payload]
          
      };

    case ADD_TO_CART:
      let addedToCart = state.products.find(
        (item) => item.id === action.payload
      );

      let inCartdata = state.products.find(
        (item) => item.id === action.payload
      );

      if (addedToCart) {
        let tQuantity = 1;
        addedToCart.tQuantity = tQuantity;
        return {
          ...state,
          addedItems: [...state.addedItems, addedToCart],
          inCart: [...state.inCart, inCartdata],
        }
      }
      else {
        return {
          ...state,
          addedItems: [...state.addedItems, addedToCart],
        };
      }
     
    case INCREMENT_ITEMS:
    state.addedItems[state.addedItems.findIndex(item => item.id === action.payload)].tQuantity++;
      return {
          ...state,
          addedItems: [...state.addedItems]
      }
    
    case DECREMENT_ITEMS:
    state.addedItems[state.addedItems.findIndex(item => item.id === action.payload)].tQuantity--;
      return {
          ...state,
          addedItems: [...state.addedItems]
      }

    case REMOVE_CART_ITEM:
      const removedIncart = state.inCart.filter((item) => {
        return item.id !== action.payload;
      });

      const removedAddedItems = state.addedItems.filter((item) => {
        return item.id !== action.payload;
      });

      return {
        ...state,
        addedItems: removedAddedItems,
        inCart: removedIncart,
      };

    case CLEAR_CART:
      return {
        addedItems: [],
        inCart: [],
      };
    
    default:
      return state;
  }
}
