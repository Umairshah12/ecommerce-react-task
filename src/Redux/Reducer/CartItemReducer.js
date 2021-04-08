import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  FETCH_PRODUCT_SUCCESS,
  ADD_NEW_ITEMS,
} from "../Action/CartAction";

const initialState = {
  products: [],
  addedItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  inCart: [],
};

export function CartItemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case ADD_NEW_ITEMS:
      return {
        ...state,
        products: [...state.products, action.payload],
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

      localStorage.setItem(
        "addData",
        JSON.stringify([...state.addedItems, addedToCart])
      );

      localStorage.setItem(
        "IncartData",
        JSON.stringify([...state.inCart, inCartdata])
      );

      const cartData = localStorage.getItem("addData");
      let res = cartData && JSON.parse(cartData);
      let allPrice = res.reduce((prev, current) => prev + +current.price, 0);

      localStorage.setItem("totalQuantity", JSON.stringify(tQuantity));
      localStorage.setItem("totalPrice", JSON.stringify(allPrice));

      return {
        ...state,
        addedItems: [...state.addedItems, addedToCart],
        totalPrice: tPrice,
        totalQuantity: tQuantity,
        inCart: [...state.inCart, inCartdata],
      };

    case REMOVE_CART_ITEM:
      const RemovedItem = state.addedItems.find(
        (item) => item.id === action.payload
      );

      let TotalQuantity = state.totalQuantity - 1;
      if (TotalQuantity < 0) {
        TotalQuantity = state.totalQuantity;
      }

      let InCartItems = JSON.parse(localStorage.getItem("IncartData"));
      InCartItems = InCartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("IncartData", JSON.stringify(InCartItems));
      if (InCartItems.length === 0) {
        localStorage.removeItem("IncartData");
      }

      let items = JSON.parse(localStorage.getItem("addData"));
      items = items.filter((item) => item.id !== action.payload);
      localStorage.setItem("addData", JSON.stringify(items));
      if (items.length === 0) {
        localStorage.removeItem("addData");
      }

      localStorage.setItem("totalQuantity", JSON.stringify(TotalQuantity));
      if (TotalQuantity === 0) {
        localStorage.removeItem("totalQuantity");
      }

      let resPrice = items.reduce((prev, current) => prev - -current.price, 0);
      localStorage.setItem("totalPrice", JSON.stringify(resPrice));
      if (resPrice === 0) {
        localStorage.removeItem("totalPrice");
      }

      const removedIncart = state.inCart.filter((item) => {
        return item.id !== action.payload;
      });

      return {
        ...state,
        addedItems: removedIncart,
        products: RemovedItem,
        inCart: removedIncart,
        totalQuantity: TotalQuantity,
      };

    case CLEAR_CART:
      localStorage.removeItem("addData");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("totalQuantity");
      localStorage.removeItem("IncartData");
      return {
        ...initialState,
        addedItems: [],
        inCart: [],
      };

    default:
      return state;
  }
}
