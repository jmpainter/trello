export const ADD_LIST = 'ADD_LIST';
export const addList = title => ({
  type: ADD_LIST,
  title
});

export const DELETE_LIST = 'DELETE_LIST';
export const deleteList = listIndex => ({
  type: DELETE_LIST,
  listIndex
});

export const ADD_CARD = 'ADD_CARD';
export const addCard = (text, listIndex) => ({
  type: ADD_CARD,
  text,
  listIndex
});

export const DELETE_CARD = 'DELETE_CARD';
export const deleteCard = (listIndex, cardIndex) => ({
  type: DELETE_CARD,
  listIndex,
  cardIndex
});

export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const fetchBoardSuccess = board => ({
  type: FETCH_BOARD_SUCCESS,
  board
});

export const fetchBoard = () => dispatch => {
  return fetch('/board')
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(board => {
      dispatch(fetchBoardSuccess(board));
    });
};
