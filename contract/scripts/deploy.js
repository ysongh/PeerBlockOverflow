const hre = require("hardhat");

async function main() {
  const peerBlockOverflow = await hre.ethers.deployContract("PeerBlockOverflow");

  await peerBlockOverflow.waitForDeployment();

  console.log(
    `PeerBlockOverflow deployed to ${peerBlockOverflow.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});