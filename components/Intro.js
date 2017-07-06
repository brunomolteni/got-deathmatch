import React from 'react';

import Button from './Button';
import Article from './Article';

import Strings from '../data/i18n';
import { getTimeRemaining } from '../utils/functions';

const DefaultContent = ()=>(
  <div>
    <h2>{Strings.introH2}</h2>
    <p>{Strings.introP1}</p>
    <p>{Strings.introP2}</p>
  </div>
)
const AlreadyVotedContent = ({user})=>(
  <div>
    <h2>{Strings.hi+user+'. '+Strings.already}</h2>
    <p>{Strings.countdown+getTimeRemaining()}</p>
    <p>{Strings.untilThen}</p>
  </div>
)

export default ({isOpen, close, username}) => (
  <Article open={isOpen}>
    {!!username ? <AlreadyVotedContent user={username} /> : <DefaultContent /> }
    <Button onClick={close} className="unselectable">OK</Button>
  </Article>
)
