import {
  ADD_LIST,
  addList,
  ADD_CARD,
  addCard,
  FETCH_BOARD_SUCCESS,
  fetchBoardSuccess,
  fetchBoard
} from './index';

describe('addList', () => {
  it('Should return the action', () => {
      const title = 'List title';
      const action = addList(title);
      expect(action.type).toEqual(ADD_LIST);
      expect(action.title).toEqual(title);
  });
});

describe('addCard', () => {
  it('Should return the action', () => {
      const text = 'Card text';
      const listIndex = 10;
      const action = addCard(text, listIndex);
      expect(action.type).toEqual(ADD_CARD);
      expect(action.text).toEqual(text);
      expect(action.listIndex).toEqual(listIndex);
  });
});

describe('fetchBoardSuccess', () => {
  it('Should return the action', () => {
      const board = {
          lists: []
      };
      const action = fetchBoardSuccess(board);
      expect(action.type).toEqual(FETCH_BOARD_SUCCESS);
      expect(action.board).toEqual(board);
  });
});

describe('fetchBoard', () => {
  it('Should dispatch fetchBoardSuccess', () => {
      const board = {
          lists: []
      };

      global.fetch = jest.fn().mockImplementation(() =>
          Promise.resolve({
              ok: true,
              json() {
                  return board;
              }
          })
      );

      const dispatch = jest.fn();
      return fetchBoard()(dispatch).then(() => {
          expect(fetch).toHaveBeenCalledWith('/board');
          expect(dispatch).toHaveBeenCalledWith(fetchBoardSuccess(board));
      });
  });
});
