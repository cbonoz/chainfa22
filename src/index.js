import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ACTIVE_CHAIN, APP_NAME, CHAIN_OPTIONS, WEB3_PROJECT_ID } from './constants';
import { chains, providers } from '@web3modal/ethereum'

import { Web3Modal } from '@web3modal/react';

const config = {
  projectId: WEB3_PROJECT_ID,
  theme: 'light',
  accentColor: 'default',
  ethereum: {
    appName: APP_NAME,
    chains: [
      ACTIVE_CHAIN.id === 137 ? chains.polygon : chains.polygonMumbai
    ],
    providers: [providers.walletConnectProvider({projectId: WEB3_PROJECT_ID})]
  }
}

// https://web3modal.com/hooks


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
        <Web3Modal config={config} />
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
