import React, {useEffect, useState} from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = 'chukky_colin';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;





const App = () => {
  // variables
  const [walletAddress, setWalletAddress] = useState(null)

  
const checkIfwalletIsConnected = async () => {
	try {
		const { solana } = window;

		if (solana) {
			if (solana.isPhantom) {
				console.log('phantomwallet installed');

				const response = await solana.connect({ onlyIfTrusted: true });
				console.log('Connected with public Key', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
			} else {
				alert('Solana object not found, pls install phantom wallet');
			}
		}
	} catch (error) {
		console.log(error);
	}
};



  const connectWallet = async () => {
    try {

      const { solana } = window
      if(solana) {
        let response = await solana.connect()
        setWalletAddress(response.publicKey.toString())
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }


  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect Wallet
    </button>
  )




  useEffect(() => {
		const onLoad = async () => {
			await checkIfwalletIsConnected();
		};
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
		};
	}, []);

  






  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
        {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana}/>}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`follow @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
