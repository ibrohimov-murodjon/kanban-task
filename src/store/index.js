import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("kanbanState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("kanbanState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
