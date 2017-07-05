import React from 'react';
import Strings from '../data/i18n';
import Button from './Button';
import Article from './Article';


function daysBetween(one, another) {
  return Math.round(Math.abs(one - another) / 8.64e7);
}

const daysRemaining = daysBetween(Date.now(),new Date(2017,6,16));

const timeRemaining = daysRemaining < 7 ? daysRemaining + Strings.days : ~~(daysRemaining / 7) + Strings.weeks + Strings.and + daysRemaining % 7 + Strings.days;

const IntroContent = ()=>(
  <div>
    <h2>{Strings.introH2}</h2>
    <p>{Strings.introP1}</p>
    <p>{Strings.introP2}</p>
  </div>
)
const IntroContentLogged = ({username})=>(
  <div>
    <h2>{Strings.hi+username+Strings.already}</h2>
    <p>{Strings.countdown+timeRemaining}</p>
    <p>{Strings.untilThen}</p>
  </div>
)

export default ({isOpen, closeIntro, alreadyVoted, username}) => (
  <Article open={isOpen}>
    {alreadyVoted ? <IntroContentLogged username={username} /> : <IntroContent /> }
    <Button onClick={closeIntro} className="unselectable">OK</Button>
  </Article>
)
