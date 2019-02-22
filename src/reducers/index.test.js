import {trelloReducer} from './index';
import {addList, addCard, fetchBoardSuccess} from '../actions';

describe('trelloReducer', () => {
    // Set up some dummy data
    const list1Title = 'List 1 test';
    const list2Title = 'List 2 test';
    const card1Text = 'Card 1 test';
    const card2Text = 'Card 2 test';
    const card3Text = 'Card 3 test';
    const list1 = {
        title: list1Title,
        cards: []
    };
    const list2 = {
        title: list2Title,
        cards: []
    };
    const card1 = {text: card1Text};
    const card2 = {text: card2Text};
    const card3 = {text: card3Text};


    it('Should set the initial state when nothing is passed in', () => {
        const state = trelloReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            lists: []
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = trelloReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    describe('addList', () => {
        it('Should add new lists', () => {
            let state;
            state = trelloReducer(state, addList(list1Title));
            state = trelloReducer(state, addList(list2Title));
            expect(state).toEqual({
                lists: [list1, list2]
            });
        });
    });


    describe('addCard', () => {
        it('Should add new cards', () => {
            let state = {
                lists: [list1, list2]
            };
            state = trelloReducer(state, addCard(card1Text, 0));
            state = trelloReducer(state, addCard(card2Text, 1));
            state = trelloReducer(state, addCard(card3Text, 1));
            expect(state).toEqual({
                lists: [{
                    title: list1Title,
                    cards: [card1]
                }, {
                    title: list2Title,
                    cards: [card2, card3]
                }]
            });
        });
    });

    describe('fetchBoardSuccess', () => {
        it('Should replace the entire state', () => {
            const board = {
                lists: [list1, list2]
            };
            const state = trelloReducer(undefined, fetchBoardSuccess(board));
            expect(state).toEqual(board);
        });
    });
});
