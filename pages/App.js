import React, { Component } from 'react';
import styled from 'styled-components';

import List from '../components/List';
import Character from '../components/Character';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Button from '../components/Button';
import Outro from '../components/Outro';

import Strings from '../utils/i18n';
const LS = window.localStorage;

function randomRotation(el){
  el.rotation = Math.random()*60;
  return el;
}

const AppMain = styled.section`
max-height: 100vh;
${ ({isOpen}) => isOpen && `overflow: hidden;`}
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: LS.getItem("charList") ? JSON.parse(LS.getItem("charList")) : require('../data/characters.json').characters.map( randomRotation ),
      intro:  LS.getItem("introClosed") === "false" ? false : true,
      outro: false,
      logged: false
    };

    this.closeIntro = this.closeIntro.bind(this);
    this.openOutro = this.openOutro.bind(this);
    this.saveSelection = this.saveSelection.bind(this);
    this.loginStatusCallback = this.loginStatusCallback.bind(this);
  }
  componentDidMount(){
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=235062097012315&status=1";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
     window.fbAsyncInit = ()=>{
       FB.getLoginStatus(this.loginStatusCallback);
     }
  }
  loginStatusCallback(response){
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me', function(response) {
       console.log(response.name, response.id);
     });
      this.setState({logged: true});
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      this.setState({logged: false});
    } else {
      // The person is not logged into Facebook
      this.setState({logged: false});
    }
  }
  closeIntro(){
    this.setState({intro: false});
    LS.setItem('introClosed',false);
  }
  openOutro(){
    this.setState({outro: true});
  }
  saveSelection(){
    FB.getLoginStatus(this.loginStatusCallback);
  }
  toggleCharacter(index){
    if(this.state.logged) return;
    let newList = [].concat(this.state.list);
    newList[index].checked = !newList[index].checked;
    LS.setItem('charList',JSON.stringify(newList));
    this.setState({list: newList });
  }
  render() {
    return (
      <AppMain isOpen={this.state.intro || this.state.outro}>
        <Header isOpen={this.state.intro || this.state.outro}></Header>
        <Intro isIntroOpen={this.state.intro} closeIntro={this.closeIntro}></Intro>
        <List isOpen={this.state.intro || this.state.outro} isLogged={this.state.logged} className="character-list">
          {this.state.list.length && this.state.list.map( (el, i)=>
            <Character char={el} check={this.toggleCharacter.bind(this,i)} key={i}/>
          )}
          {this.state.logged || <Button onClick={this.openOutro} className="unselectable">{Strings.save}</Button>}
        </List>
        <Outro isOutroOpen={this.state.outro} isLogged={this.state.logged} save={this.saveSelection}></Outro>
      </AppMain>
    );
  }
}

export default App;
