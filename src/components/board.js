import React from 'react';
import { connect } from 'react-redux';

import List from './list';
import AddForm from './add-form';

import { addList, deleteList, fetchBoard } from '../actions';

import './board.css';

export class Board extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBoard());
  }

  addList(title) {
    this.props.dispatch(addList(title));
  }

  handleDelete(event) {
    if (window.confirm('Are you sure you want to delete this list?')) {
      const listId = parseInt(event.target.parentElement.parentElement.id, 10);
      this.props.dispatch(deleteList(listId));
    }
    console.log();
  }

  render() {
    const lists = this.props.lists.map((list, index) => (
      <li id={index} className="list-wrapper" key={index}>
        <List
          index={index}
          onClick={event => this.handleDelete(event)}
          {...list}
        />
      </li>
    ));

    return (
      <div className="board">
        <h2>{this.props.title}</h2>
        <ul className="lists">
          {lists}
          <li className="add-list-wrapper">
            <AddForm type="list" onAdd={title => this.addList(title)} />
          </li>
        </ul>
      </div>
    );
  }
}

Board.defaultProps = {
  title: 'Board'
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(Board);
