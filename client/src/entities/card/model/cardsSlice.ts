import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mockCards } from "../../card/model/mockCards";
import type { Card } from "./types";

const storageKey = "cards";

const loadFromStorage = (): Card[] => {
  const stored = localStorage.getItem(storageKey);
  // пробуем достать данные из localStorage по ключу "cards"
  // если есть парсим из JSON строки в массив
  // если нет  mockCards
  return stored ? JSON.parse(stored) : mockCards;
};

const saveToStorage = (cards: Card[]) => {
  localStorage.setItem(storageKey, JSON.stringify(cards));
};

const cardsSlice = createSlice({
  //создаем слайс (часть стора)
  name: "cards", // имя slice — используется внутри RTK для экшенов (cards/addCard, cards/deleteCard)
  initialState: loadFromStorage(), // начальное состояние читаем из localStorage или  mockCards
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      // PayloadAction тип для экшена, говорит что внутри action.payload
      state.push(action.payload);
      // action.payload — это карточка которую передали в dispatch(addCard(карточка))
      // push прямо в state — можно так делать благодаря RTK (внутри используется immer)
      // сразу сохраняем в localStorage
      saveToStorage(state);
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      const updated = state.filter((c) => c.id !== action.payload);
      saveToStorage(updated);
      return updated;
    },
  },
});

export const { addCard, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;
