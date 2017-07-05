import React from 'react';
import Article from './Article';
import Button from './Button';
import Strings from '../data/i18n';

const OutroArticle = Article.extend`
  transform: translateY(${ ({open}) => open ? '-50%' : '100vh'}) translateX(-50%);

  &:before{
    left: -40px;
    bottom: -120px;
    transform: rotate(10deg);
  }
  > .fb-login-button{
    box-shadow: 0 6px 5px -2px rgba(0,0,0,0.3);
  }
`;

function share(){
  FB.ui(
   {
    method: 'share',
    href: 'https://www.got-deathmatch.com'
  }, function(response){});
}

export default ({isOpen, alreadyVoted, save}) => (
  window.checkLoginState = (e) => { // mapping save to global function to allow fb login callback
    save();
  },
    <OutroArticle open={isOpen}>
      { !alreadyVoted ? <h2>{Strings.outroH2}</h2> : <p>{Strings.outroP}</p>}
      {!alreadyVoted ?
        <div id="fb-login" className="fb-login-button" data-onlogin="checkLoginState();" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div>
      : <Button onClick={share}>{Strings.outroButton}</Button>}
    </OutroArticle>
)
