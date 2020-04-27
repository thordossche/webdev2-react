import React from 'react';

export default function DeleteButton(props) {
    return (
      <div className="button" onClick={props.onClick}>
          <span>delete</span>
      </div>
    );
  }
  