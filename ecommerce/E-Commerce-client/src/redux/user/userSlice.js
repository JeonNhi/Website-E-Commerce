/** @format */

import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./userAction";
export const usersSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    currentCart: [],
    isLoading: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
    },
    updateCart: (state, action) => {
      const { pid, quantity, sku } = action.payload;
      const currentCart = JSON.parse(JSON.stringify(state.currentCart));

      const newCart = currentCart.map((prod) => {
        if (prod.sku === sku && prod.quantity !== quantity) {
          return { ...prod, quantity };
        } else return prod;
      });
      state.currentCart = newCart;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.current = action.payload;
      state.currentCart = action.payload.cart;
      state.isLoading = false;
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
    });
  },
});
export const { login, logout, updateCart, setLoading } = usersSlice.actions;

export default usersSlice.reducer;
