const hre = require("hardhat");

async function main() {
  const peerBlockOverflow = await hre.ethers.deployContract("PeerBlockOverflow");

  await peerBlockOverflow.waitForDeployment();

  console.log(
    `PeerBlockOverflow deployed to ${peerBlockOverflow.target}`
  );

  await peerBlockOverflow.addPost("https://dweb.link/ipfs/bafybeibvax344ma6wgk7r2vnlf2yf7jpneos46l52ggxahftg6mgi2ch6e");
  console.log(`Post #1 is created`);

  await peerBlockOverflow.addPost("https://dweb.link/ipfs/bafybeibwhhg542rtmupu2kpuemxvfel7jvdqfvdi4xm4wpyi5j5qcfb54m");
  console.log(`Post #2 is created`);

  await peerBlockOverflow.addComment("0", "https://dweb.link/ipfs/bafybeicswzxjtvavjqmnsxiha5a6eozpwpjd2zlumzok3p5md6alhfjx6m");
  console.log(`Comment #1 is created`);

  await peerBlockOverflow.addComment("0", "https://dweb.link/ipfs/bafybeiecbrjgmwgpancljuablkzfdhwxjwnt62b2ukwnbii4vfrn6z6vuy");
  console.log(`Comment #2 is created`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});