import React from 'react';

export default props => (
  <div>
      Income: $<input type="number" value={props.income} onChange={e => props.changeIncome(e.target.value)} />
  </div>
);
