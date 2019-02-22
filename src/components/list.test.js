import React from 'react';
import {shallow} from 'enzyme';

import {List} from './list';
import Card from './card';
import {addCard} from '../actions';

describe('<List />', () => {
    const seedCards = [];
    beforeAll(() => {
        for (let i=0; i<10; i++) {
            seedCards.push({
                text: `Card ${i}`
            })
        }
    });

    it('Renders without crashing', () => {
        shallow(<List title="Foo" cards={[]} />);
    });

    it('Renders the title', () => {
        const title = "Foo";
        const wrapper = shallow(<List title={title} cards={[]} />);
        expect(wrapper.contains(<h3>{title}</h3>)).toEqual(true);
    });

    it('Dispatches addCard from addCard', () => {
        const dispatch = jest.fn();
        const index = 2;
        const wrapper = shallow(
            <List cards={[]} index={index} dispatch={dispatch} />
        );
        const instance = wrapper.instance();
        const text = seedCards[0].text;
        instance.addCard(text);
        expect(dispatch).toHaveBeenCalledWith(addCard(text, index));
    });

    it('Renders the cards', () => {
        const wrapper = shallow(<List cards={seedCards} />);
        const cards = wrapper.find(Card);
        expect(cards.length).toEqual(seedCards.length);
        const firstCard = cards.first();
        expect(firstCard.prop('text')).toEqual(seedCards[0].text);
    });
});


