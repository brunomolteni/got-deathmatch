import Strings from '../data/i18n';

function daysBetween(one, another) {
  return Math.round(Math.abs(one - another) / 8.64e7);
}

export function getTimeRemaining(){
  const daysRemaining = daysBetween(Date.now(),new Date(2017,6,16));
  return daysRemaining < 7 ? daysRemaining + Strings.days : ~~(daysRemaining / 7) + Strings.weeks + Strings.and + daysRemaining % 7 + Strings.days;
}

export function randomRotation(el){
  el.rotation = Math.random()*60;
  return el;
}

export function bind2ndArgument(fn, newArg){
  return function(...args) {
      return fn.bind(this)(...args, newArg);
  }.bind(this);
}
