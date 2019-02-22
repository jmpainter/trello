import React from 'react';

import './card.css';

export default function Card(props) {
  return (
    <div className="card">
      {props.text}{' '}
      <button onClick={event => props.onClick(event)}>Delete</button>
    </div>
  );
}

Card.defaultProps = {
  text: ''
};
