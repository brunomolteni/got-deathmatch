import React, { Component } from 'react';
import styled, { ThemeProvider} from 'styled-components';
import io from 'socket.io-client';

import List from '../components/List';
import Character from '../components/Character';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Button from '../components/Button';
import Outro from '../components/Outro';

import Strings from '../data/i18n';

const LS = window.localStorage;
const socket = io();

function randomRotation(el){
  el.rotation = Math.random()*60;
  return el;
}

function locallyStored(item){
  return LS.getItem(item) !== null && JSON.parse(LS.getItem(item));
}

const AppMain = styled.section`
  max-height: 100vh;
  ${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) && `overflow: hidden;`}
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: locallyStored('list') || require('../data/characters.json').characters.map( randomRotation) ,
      logged: locallyStored('logged' ) || false,
      voted: locallyStored('voted' ) || false,
      ui: {
        isIntroOpen: true,
        isOutroOpen: false
      }
    };

    this.closeIntro = this.closeIntro.bind(this);
    this.openOutro = this.openOutro.bind(this);
    this.saveSelection = this.saveSelection.bind(this);
    this.fbLoginCallback = this.fbLoginCallback.bind(this);
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
       FB.getLoginStatus(this.fbLoginCallback);
     }
  }

  closeIntro(){
    this.setState({'ui': {...this.state.ui, isIntroOpen: false}});
  }

  openOutro(){
    this.setState({'ui': {...this.state.ui, isOutroOpen: true}});
  }

  toggleCharacter(index){
    if(this.state.voted) return;
    let newList = [].concat(this.state.list);
    newList[index].checked = !newList[index].checked;
    LS.setItem('list',JSON.stringify(newList));
    this.setState({list: newList });
  }

  saveSelection(){
    const saveToServer = fetch('//localhost:5000/api/vote?access_token='+this.state.token, {
    	method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    	body: JSON.stringify({
    		name: this.state.logged.name,
        id: this.state.logged.id,
        votes: this.state.list
    	})
    })
    .then(response => response.ok)
    .then(ok => {
      if(ok){
        this.setState({voted: true});
        LS.setItem('voted',true);
      }
    });
  }

  fbLoginCallback(response){
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log(response);
      this.setState({token: response.authResponse.accessToken});
      FB.api('/me',response=>{
        console.log(response);
        this.setState({logged: response});
        LS.setItem('logged',JSON.stringify(response));
      });

    } else {
      // The person is not logged into Facebook or not into your app
      this.setState({logged: false});
      LS.setItem('logged',false);
    }
  }

  render() {
    return (
      <ThemeProvider theme={this.state.ui}>
        <AppMain>
          <Header></Header>
          <Intro isOpen={this.state.ui.isIntroOpen} closeIntro={this.closeIntro} alreadyVoted={this.state.voted} username={this.state.logged && this.state.logged.name}></Intro>
          <List className="character-list">
            {this.state.list.length && this.state.list.map( (el, i)=>
              <Character char={el} check={this.toggleCharacter.bind(this,i)} key={i}/>
            )}
            {this.state.voted || <Button onClick={this.openOutro} className="unselectable">{Strings.save}</Button>}
          </List>
          <Outro isOpen={this.state.ui.isOutroOpen} alreadyVoted={this.state.voted} save={this.saveSelection}></Outro>
        </AppMain>
      </ThemeProvider>
    );
  }
}

export default App;
