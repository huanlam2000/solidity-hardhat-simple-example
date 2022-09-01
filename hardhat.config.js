require('dotenv').config({ path: __dirname + '/.env' })
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY } = process.env
// console.log("ROPSTEN PRIVATE KEY: ", ROPSTEN_PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: "https://ropsten.infura.io/v3/2f7a87a4c67148e2baebb40503fe61a7",
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 20000,
      gasPrice: 'auto',
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/2f7a87a4c67148e2baebb40503fe61a7",
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 20000,
      gasPrice: 'auto',
    }
  }
};
