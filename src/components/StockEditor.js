import React from 'react';
import '../styles/StockEditor.css';

class StockEditor extends React.Component{
  constructor(props){
    super(props);
    if(process.env.NODE_ENV === 'production'){
      this.host = 'http://miucomics.herokuapp.com/';
    }else{
      this.host = 'http://localhost:8000'
    }
    let stateHolder = {
      mint: {
        quantity: 0,
        price: 0
      },
      nearMint: {
        quantity: 0,
        price: 0
      },
      veryFine: {
        quantity: 0,
        price: 0
      },
      fine: {
        quantity: 0,
        price: 0
      },
      veryGood: {
        quantity: 0,
        price: 0
      },
      good: {
        quantity: 0,
        price: 0
      },
      fair: {
        quantity: 0,
        price: 0
      },
      poor: {
        quantity: 0,
        price: 0
      }
    }
    this.props.stock.forEach((stockObj)=>{
      stateHolder[this.camelize(stockObj.condition)].quantity += stockObj.quantity;
      stateHolder[this.camelize(stockObj.condition)].price += stockObj.price;
    });
    this.state = stateHolder;
  }
  camelize(str){
  	return str.split('').map((letter,index)=>{
  		if (index===0) return letter.toLowerCase();
  		if (letter===' ') return '';
  		return letter
  	}).join('');
  }
  decrementCount= async (condition)=>{
    let camelized = this.camelize(condition);
    if(this.state[camelized].quantity === 0) return;
    let message = {condition: condition};
    fetch(`${this.host}/comics/stock/${this.props.id}`, {
      method: "DELETE",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let copy = Object.assign(this.state[camelized], {});
    copy.quantity--;
    this.setState({[camelized]: copy});
    let relevant = this.props.stock.find((stockObj)=>{ return stockObj.condition===condition});
    relevant.quantity--;
  }
  incrementCount= async (condition)=>{
    let camelized = this.camelize(condition);
    let message = {condition: condition};
    fetch(`${this.host}/comics/stock/${this.props.id}`, {
      method: "PUT",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let copy = Object.assign(this.state[camelized], {});
    copy.quantity++;
    this.setState({[camelized]: copy});
    let relevant = this.props.stock.find((stockObj)=>{ return stockObj.condition===condition});
    relevant.quantity++;

  }
  adjustPrice = async (condition)=>{
    let newPrice = Number(this.refs[`${this.camelize(condition)}Price`].value);
    let message = {price: newPrice, condition: condition};
    fetch(`${this.host}/comics/stock/${this.props.id}`, {
      method: "PATCH",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let relevant = this.props.stock.find(stockObj=>stockObj.condition===condition);
    relevant.price = newPrice;
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
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Mint')}}/>
              </td>
              <td className="count">
                {this.state.mint.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Mint')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.mint.price} className="priceEdit" ref="mintPrice"onChange={()=>{this.adjustPrice('Mint')}}/>
              </td>
            </tr>



            <tr>
              <td>Near Mint</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Near Mint')}}/>
              </td>
              <td className="count">
                {this.state.nearMint.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Near Mint')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.nearMint.price} className="priceEdit" ref="nearMintPrice"onChange={()=>{this.adjustPrice('Near Mint')}}/>
              </td>
            </tr>



            <tr className="pure-table-odd">
              <td>Very Fine</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Very Fine')}}/>
              </td>
              <td className="count">
                {this.state.veryFine.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Very Fine')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.veryFine.price} className="priceEdit" ref="veryFinePrice"onChange={()=>{this.adjustPrice('Very Fine')}}/>
              </td>
            </tr>



            <tr>
              <td>Fine</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Fine')}}/>
              </td>
              <td className="count">
                {this.state.fine.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Fine')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.fine.price} className="priceEdit" ref="finePrice"onChange={()=>{this.adjustPrice('Fine')}}/>
              </td>
            </tr>



            <tr className="pure-table-odd">
              <td>Very Good</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Very Good')}}/>
              </td>
              <td className="count">
                {this.state.veryGood.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Very Good')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.veryGood.price} className="priceEdit" ref="veryGoodPrice"onChange={()=>{this.adjustPrice('Very Good')}}/>
              </td>
            </tr>

            <tr>
              <td>Good</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Good')}}/>
              </td>
              <td className="count">
                {this.state.good.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Good')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.good.price} className="priceEdit" ref="goodPrice"onChange={()=>{this.adjustPrice('Good')}}/>
              </td>
            </tr>



            <tr className="pure-table-odd">
              <td>Fair</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Fair')}}/>
              </td>
              <td className="count">
                {this.state.fair.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Fair')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.fair.price} className="priceEdit" ref="fairPrice"onChange={()=>{this.adjustPrice('Fair')}}/>
              </td>
            </tr>



            <tr>
              <td>Poor</td>
              <td>
                <i className="fa fa-arrow-left leftArrow" onClick={()=>{this.decrementCount('Poor')}}/>
              </td>
              <td className="count">
                {this.state.poor.quantity}
              </td>
              <td>
                <i className="fa fa-arrow-right rightArrow" onClick={()=>{this.incrementCount('Poor')}}/>
              </td>
              <td>
                <input type="number" min="0" defaultValue={this.state.poor.price} className="priceEdit" ref="poorPrice"onChange={()=>{this.adjustPrice('Poor')}}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default StockEditor;
