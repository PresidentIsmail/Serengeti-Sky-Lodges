"use client";

// CabinsContext.js
import { createContext, useContext, useState, useReducer } from "react";

// Create the CabinsContext
const CabinsFormContext = createContext();

// Initial state for the reducer
const initialState = {
  showUpdateCabinForm: false,
  showInsertCabinForm: false,
  cabins: [],
};

// Reducer to handle state
const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_UPDATE_CABIN_FORM":
      return {
        ...state,
        showUpdateCabinForm: true,
        showInsertCabinForm: false,
      };
    case "HIDE_UPDATE_CABIN_FORM":
      return {
        ...state,
        showUpdateCabinForm: false,
        showInsertCabinForm: false,
      };
    case "SHOW_INSERT_CABIN_FORM":
      return {
        ...state,
        showInsertCabinForm: true,
        showUpdateCabinForm: false,
      };
    case "HIDE_INSERT_CABIN_FORM":
      return {
        ...state,
        showInsertCabinForm: false,
        showUpdateCabinForm: false,
      };
    case "SET_CABINS":
      return {
        ...state,
        cabins: action.payload,
      };
    default:
      return state;
  }
};

// CabinsContextProvider component
export const CabinsFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructuring the state object
  const { showInsertCabinForm, showUpdateCabinForm, cabins } = state;

  // dispatch function to toggle the display of insert cabin form
  const toggleInsertCabinForm = () => {
    dispatch({
      type: state.showInsertCabinForm
        ? "HIDE_INSERT_CABIN_FORM"
        : "SHOW_INSERT_CABIN_FORM",
    });
  };

  // dispatch function to toggle the display of update cabin form
  const toggleUpdateCabinForm = () => {
    dispatch({
      type: state.showUpdateCabinForm
        ? "HIDE_UPDATE_CABIN_FORM"
        : "SHOW_UPDATE_CABIN_FORM",
    });
  };

  // dispatch function to set the cabins data
  const setCabins = (cabins) => {
    dispatch({
      type: "SET_CABINS",
      payload: cabins,
    });
  };

  return (
    <CabinsFormContext.Provider
      value={{
        showInsertCabinForm,
        showUpdateCabinForm,
        toggleInsertCabinForm,
        toggleUpdateCabinForm,
        setCabins,
        cabins,
      }}
    >
      {children}
    </CabinsFormContext.Provider>
  );
};

// Custom hook to use the CabinsContext
export const useCabinsFormContext = () => {
  return useContext(CabinsFormContext);
};
