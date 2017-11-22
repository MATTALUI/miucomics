import React from 'react';
import ReactModal from 'react-modal';
import StockEditor from './StockEditor.js';
import '../styles/Shower.css';
import '../styles/Modal.css';

class IssueShower extends React.Component{
  constructor(props){

    super(props);
    let date = props.pub_date;
    if(date !== null){
      date = props.pub_date.split('T')[0];
    }else{
      date = "";
    }
    this.state={
      showInfo: false,
      editIssue: false,
      pub_date: {value:date, changed: false},
      number: {value:this.props.number, changed: false},
      cover_image: {
        value: null,
        changed: false,
        type: 'upload'
      },
    }
  }
  componentWillReceiveProps=(nextProps)=>{
    let date = nextProps.pub_date;
    if(date !== null){
      date = nextProps.pub_date.split('T')[0];
    }else{
      date = "";
    }
    this.setState({
      pub_date: {value:date, changed: false},
      number: {value:nextProps.number, changed: false},
      cover_image: {
        value: null,
        changed: false,
        type: 'upload'
      },
    })
  }
  toggleModal=()=>{
    this.resetEditor();
    this.setState({showInfo: !this.state.showInfo});
  }
  toggleEditing = ()=>{
    if(this.state.editIssue){
      this.resetEditor();
    }else{
      this.setState({editIssue: true});
    }
  }
  editDate = ()=>{
    this.setState({pub_date:{value: this.refs.pub_date.value, changed:true}});
  }
  editIssueNumber = ()=>{
    this.setState({number:{value:+this.refs.number.value,changed:true}});
  }
  toggleImageType = ()=>{
    let copy = Object.assign({},this.state.cover_image);
    if(copy.type === 'upload'){
      copy.type = 'url';
    }else{
      copy.type = 'upload';
    }
    copy.value = null;
    this.setState({cover_image:copy});
  }
  editCoverImage = ()=>{
    let value;
    if(this.refs.cover_image.files){
      value = this.refs.cover_image.files[0];
    }else{
      value = this.refs.cover_image.value;
    }
    let copy = Object.assign({},this.state.cover_image);
    copy.value = value;
    copy.changed = true;
    this.setState({cover_image: copy});
  }
  submitEditedIssue = (event)=>{
    event.preventDefault();
    let issueEdit = {};
    for (let key in this.state){
      if(typeof this.state[key] === 'object' && this.state[key].changed){
        issueEdit[key] = this.state[key].value
      }
    }
    if(JSON.stringify(issueEdit)==='{}'){
      this.resetEditor()
    }else{
      if(issueEdit.cover_image){
        issueEdit.cover_image = {
          value: this.state.cover_image.value,
          type: this.state.cover_image.type
        };
      }
      this.props.editIssue(this.props.id,issueEdit);
      this.resetEditor();

    }
  }
  resetEditor = ()=>{
    let date = this.props.pub_date;
    if(date !== null){
      date = this.props.pub_date.split('T')[0];
    }else{
      date = "";
    }
    this.setState({
      editIssue: false,
      pub_date: {value:date, changed: false},
      number: {value:this.props.number, changed: false},
      cover_image: {
        value: null,
        changed: false,
        type: 'upload'
      },
    });
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
            {!this.state.editIssue?
              (
              <div className="half">
                <div className="pure-g">
                <div className="pure-u-1">
                  <button className="pure-button button-error closer" onClick={this.toggleModal}>X</button>

                </div>
                  <StockEditor stock={this.props.stock} id={this.props.id}/>
                  {false?<div className="pure-u-1-2 App"><img alt="tracking on shopify" src="/assets/shopify-icon.png" className="shopify"/></div>:null}
                  <div className="pure-u-1 issueController">
                    <button className="pure-button pure-u-1-3 button-warning controllerButton" onClick={this.toggleEditing}>Edit Issue</button>
                    <button onClick={()=>{this.props.toggleShopify(this.props.id)}} className="pure-button pure-u-1-3 button-warning controllerButton">{this.props.shopify?'Stop Tracking':'Track'}</button>
                    <button className="pure-button pure-u-1-3 button-error controllerButton" onClick={()=>{this.props.deleteIssue(this.props.index)}}>Delete Issue</button>
                  </div>
                </div>
              </div>
            ):(
              <div className="half">
                <button className="pure-button button-error closer" onClick={this.toggleModal}>X</button>
                <div className="editFormContainer">
                  <form className="pure-form">

                    <legend>Edit Issue</legend>

                    <label htmlFor="number">Issue Number</label>
                    <input id="number" type="number" min = "1" placeholder="Issue Number" className="pure-u-1" ref="number" value={this.state.number.value} onChange={this.editIssueNumber}/><br/>


                    <label htmlFor="date">Publish Date</label><br/>
                    <input id="date" className="pure-u-1" type="date" ref="pub_date" placeholder="Publish Date" value={this.state.pub_date.value} onChange={this.editDate}/><br/>

                    {this.state.cover_image.type==='upload'?(
                      <div>
                      <label htmlFor="cover" className="pure-button pure-u-1 button-warning coverButton">{this.state.cover_image.value?this.state.cover_image.value.name:'ADD COVER'}</label>
                      <input id="cover" name="cover" type="file" ref="cover_image" placeholder="Cover" hidden={true} onChange={this.editCoverImage}/>
                      <p><a className="toggler" onClick={this.toggleImageType}>Or Upload Image Via URL</a></p>
                    </div>
                    ):(
                      <div>
                        <input ref="cover_image" name="cover" type="text" className="pure-u-1" placeholder="URL" onChange={this.editCoverImage}/>
                        <p><a className="toggler" onClick={this.toggleImageType}>Or Upload an Image</a></p>
                      </div>
                    )}
                    <br/>

                    <button className="pure-button pure-u-1-2 button-success" onClick={this.submitEditedIssue}>SAVE CHANGES</button>
                    <button className="pure-button pure-u-1-2 button-error" onClick={this.toggleEditing}>CANCEL</button>

                  </form>
                </div>
              </div>
            )}
          </div>
          </ReactModal>

        </div>

    )
  }
}

export default IssueShower;
