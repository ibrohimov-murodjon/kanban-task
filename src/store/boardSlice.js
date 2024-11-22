import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    { id: "list-1", title: "Planned Tasks", cards: [] },
    { id: "list-2", title: "Work In Progress", cards: [] },
    { id: "list-3", title: "Completed", cards: [] },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { listId, card } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.cards.push(card);
      }
    },
    moveCard: (state, action) => {
      const { fromListId, toListId, fromIndex, toIndex } = action.payload;
      const sourceList = state.lists.find((list) => list.id === fromListId);
      const destinationList = state.lists.find((list) => list.id === toListId);

      if (sourceList && destinationList) {
        const [movedCard] = sourceList.cards.splice(fromIndex, 1);
        destinationList.cards.splice(toIndex, 0, movedCard);
      }
    },
    updateCard: (state, action) => {
      const { listId, cardId, updates } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const card = list.cards.find((card) => card.id === cardId);
        if (card) {
          Object.assign(card, updates);
        }
      }
    },
    deleteCard: (state, action) => {
      const { listId, cardId } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.cards = list.cards.filter((card) => card.id !== cardId);
      }
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    updateListTitle: (state, action) => {
      const { listId, title } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.title = title;
      }
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      state.lists = state.lists.filter((list) => list.id !== listId);
    },
  },
});

export const {
  addCard,
  moveCard,
  updateCard,
  deleteCard,
  addList,
  updateListTitle,
  deleteList,
} = boardSlice.actions;

export default boardSlice.reducer;
