require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // npx hardhat run scripts/deploy.js --network calibration
    "calibration": {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATEKEY],
      chainId: 314159,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deploy.js --network chiado
    // npx hardhat run --network chiado scripts/deploy.js
    "chiado": {
      url: "https://rpc.chiadochain.net",
      accounts: [process.env.PRIVATEKEY],
      chainId: 10200,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deploy.js --network mumbai
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [process.env.PRIVATEKEY],
      chainId: 80001,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deploy.js --network fuji
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATEKEY],
      chainId: 43113,
      gasPrice: 25000000000
    },
     // npx hardhat run scripts/deploy.js --network sepolia
     sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.PRIVATEKEY],
      chainId: 11155111,
      gasPrice: 25000000000
    },
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  },
  verify: {
    etherscan: {
      apiKey: `${process.env.ETHERSCAN_APIKEY}`,
    },
  },
};
