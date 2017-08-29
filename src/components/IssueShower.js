import React from 'react';
// import {Link} from 'react-router-dom';
import ReactModal from 'react-modal';
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
    return (

        <div className="pure-u-1-2 pure-u-md-1-3 seriesCard" onClick={this.toggleModal}>
          <div className="seriesContent">
            <br/>
            <div className="coverHolder">
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
              {this.props.stock.map((stockObj,i)=>{
                return <p key ={i} className="pure-u-1">{stockObj.condition}</p>
              })}
                <button className="pure-button button-error" onClick={this.toggleModal}>Close</button>
              </div>
            </div>
          </div>
          </ReactModal>
        </div>

    )
  }
}

export default IssueShower;
