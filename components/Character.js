import React from 'react';
import styled from 'styled-components';
import Ribbon from './Ribbon';

const LI = styled.li`
cursor: pointer;
contain: layout;
width: 120px;
height: 160px;
flex: 0 0 120px;
margin: 10px 40px;
position: relative;

@media (max-width: 420px){
  margin: 10px 15px;
}

> .img{
  position: relative;
  z-index: -1;
  display: block;
  top: 0;
  height: 160px;
  width: 120px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%);
  background-color: ${ ({checked}) => checked ? 'black' : '#777'};
  background-image: linear-gradient(200deg, rgba(0,0,0,0) 15%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.1) 40%, rgba(0,0,0,0) 55% );
  box-shadow: 0px 4px 1px -3px rgba(255,255,255,0.5) inset;
}
> .img img{
  position: absolute;
  top: 5px;
  left: 5px;
  width: 110px;
  height: 150px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%);
  ${ ({checked}) => checked && 'filter: grayscale(1);'};
}
> .img:after{
  ${ ({checked}) => checked && 'content:""'};
  background: url('/static/splat.svg') no-repeat;
  width: 200%;
  height: 200%;
  position: absolute;
  bottom: -60%;
  right: -100%;
  transform: rotate(${ props => props.rotation-10}deg);
  transform-origin: 50% 50%;
}
`;

export default ({char,check,rotation}) => (
      <LI onClick={check} checked={char.checked} rotation={char.rotation} className="unselectable">
          <Ribbon character={char}></Ribbon>
          <span className="img">
            <img src={'/static/img/'+char.name+'.jpg'} alt={char.name + ' photo'}/>
          </span>
      </LI>
);
