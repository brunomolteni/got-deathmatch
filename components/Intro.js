import React from 'react';
import Strings from '../utils/i18n';
import Button from './Button';
import Article from './Article';


function daysBetween(one, another) {
  return Math.round(Math.abs(one - another) / 8.64e7);
}

const daysRemaining = daysBetween(Date.now(),new Date(2017,6,16));

const timeRemaining = daysRemaining < 7 ? daysRemaining + Strings.days : ~~(daysRemaining / 7) + Strings.weeks + Strings.and + daysRemaining % 7 + Strings.days;

export default ({isIntroOpen,closeIntro}) => (
  <Article open={isIntroOpen}>
    <h2>{Strings.introH2}</h2>
    <h3>{Strings.countdown}{timeRemaining}</h3>
    <p>{Strings.introP1}</p>
    <p>{Strings.introP2}</p>
    <Button onClick={closeIntro} className="unselectable">OK</Button>
  </Article>
)
