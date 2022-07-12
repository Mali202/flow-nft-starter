//importing required libraries
import React, {useState, useEffect} from "react";
import './App.css';
import twitterLogo from "./assets/twitter-logo.svg";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

fcl.config({
    "flow.network": "testnet",
    "app.detail.title": "Assassins on the blockchain", // Change the title!
    "accessNode.api": "https://rest-testnet.onflow.org",
    "app.detail.icon": "https://placekitten.com/g/200/200",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <div className="logo-container">
                        <img src="./logo.png" className="flow-logo" alt="flow logo"/>
                        <p className="header">✨Awesome NFTs on Flow ✨</p>
                    </div>

                    <p className="sub-text">The easiest NFT mint experience ever!</p>
                </div>

                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
                    <a className="footer-text" href={TWITTER_LINK} target="_blank"
                       rel="noreferrer">{`built on @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
}

export default App;