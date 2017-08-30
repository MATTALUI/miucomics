import React from 'react';
export default class StockForm extends React.Component{

  sendInfo=()=>{
    let stockInfo = {
      quantity: Number(this.refs.quantity.value)||0,
      condition: this.refs.quality.value,
      price: Number(this.refs.price.value)
    }
    this.props.manager(stockInfo,this.props.index);
  }
  render(){
    return(
        <div className="pure-form pure-u-1" onChange={this.sendInfo}>
          <div className="pure-u-2-24"></div>
          <input type="number" placeholder="#" className="pure-u-2-24" ref="quantity"/>
          <select style={{marginTop:'1em'}} className="pure-u-1-5" ref="quality">
            <option value="Mint">Mint</option>
            <option value="Near Mint">Near Mint</option>
            <option value="Very Fine">Very Fine</option>
            <option value="Fine">Fine</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <input type="number" ref="price" step ="0.01"/>
        </div>
    )
  }
}
