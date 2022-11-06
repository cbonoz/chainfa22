import React from "react"
import ReactMarkdown from "react-markdown"
import { APP_NAME } from "../constants"

import logo from './../assets/logo_trans.png'

// TODO: replace markdown here

const text = `
### TODO: Add markdown 
`

export const About = () => {
    return <div>
        <br/>
        <img src={logo} className='about-logo'></img>
        <br/>
        <br/>
        <h1>About</h1>
        <ReactMarkdown>{text}</ReactMarkdown>
        <a href="https://github.com/cbonoz/chainfa22" target="_blank">Github</a>
        <p>

</p>

</div>
}