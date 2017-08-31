import React from 'react';

export default class TheChicken extends React.Component{
  constructor(props){
    super(props);
    let chicken = new Audio('./assets/thechickensong.mp3');
    // chicken.currentTime = 28;
    chicken.currentTime = 35;
    this.state = {
      chicken
    };
    // console.log(this.state.chicken.currentTime);

  }
  componentDidMount=()=>{
    this.state.chicken.play();
  }
  render(){
    return(
      <div style={{
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0',
        maxHeight: '1vh'
      }}>
        <img src="https://orig09.deviantart.net/c283/f/2014/021/5/2/chicken_caw_animation_by_captaintoog-d7338wq.gif" alt="a chicken"
        style={{
          width: '100%'
        }}/>
      </div>
    )
  }
}
