import styled from 'styled-components';

const Article = styled.article`
position: fixed;
z-index: 5;
left: 50%;
top: 220px;
width: 100%;
padding: 20px;
text-align: center;
font-size: 1.4rem;
font-size: calc(1vw + 1vh + 0.2rem);
color: rgba(0,0,0,0.7);
background-color: #e5d3b3;
background-image: radial-gradient(ellipse,rgba(255,255,255,0.4),transparent, rgba(90,60,5,0.8));
box-shadow: 0px 20px 15px -10px rgba(0,0,0,0.8);
transform: translateY(${ ({open}) => open ? '-50%' : '-150vh'}) translateX(-50%);
transition: transform 0.4s ease-in;
will-change: transform;
contain: content;

@media (min-width: 800px){
  max-width: 60%;
}

&:before{
  content:"";
  background: url('/static/splat.svg') no-repeat;
  width: 200px;
  height: 300px;
  position: absolute;
  bottom: -100px;
  right: -120px;
  transform: rotate(-15deg);
  transform-origin: 50% 50%;
  opacity: 0.5;
}

#fb-login + button{
  display: block;
  margin: 10px auto 0;
}
`;

export default Article;
