import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {  Layout, Menu, Select, Spin } from "antd";

import './App.css';
import { Home } from "./components/Home";
import {
  QuestionCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { About } from "./components/About";
import { ACTIVE_CHAIN, APP_DESC, APP_NAME } from "./constants";
import Lookup from "./components/Lookup";
// import CreateFreight from "./components/CreateFreight";
import History from "./components/History";

import 'antd/dist/antd.css';
import "@ant-design/flowchart/dist/index.css";
import CreateFreight from "./components/CreateFreight";
import QrCodePage from "./components/QrCodePage";
import { useAccount, useNetwork, Web3Button } from "@web3modal/react";
import logo from "./assets/logo_trans.png";
import { abbreviate } from "./util";

const { Header, Footer,  Content } = Layout;
const { Option } = Select;

function App() {
  const navigate = useNavigate()
  const {account, isReady} = useAccount() // https://web3modal.com/hooks/use-account
  const { network } = useNetwork()

  // const height = window.innerHeight - 120;

  const pathname = window.location.pathname

  const isQR = pathname.indexOf('/qr/') !== -1
  
  return (
    <div className="App">
      <Layout>
        {!isQR && <Header>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[pathname]}
          >
            <Menu.Item key={0}>
              <img
                src={logo}
                className="header-logo pointer"
                onClick={() => navigate("/")}
              />

            </Menu.Item>
            <Menu.Item key={'/create'} onClick={() => navigate("/create")}>
            <FormOutlined /> Create Parcel
            </Menu.Item>

            <Menu.Item key={'/history'} onClick={() => navigate("/history")}>
            <FormOutlined /> Freight logs
            </Menu.Item>
            <Menu.Item key={'/about'} onClick={() => navigate("/about")}>
              <QuestionCircleOutlined /> About
            </Menu.Item>
            <span className="web3-button">
              <Web3Button />
          </span>
      
       
            </Menu>
      
        
            </Header>}
          <Content>
          <span className="no-print" style={{ right: 0, position: 'absolute' }}>
              &nbsp;Network: <b>{ACTIVE_CHAIN.name}</b>
              {account && account.address && isReady && <span>
              ,&nbsp;Logged in: <b>{abbreviate(account.address)}</b>
              </span>} 
              &nbsp;
            </span>
            <div className="container">
           
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/carbon-map" element={<Home/>}/> */}
                <Route path="/about" element={<About/>}/>
                <Route path="/history" element={<History />}/>
                <Route path="/create" element={<CreateFreight network={network}/>}/>
                <Route path="/qr/:itemId" element={<QrCodePage/>}/>

                <Route path="/i/:itemId" element={<Lookup network={network} />}/>
                <Route path="/about" element={<About/>}/>

              </Routes>
            </div>
          </Content>

          <Footer>
            <hr/>
            <p>
              <a href={"/"}><b>{APP_NAME}</b></a>&nbsp;
             &copy;2022.&nbsp;{APP_DESC}.<br/></p>
          </Footer>
        </Layout>
      </div>
  );
}

export default App;
