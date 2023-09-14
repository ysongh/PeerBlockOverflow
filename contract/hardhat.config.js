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
    }
  },
  paths: {
    artifacts: '../frontend/src/artifacts',
    cache: '../frontend/src/cache',
  }
};
