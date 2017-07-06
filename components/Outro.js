import React from 'react';

import Article from './Article';
import Button from './Button';

import Strings from '../data/i18n';
import { share } from '../utils/facebook';
import { getTimeRemaining } from '../utils/functions';


const DefaultContent = ()=>(
  <div>
    <p>{Strings.outroH2}</p>
    <div id="fb-login" className="fb-login-button" data-onlogin="checkLoginState();" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="fañse" data-scope="basic_info,user_friends"></div>
  </div>
)
const ErrorContent = ()=>(
  <div>
    <h2>{Strings.errorH2}</h2>
    <p>{Strings.errorP}</p>
  </div>
)
const AlreadyVotedContent = ({close,shareSuccess})=>(
  <div>
    <h2>{Strings.already}</h2>
    <p>{Strings.outroP}</p>
    <Button onClick={share.bind(null,shareSuccess)} className="unselectable">{Strings.outroButton}</Button>
    <Button onClick={close} className="unselectable">{Strings.close}</Button>
  </div>
)
const AlreadySharedContent = ({close})=>(
  <div>
    <h2>{Strings.thanks}</h2>
    <p>{Strings.countdown+getTimeRemaining()}</p>
    <p>{Strings.untilThen}</p>
    <Button onClick={close} className="unselectable">{Strings.close}</Button>
  </div>
)

const OutroArticle = Article.extend`
  transform: translateY(${ ({open}) => open ? '-50%' : '100vh'}) translateX(-50%);

  &:before{
    left: -40px;
    bottom: -120px;
    transform: rotate(10deg);
  }
  .fb-login-button{
    box-shadow: 0 6px 5px -2px rgba(0,0,0,0.3);
  }
`;
export default ({isOpen, hasShared, shareSuccess, username, error, save, close}) => (
  window.checkLoginState = (e) => { // mapping save to global function to allow fb login callback
    save();
  },
    <OutroArticle open={isOpen}>
      {
        error ? <ErrorContent />
        : hasShared ? <AlreadySharedContent close={close}/>
        : !!username ? <AlreadyVotedContent close={close} shareSuccess={shareSuccess}/>
        : <DefaultContent />
      }
    </OutroArticle>
)
