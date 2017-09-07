import React from 'react';
import StockForm from './StockForm.js';

export default class NewIssue extends React.Component{
  constructor(props){
    super(props);
    if(window.location.host.indexOf('herokuapp')>-1){
      this.host = 'http://miucomics-api.herokuapp.com';
    }else{
      this.host = 'http://localhost:8000'
    }
    this.state ={
      number: 0,
      pub_date: null,
      cover_image: null,
      total: 0,
      accounted_for: [],
      ebay: false,
      shopify: false
    }
  }

  submit = async (event)=>{
    event.preventDefault();
    if(this.validate()){
      let issue = new FormData();
      issue.append('series_id', Number(this.props.seriesId));
      issue.append('series_title', this.props.seriesTitle);
      issue.append('number', Number(this.state.number));
      issue.append('ebay', this.state.ebay);
      issue.append('shopify', this.state.shopify);
      if (this.state.pub_date !== ''){
        issue.append('pub_date', this.state.pub_date);
      }
      if(this.state.cover_image !== undefined){
        issue.append('cover_image', this.state.cover_image);
      }
      let call = await fetch(`${this.host}/comics/issues`, {
        method: "POST",
        body: issue
      });
      let newIssueInfo = await call.json()
      let stock = await this.submitStockInfo(newIssueInfo.id);
      newIssueInfo.stock = stock;
      this.props.newIssueHandler(newIssueInfo);
    }
  }
  cancel = async (event)=>{
    event.preventDefault()
    this.props.cancel();
  }

  submitStockInfo= async(issueId)=>{
    let stockObject = {
      issueId,
      stockInfo: this.state.accounted_for
    }
    let call = await fetch(`${this.host}/comics/stock`, {
      method: "POST",
      body: JSON.stringify(stockObject),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let newStockInfo = await call.json();
    return newStockInfo;
  }
  updateForm = ()=>{
    this.setState({
      number: Number(this.refs.number.value),
      pub_date: this.refs.pub_date.value,
      cover_image: this.refs.cover_image.files[0],
      ebay: this.refs.ebay.checked,
      shopify: this.refs.shopify.checked,
      total: Number(this.refs.total.value)
    });
    this.generateStockForm(Number(this.refs.total.value));
  }
  validate = ()=>{
    let infoValid = (this.state.number === 0 || this.state.total===0)?false:true;
    let counter = 0;
    this.state.accounted_for.forEach((field)=>{
      counter+=field.quantity;
    });
    let allStockFormsFilled = true;
    if(this.state.accounted_for.length >0){
      allStockFormsFilled = !this.state.accounted_for.map((form)=>{return (form.quantity > 0 && form.price > 0);}).some((check)=>check===false);
    }
    return (infoValid && (counter === this.state.total) && allStockFormsFilled);
  }
  generateStockForm = ()=>{
    if(this.state.total<1){
      return [];
    }else{
      let count = 0;
      let currentForm = this.state.accounted_for.map((form,i)=>{
        return <StockForm key={i} quantity={form.quantity} quality={form.quality} price={form.price} index={i} manager={this.stockFormHandler}/>
      })
      for(let i = 0; i<this.state.accounted_for.length;i++){
        count += this.state.accounted_for[i].quantity;
      }
      if (count>=this.state.total){
        return currentForm;
      }else{
        return currentForm.concat([<StockForm key={this.state.accounted_for.length} index={this.state.accounted_for.length} quantity={0} quality={'Mint'} price={0.00} manager={this.stockFormHandler}/>]);
      }
    }
  }
  stockFormHandler= (stockInfo, index)=>{
    let copy = this.state.accounted_for.slice();
    copy[index] = stockInfo;
    this.setState({accounted_for: copy});
  }

  render(){
    let stockInfoForm = this.generateStockForm();
    let accountedStock = 0;
    this.state.accounted_for.forEach((stockForm)=>{accountedStock+=stockForm.quantity});
    return (

      <div className="pure-g App newForm issue">
        <form className="pure-form pure-u-1" onChange={this.updateForm}   onSubmit={this.submit}>
          <input type="number" min = "1" placeholder="Issue Number" className="pure-u-1-2" ref="number" /><br/>

          <input className="pure-u-1-2" type="date" ref="pub_date" placeholder="Publish Date" /><br/>

          <label htmlFor="cover" className="pure-button pure-u-1-2 button-warning coverButton">ADD COVER</label>
          <input id="cover" name="cover" type="file" ref="cover_image" placeholder="Cover" hidden={true}/><br/>

          <input type="number" min="0" ref="total" placeholder="TotalStock" className = "pure-u-1-2" /><br/>
          {}
          {stockInfoForm}
          {accountedStock===this.state.total?null:<p style ={{color:'red'}}>Condition quanities must match total amount of stock</p>}

          <input type="checkbox" ref="ebay" placeholder="ebay" hidden={true}/>
          <input type="checkbox" ref="shopify" placeholder="shopify"/>Display on shopify<br/>

          <button className="pure-button pure-u-1-4 button-error cancel"  onClick={this.cancel}>CANCEL</button>
          <button type="submit" className="pure-button pure-u-1-4 button-success submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}
