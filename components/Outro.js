import React from 'react';
import Strings from '../utils/i18n';
import Article from './Article';
import Button from './Button';

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

export default ({isOutroOpen, isLogged, save}) => (
  window.checkLoginState = (e) => {
    save();
  },
    <OutroArticle open={isOutroOpen}>
      { isLogged || <h2>{Strings.outroH2}</h2>}
      { isLogged && <p>{Strings.outroP}</p>}
      {!isLogged ?
        <div id="fb-login" className="fb-login-button" data-onlogin="checkLoginState();" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div>
      : <Button onClick={share}>{Strings.outroButton}</Button>}
    </OutroArticle>
)
