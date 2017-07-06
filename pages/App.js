import React, { Component } from 'react';
import styled, { ThemeProvider} from 'styled-components';
import io from 'socket.io-client';

import List from '../components/List';
import Character from '../components/Character';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Button from '../components/Button';
import Outro from '../components/Outro';

import {storeLocally, locallyStored} from '../utils/localstorage';
import {setupFacebookLogin} from '../utils/facebook';
import {randomRotation} from '../utils/functions';
import {hitApi, getUserVotes} from '../utils/ajax';

import Strings from '../data/i18n';

// const socket = io();

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
      error: locallyStored('error' ) || false,
      ui: {
        isIntroOpen: true,
        isOutroOpen: false
      }
    };

    this.store = storeLocally.bind(this);
    this.api = hitApi.bind(this);
    this.getVotes = getUserVotes;
    this.closeIntro = this.closeIntro.bind(this);
    this.closeOutro = this.closeOutro.bind(this);
    this.openOutro = this.openOutro.bind(this);
    this.shareSuccess = this.shareSuccess.bind(this);
    this.saveVote = this.saveVote.bind(this);
    this.changeVote = this.changeVote.bind(this);
    this.fbLoginCallback = this.fbLoginCallback.bind(this);
  }

  componentDidMount(){
     setupFacebookLogin(this.fbLoginCallback);
  }

  closeIntro(){
    this.setState({'ui': {...this.state.ui, isIntroOpen: false}});
  }

  openOutro(){
    this.setState({'ui': {...this.state.ui, isOutroOpen: true}});
  }

  closeOutro(){
    this.setState({'ui': {...this.state.ui, isOutroOpen: false}});
  }

  shareSuccess(){
     this.store('shared',true);
  }

  toggleCharacter(index){
    if(this.state.voted) return;
    let newList = [].concat(this.state.list);
    newList[index].checked = !newList[index].checked;
    this.store('list', newList );
  }

  saveVote(){
    this.afterLogin = ()=>{
      if(this.state.token && this.state.logged){
        this.api('post')
        .then(response => response.status)
        .then(status => {
          (status!==200 && status!==409) && this.store('error',true);
        });
      }
      else this.store('error',true);
    }
    FB.getLoginStatus(this.fbLoginCallback);
  }

  changeVote(){
    this.afterLogin = ()=>{
      if(this.state.token && this.state.logged){
        this.api('put')
        .then(response => response.status)
        .then(status => {
          (status!==200 && status!==409) && this.store('error',true);
        });
      }
      else this.store('error',true);
    }
    FB.getLoginStatus(this.fbLoginCallback);

  }

  fbLoginCallback(response){
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.setState({token: response.authResponse.accessToken});

      if(!this.state.logged){
        FB.api('/me',(response)=>{
          this.store('logged', response);
          this.getVotes(response.id)
          .then(response=>response.json())
          .then(voteList=>this.store('list',voteList));
        });
      }

      !!this.afterLogin && this.afterLogin();

    } else {
      // The person is not logged into Facebook or not into your app
      this.store('logged', false);
    }
  }


  render() {
    return (
      <ThemeProvider theme={this.state.ui}>
        <AppMain>
          <Header></Header>
          <Intro isOpen={this.state.ui.isIntroOpen} close={this.closeIntro} username={this.state.logged && this.state.logged.name}></Intro>
          <List className="character-list">
            <p>{Strings.helper}</p>
            {this.state.list.length && this.state.list.map( (el, i)=>
              <Character char={el} check={this.toggleCharacter.bind(this,i)} key={i}/>
            )}
            {!this.state.logged ? <Button onClick={this.openOutro} className="unselectable">{Strings.save}</Button> : <Button onClick={this.changeVote} className="unselectable">{Strings.change}</Button>}
          </List>
          <Outro isOpen={this.state.ui.isOutroOpen} hasShared={this.state.shared} shareSuccess={this.shareSuccess} save={this.saveVote} close={this.closeOutro} username={this.state.logged && this.state.logged.name} error={this.state.error}></Outro>
        </AppMain>
      </ThemeProvider>
    );
  }
}

export default App;
