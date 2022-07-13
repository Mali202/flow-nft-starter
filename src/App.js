//importing required libraries
import React, {useState, useEffect} from "react";
import './App.css';
import twitterLogo from "./assets/twitter-logo.svg";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { mintNFT } from "./cadence/transactions/mintNFT_tx";
import { getTotalSupply } from "./cadence/scripts/getTotalSupply_script";

fcl.config({
    "flow.network": "testnet",
    "app.detail.title": "BottomShot", // Change the title!
    "accessNode.api": "https://rest-testnet.onflow.org",
    "app.detail.icon": "https://placekitten.com/g/200/200",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {

    const [ user, setUser ] = useState();

    const logIn = () => {
        fcl.authenticate();
    };

    const logOut = () => {
        fcl.unauthenticate();
    };

    const mint = async() => {

        let _totalSupply;
        try {
            _totalSupply = await fcl.query({
                cadence: `${getTotalSupply}`
            })
        } catch(err) {console.log(err)}

        const _id = parseInt(_totalSupply) + 1;

        try {
            const transactionId = await fcl.mutate({
                cadence: `${mintNFT}`,
                args: (arg, t) => [
                    arg(user.addr, types.Address), //address to which the NFT should be minted
                    arg("Assassin # "+_id.toString(), types.String), // Name
                    arg("Assassins on the blockchain", types.String), // Description
                    arg("ipfs://bafybeifpjduxfmzt7bd67rw7ypgwto5pua7eeoeqgqkwuxdfy4wpkyggoe/"+_id+".png", types.String),
                ],
                proposer: fcl.currentUser,
                payer: fcl.currentUser,
                limit: 99
            })
            console.log("Minting NFT now with transaction ID", transactionId);
            const transaction = await fcl.tx(transactionId).onceSealed();
            console.log("Testnet explorer link:", `https://testnet.flowscan.org/transaction/${transactionId}`);
            console.log(transaction);
            alert("NFT minted successfully!")
        } catch (error) {
            console.log(error);
            alert("Error minting NFT, please check the console for error details!")
        }
    }

    useEffect(() => {
        // This listens to changes in the user objects
        // and updates the connected user
        fcl.currentUser().subscribe(setUser);
    }, [])

    const RenderLogin = () => {
        return (
            <div>
                <button className="cta-button button-glow" onClick={() => logIn()}>
                    Log In
                </button>
            </div>
        );
    };

    const RenderLogout = () => {
        if (user && user.addr) {
            return (
                <div className="logout-container">
                    <button className="cta-button logout-btn" onClick={() => logOut()}>
                        ❎ {"  "}
                        {user.addr.substring(0, 6)}...{user.addr.substring(user.addr.length - 4)}
                    </button>
                </div>
            );
        }
        return undefined;
    };

    const RenderMintButton = () => {
        return (
            <div>
                <button className="cta-button button-glow" onClick={() => mint()}>
                    Mint
                </button>
            </div>
        );
    }

    return (
        <div className="App">
            <RenderLogout />
            <div className="container">
                <div className="header-container">
                    <div className="logo-container">
                        <img src="./logo.png" className="flow-logo" alt="flow logo"/>
                        <p className="header">✨Awesome NFTs on Flow ✨</p>
                    </div>

                    <p className="sub-text">The easiest NFT mint experience ever!</p>
                </div>

                {user && user.addr ? <RenderMintButton /> : <RenderLogin />}

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