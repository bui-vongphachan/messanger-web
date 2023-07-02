import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #ccc;
    }
  }

  html, body, #root {
    max-height: 100vh;
  }

  body {
    background: linear-gradient(to bottom,#009688 125px,  #D8DBD5 0px);
    overflow: auto hidden;
    -webkit-font-smoothing: antialiased;
  }

  body, button, input, textarea {
    font-family: Segoe UI, sans-serif;
    font-size: 15px;
    color: #444;
  }

  li {
    list-style: none;
  }

  @media only screen and (min-width: 1297px) {
    body {
      padding: 20px 0;
    }
  }
`;

