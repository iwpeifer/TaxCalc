import React from 'react';

import utilities from '../utilities';

export default (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.submitBracket(e);
  };

  const displayBrackets = () => {
    props.brackets.sort((a, b) => a.number - b.number);
    return (
      <div className='container'>
      Tax Brackets:
        {props.brackets.map(bracket => (
          <div key={bracket.key}>
            Income above ${utilities.numberWithCommas(bracket.number)} to be taxed at {bracket.tax}%
            <button onClick={() => props.deleteBracket(bracket.key)}>Delete</button>
          </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <div>
        {displayBrackets()}
      </div>
      <div className='container'>
        Create a new Tax Bracket:
        <form onSubmit={e => submitHandler(e)}>
          Income above: $<input type="number" name="number" />
          to be taxed at: <input type="number" name="tax" max="100" />%
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
