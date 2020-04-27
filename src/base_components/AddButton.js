import React from 'react';

export default function AddButton(props) {
    return (
      <div className="button link"  onClick={props.onClick}>
          <span>add</span>
      </div>
    );
  }
  