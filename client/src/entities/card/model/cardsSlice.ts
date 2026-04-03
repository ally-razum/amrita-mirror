import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mockCards } from "../../card/model/mockCards";
import type { Card } from "./types";

const storageKey = "cards";

const loadFromStorage = (): Card[] => {
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : mockCards;
};

const saveToStorage = (cards: Card[]) => {
  localStorage.setItem(storageKey, JSON.stringify(cards));
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: loadFromStorage(),
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.push(action.payload);
      saveToStorage(state);
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      const updated = state.filter((c) => c.id !== action.payload);
      saveToStorage(updated);
      return updated;
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveToStorage(state);
      }
    },
  },
});

export const { addCard, deleteCard, updateCard } = cardsSlice.actions;
export default cardsSlice.reducer;
