import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    tax:8
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },

    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
increase:(state,action)=>{
  const findCartItem = state.cartItems.find(
    (item) => item._id === action.payload._id
  );
  findCartItem.quantity = findCartItem.quantity + 1;
  state.total += action.payload.price;
},
decrease:(state,action)=>{
  const findCartItem = state.cartItems.find(
    (item) => item._id === action.payload._id
  );
  if(findCartItem.quantity>1){
    findCartItem.quantity = findCartItem.quantity - 1;
    state.total -= action.payload.price;
  }
  },
  },
});

export const { addProduct, deleteCart,increase,decrease } = cartSlice.actions;
export default cartSlice.reducer;
