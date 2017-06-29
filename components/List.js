import styled from 'styled-components';

const List = styled.ul`
list-style: none;
padding: 50px 0 ${({isLogged})=>isLogged ? '100px' : '40px'};
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

${ ({isOpen}) => isOpen && `
opacity:0.1;
pointer-events: none;
overflow: hidden;
`}

> button{
  flex: 0;
  margin: 20px 50%;
  display: block;
}
`

export default List;
