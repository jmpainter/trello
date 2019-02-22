import React from 'react';
import { connect } from 'react-redux';

import Card from './card';
import AddForm from './add-form';

import { addCard, deleteCard } from '../actions';

export class List extends React.Component {
  addCard(text) {
    this.props.dispatch(addCard(text, this.props.index));
  }

  handleDelete(event) {
    if (window.confirm('Are you sure you want to delete this card?')) {
      const cardIndex = parseInt(
        event.target.parentElement.parentElement.id,
        10
      );
      console.log('delete');
      this.props.dispatch(deleteCard(this.props.index, cardIndex));
    }
  }

  render() {
    const cards = this.props.cards.map((card, index) => (
      <li id={index} key={index}>
        <Card {...card} onClick={event => this.handleDelete(event)} />
      </li>
    ));
    return (
      <div>
        <h3>{this.props.title}</h3>
        <button onClick={event => this.props.onClick(event)}>Delete</button>
        <ul className="list">
          {cards}
          <li>
            <AddForm type="card" onAdd={text => this.addCard(text)} />
          </li>
        </ul>
      </div>
    );
  }
}

List.defaultProps = {
  title: ''
};

export default connect()(List);
