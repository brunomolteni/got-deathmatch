import React from 'react';
import styled from 'styled-components';

const H4 = styled.h4`
font-size: 0.9rem;
width: 130px;
position: absolute;
background: ${ ({checked}) => checked ? '#6c6c6b' : '#fcf8ea'};
color: #333;
text-align: center;
padding: ${ ({alias}) => alias ? '0 5px 10px' : '5px'};
margin: 90px auto 0;
left: -10px;

&::first-letter{
  font-size: 120%;
}
&:before, > strong:after {
 content: "";
 position: absolute;
 display: block;
 bottom: -1em;
 border: 1em solid ${ ({checked}) => checked ? '#424241' : '#cac5b4'};
 z-index: -1;
}
&:before {
 left: -1.5em;
 border-right-width: 1.5em;
 border-left-color: transparent !important;
}
> strong:after {
 right: -1.5em;
 border-left-width: 1.5em;
 border-right-color: transparent !important;
 z-index: -1;
}
& > strong:before, &:after {
 content: "";
 position: absolute;
 display: block;
 border-style: solid;
 border-color: ${ ({checked}) => checked ? '#333230' : '#aaa79d'} transparent transparent transparent;
 bottom: -1em;
 z-index: -1;
}
& > strong:before {
 left: 0;
 border-width: 1em 0 0 1em;
}
&:after {
 right: 0;
 border-width: 1em 1em 0 0;
}
& > strong span{
  position: absolute;
  bottom: 0;
  left: 20%;
  display: block;
  height: 14px;
  width: 60%;
  text-align: center;
  font-size: 0.7rem;
  color: #888;
}
`;

export default ({character}) => (
  <H4 alias={character.alias} checked={character.checked}><strong>{character.name} {character.alias && <span>{character.alias}</span>} {character.family}</strong></H4>
)
