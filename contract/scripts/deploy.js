const hre = require("hardhat");

async function main() {
  // Mumbai testnet
  // Router address => 0x70499c328e1e2a3c41108bd3730f6670a44595d1
  // LINK token => 0x326C977E6efc84E512bB9C30f76E30c160eD06FB

  // Fuji testnet
  // Router address => 0x554472a2720e5e7d5d3c817529aba05eed5f82d8
  // LINK token => 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846

  // Sepolia testnet
  // Router address => 0xd0daae2231e9cb96b94c8512223533293c3693bf
  // LINK token => 0x779877A7B0D9E8603169DdbD7836e478b4624789

  const _router = "0x70499c328e1e2a3c41108bd3730f6670a44595d1";
  const _link = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const peerBlockOverflow = await hre.ethers.deployContract("PeerBlockOverflow", [_router, _link]);

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