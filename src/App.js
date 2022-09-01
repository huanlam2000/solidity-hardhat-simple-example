import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
import CITToken from './artifacts/contracts/CITToken.sol/CITToken.json'

const greeterRopstenAddress = "0x3157Cc2C2deaF6AA04c5831B14C7A0F0D962BD1B"
const tokenAddress = "0x83759ae480Df6A67433426541A9B11B435b48793"
const tokenERC20Address = "0xAA3374c1b3830B67E6972698B39745b6E7c740A5"

function App() {

  const [greeting, setGreetingValue] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  const [userToReceiveERC20, setUserToReceiveERC20] = useState()
  const [erc20Amount, setErc20Amount] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterRopstenAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterRopstenAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function sendERC20Token() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(tokenERC20Address, CITToken.abi, signer)
      const transaction = await contract.transfer(userToReceiveERC20, ethers.utils.parseUnits(erc20Amount, 18))
      await transaction.wait()
      console.log(`${erc20Amount} CETT successfullt set to ${userToReceiveERC20}`);
      getERC20Balance()
    }
  }

  async function getERC20Balance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenERC20Address, CITToken.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance of ERC20 token: ", ethers.utils.formatUnits(balance.toString(), 18));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input type="text" name="" id="" placeholder='Set greeting' onChange={e => setGreetingValue(e.target.value)} />
        <p>{process.env.REACT_APP_ROPSTEN_PRIVATE_KEY}</p>
      </header>

      <br />
      <header className='App-header'>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>

      <br />
      <header className='App-header'>
        <button onClick={getERC20Balance}>Get ERC20 Balance</button>
        <button onClick={sendERC20Token}>Send ERC20 Coins</button>
        <input onChange={e => setUserToReceiveERC20(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setErc20Amount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
