import React, { Component } from 'react';

import IncomeForm from './components/IncomeForm';
import BracketForm from './components/BracketForm';

import utilities from './utilities';

class App extends Component {
  constructor() {
    super();
    this.counter = 0;
    this.state = {
      income: 0,
      brackets: [],
    };
    this.changeIncome = this.changeIncome.bind(this);
    this.submitBracket = this.submitBracket.bind(this);
    this.deleteBracket = this.deleteBracket.bind(this);
  }

  changeIncome(amount) {
    this.setState({
      income: parseInt(amount, 10),
    });
  }

  calculate(amount) {
    const taxed = [];
    let income = parseFloat(amount).toFixed(2),
        taxedTotal = 0,
        percentTotal = 0,
        takeHome = 0;
    this.state.brackets.forEach((bracket, i) => {
      if (amount > bracket.number && this.state.brackets[i + 1]) {
        if (amount > this.state.brackets[i + 1].number) {
          taxed.push(parseFloat(((this.state.brackets[i + 1].number - bracket.number) * (bracket.tax / 100)).toFixed(2)));
        } else {
          taxed.push(parseFloat(((amount - bracket.number) * (bracket.tax / 100)).toFixed(2)));
        }
      } else if (amount > bracket.number && !this.state.brackets[i + 1]) {
        taxed.push(parseFloat(((amount - bracket.number) * (bracket.tax / 100)).toFixed(2)));
      }
      taxedTotal = (taxed.reduce((a, b) => a + b, 0)).toFixed(2);
      percentTotal = ((taxed.reduce((a, b) => a + b, 0) / amount) * 100).toFixed(2);
      takeHome = (amount - taxed.reduce((a, b) => a + b, 0).toFixed(2));
    });
    return (
      <div className='container'>
        <p>Income: ${isNaN(income) ? 0 : utilities.numberWithCommas(income)}</p>
        <p>Taxed: ${taxedTotal ? utilities.numberWithCommas(taxedTotal) : 0}</p>
        <p>Total percentage taxed: {isNaN(income) ? 0 : utilities.numberWithCommas(percentTotal)}%</p>
        <p>Take-home: ${utilities.numberWithCommas(takeHome)}</p>
      </div>
    );
  }

  submitBracket(e) {
    this.counter++;
    this.setState({
      brackets: [...this.state.brackets, { number: parseInt(e.target.number.value, 10), tax: parseInt(e.target.tax.value, 10), key: this.counter }],
    });
  }

  deleteBracket(key) {
    this.setState({
      brackets: this.state.brackets.filter(bracket => bracket.key !== key),
    });
  }

  render() {
    return (
      <div className="App">
        <div id="background">
          <div id="window">
            Write your own tax brackets and enter an income below! See what happens!
            <BracketForm brackets={this.state.brackets} submitBracket={this.submitBracket} deleteBracket={this.deleteBracket} />
            <IncomeForm income={this.state.income} changeIncome={this.changeIncome} />
            {this.calculate(this.state.income)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
