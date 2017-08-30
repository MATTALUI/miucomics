import React from 'react';
import '../styles/StockEditor.css';

class StockEditor extends React.Component{
  constructor(props){
    super(props);
    let stateHolder = {
      mint: 0,
      nearMint: 0,
      veryFine: 0,
      fine: 0,
      veryGood: 0,
      good: 0,
      fair: 0,
      poor: 0
    }
    console.log(this.props.stock);
    this.props.stock.forEach((stockObj)=>{
      stateHolder[this.camelize(stockObj.condition)] += stockObj.quantity;
    });
    console.log(stateHolder);
    this.state = stateHolder;
  }
  camelize(str){
	return str.split('').map((letter,index)=>{
		if (index===0) return letter.toLowerCase();
		if (letter===' ') return '';
		return letter
	}).join('');
}
  render(){
    return (
      <div className="pure-u-1">
        <h1>Stock</h1>
        <table className="pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Condition</th>
              <th></th>
              <th>Quantity</th>
              <th></th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            <tr className="pure-table-odd">
              <td>Mint</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.mint}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr>
              <td>Near Mint</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.nearMint}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr className="pure-table-odd">
              <td>Very Fine</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.veryFine}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr>
              <td>Fine</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.fine}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr className="pure-table-odd">
              <td>Very Good</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.veryGood}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr>
              <td>Good</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.good}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr className="pure-table-odd">
              <td>Fair</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.fair}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>

            <tr>
              <td>Poor</td>
              <td>
                <i className="fa fa-arrow-left leftArrow"/>
              </td>
              <td className="count">
                {this.state.poor}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default StockEditor;
