import React from 'react';

export default function UpdateButton(props) {
    return (
      <div className="button"  onClick={props.onClick}>
          <span>update</span>
      </div>
    );
  }
  