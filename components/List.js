import styled, {css} from 'styled-components';

const List = styled.ul`
list-style: none;
padding: 50px 0 100px;
margin: 0;
display: flex;
flex-wrap: wrap;
justify-content: center;
transition: opacity 0.3s linear;
will-change: opacity;
background-color: #3b3b3b;
background-image: radial-gradient(ellipse at 50% -20%, rgba(0,0,0,0), rgba(0,0,0,0.9) );
min-height: 100vh;
box-sizing: border-box;

${ ({theme}) => (theme.isIntroOpen || theme.isOutroOpen) && css`
opacity:0.1;
pointer-events: none;
overflow: hidden;
`}
> p{
  color: #666;
  text-align: center;
  width: 100%;
  flex: 1 1 100%;
}
> button{
  flex: 0;
  margin: 20px 50%;
  display: block;
}
`

export default List;
