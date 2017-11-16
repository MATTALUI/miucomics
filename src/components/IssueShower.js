import React from 'react';
// import {Link} from 'react-router-dom';
import ReactModal from 'react-modal';
import StockEditor from './StockEditor.js';
import '../styles/Shower.css';
import '../styles/Modal.css';

class IssueShower extends React.Component{
  constructor(props){
    super(props);
    this.state={
      showInfo: false
    }
  }
  toggleModal=()=>{
    this.setState({showInfo: !this.state.showInfo});
  }
  render(){
    let totalStock = 0;
    this.props.stock.forEach((stockObj)=>{
      totalStock += stockObj.quantity;
    });
    return (
        <div className={`pure-u-1-2 pure-u-md-1-3 seriesCard `} onClick={this.toggleModal}>
          <div className={`seriesContent ${totalStock>0?'':'allOut'}`}>
            <br/>
            <div className="coverHolder">
            {totalStock?null:<img src="http://yourbreastmilk.com/wp-content/uploads/2017/05/out-of-stock.png" className="oos" alt="out of stock"/>}
              <img src ={this.props.cover} alt={`cover art for volume ${this.props.title}`} className="seriesCover"/>
            </div>
            <h3>{`#${this.props.number}`}</h3>
          </div>







          <ReactModal isOpen={this.state.showInfo}
          contentLabel={`information for ${this.props.series} #${this.props.number}`} >
          <div className="modalContainer">
            <div className="half bg-black">
              <div className="coverHolderModal">
                <img src={this.props.cover} className="modalCover" alt={`cover for ${this.props.series} #${this.props.number}`}/>
              </div>
              <h1>{`${this.props.series}\nIssue #${this.props.number}`}</h1>
            </div>
            <div className="half">
              <div className="pure-g">
              <div className="pure-u-1">
                <button className="pure-button button-error closer" onClick={this.toggleModal}>Close</button>

              </div>
                <StockEditor stock={this.props.stock} id={this.props.id}/>
                {false?<div className="pure-u-1-2 App"><img alt="tracking on shopify" src="/assets/shopify-icon.png" className="shopify"/></div>:null}
                <div className="pure-u-1 issueController">
                  <button className="pure-button pure-u-1-3 button-warning controllerButton">Edit Issue</button>
                  <button className="pure-button pure-u-1-3 button-warning controllerButton">Shopify</button>
                  <button className="pure-button pure-u-1-3 button-error controllerButton" onClick={()=>{this.props.deleteIssue(this.props.index)}}>Delete Issue</button>
                </div>
              </div>
            </div>
          </div>
          </ReactModal>
        </div>

    )
  }
}

export default IssueShower;
