import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";


/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */
const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
`;
/*const Body = styled.body `
    margin: 0;
    font-family: Arial,serif;
`;
const A = styled.a `
    float: right;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
`;*/



/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
  return (

    <Container height={props.height}>
        <Title>SoPra FS19 rocks with React!</Title>
        <ReactLogo width={60} height={60} />
        {/*A BIT HARD TO MAKE IT WORK. */}
        {/*<Body>
            <A href="/myProfile">My Profile</A>
        </Body>*/}
    </Container>

  );
};

/**
 * Don't forget to export your component!
 */
export default Header;
