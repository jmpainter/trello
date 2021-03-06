import * as actions from '../actions';

const initialState = {
  lists: []
};

export const trelloReducer = (state = initialState, action) => {
  if (action.type === actions.ADD_LIST) {
    return Object.assign({}, state, {
      lists: [
        ...state.lists,
        {
          title: action.title,
          cards: []
        }
      ]
    });
  } else if (action.type === actions.DELETE_LIST) {
    const newLists = state.lists.filter(
      (list, index) => index !== action.listIndex
    );
    return Object.assign({}, state, { lists: newLists });
  } else if (action.type === actions.ADD_CARD) {
    let lists = state.lists.map((list, index) => {
      if (index !== action.listIndex) {
        return list;
      }
      return Object.assign({}, list, {
        cards: [
          ...list.cards,
          {
            text: action.text
          }
        ]
      });
    });
    return Object.assign({}, state, {
      lists
    });
  } else if (action.type === actions.DELETE_CARD) {
    const lists = state.lists.map((list, index) => {
      if (index !== action.listIndex) {
        return list;
      }
      const newCards = list.cards.filter((card, index) => {
        return index !== action.cardIndex;
      });
      return Object.assign({}, list, { cards: newCards });
    });
    return Object.assign({}, state, {
      lists
    });
  } else if (action.type === actions.FETCH_BOARD_SUCCESS) {
    return Object.assign({}, state, action.board);
  }
  return state;
};
