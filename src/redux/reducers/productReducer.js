import { ActionTypes } from "../constants/action-types";

export const productReducer = (state = [], { type, payload }) => {
 switch (type) {
  case ActionTypes.SET_PRODUCTS:
   return [...payload];
  default:
   return state;
 }
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
 switch (type) {
  case ActionTypes.SELECTED_PRODUCT:
   return { ...state, ...payload };
  case ActionTypes.CLEAR_SELECTED_PRODUCTS:
   return {};
  default:
   return state;
 }
};
