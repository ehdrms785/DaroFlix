import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color:inherit;
    }
    * {
        box-sizing:border-box;
    }
    body {
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
         Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         font-size: 12px;
         background-color: rgba(20, 20, 20 , 1);
         color:white;
         padding-top: 50px;
         height: 100%;
        /* overflow:hidden; */
         
    }
    button {
        border: none;
        outline: none;
        font: inherit;
        color: inherit;
        background: none;
        cursor: pointer;
        &:disabled {
            cursor: unset;
        }
    }
      /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #BBB;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #444;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default globalStyles;
