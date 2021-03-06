import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const logo = require('../static/logo.svg');
const sword1 = require('../static/sword1.svg');
const sword2 = require('../static/sword2.svg');

const HeaderStyled = styled.header`
position: fixed;
width: 100%;
top: 0;
left: 0;
z-index: 10;
text-align: center;
background-image: linear-gradient(to top, transparent, black);
contain: layout;

> h1 {
  color: #e3bc80;
  font-size: 2rem;
  font-size: calc(1vh + 1vw + 1rem);
  font-weight: normal;
  line-height: 1.1;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 auto;
  position: relative;
  will-change: transform;
  transition: transform 0.4s ease-out;
  transform-origin: top;
  transform: translateY(${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) ? '40px' : '10px'}) scale(${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) ? '1' : '0.5'});
}
> h1 strong{
  text-indent: -1000%;
  display: block;
  height: 50px;
  background: transparent no-repeat center;
  background-image: url(${logo}), radial-gradient(ellipse,black,transparent 70%);
}
> h1 span{
    text-shadow: 0 1px 1px rgba(0,0,0,0.8), 0 0 15px black;
}
> h1:before, > h1:after{
  content: '';
  display: block;
  background: url(${sword1}) no-repeat center;
  height: 300px;
  max-height: 80vw;
  width: 50px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: -1;
  transform: translateX(-50%) translateY(-40%) rotate(-70deg) translateY(${ ({theme}) => !(theme.isIntroOpen || theme.isOutroOpen) ? '-200%' : '0'});
  will-change: transform;
  transition: transform 0.4s ease-in;
}
> h1:after{
  background-image: url(${sword2});
  transform: translateX(-50%) translateY(-40%) rotate(70deg) translateY(${ ({theme}) => !(theme.isIntroOpen || theme.isOutroOpen) ? '-200%' : '0'});
}
@media (max-width: 420px){
  > h1{
    transform: translateY(${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) ? '40px' : '10px'}) scale(${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) ? '0.8' : '0.5'});
  }
}
`;

export default () => (
      <HeaderStyled>
        <h1 className="unselectable"><strong>Game of Thrones</strong> <span>Deathmatch</span></h1>
      </HeaderStyled>
    );
