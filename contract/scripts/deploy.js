const hre = require("hardhat");

async function main() {
  const peerBlockOverflow = await hre.ethers.deployContract("PeerBlockOverflow");

  await peerBlockOverflow.waitForDeployment();

  console.log(
    `PeerBlockOverflow deployed to ${peerBlockOverflow.target}`
  );

  await peerBlockOverflow.addPost("https://dweb.link/ipfs/bafybeigd2tft4h65d2anbuh6kkdps4d7mhqcs2alwhmogqycryf33s3bvq");
  console.log(`Post #1 is created`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});