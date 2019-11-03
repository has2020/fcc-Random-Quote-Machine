import React from 'react';
import App from "../App";


const Button = ({text, newQuote})=>{
    return (
        <button id="new-quote" onClick={newQuote}>{text}</button>
    )
}
export default Button;
