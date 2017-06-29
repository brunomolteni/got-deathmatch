import styled from 'styled-components';

const Button = styled.button`
cursor: pointer;
color: black;
font-weight: bold;
text-decoration: none;
font-size: 1.2rem;
border: none;
padding: 0.5rem 1rem;
background-color: rgba(84, 44, 10, 0.92);
border: 1px solid transparent;
border-top-color: rgba(255,255,255,0.4);
border-bottom-color: rgba(0,0,0,0.4);
box-shadow: 0 4px 3px -2px rgba(0,0,0,0.4);
background-image: radial-gradient(#cec0af,#827264);
transition: all 0.1s ease-out;
will-change: transform, box-shadow;

&:focus, &:hover{
  transform: translateY(-2px);
  box-shadow: 0 6px 5px -2px rgba(0,0,0,0.3);
  outline: none;
}
`;

export default Button;
