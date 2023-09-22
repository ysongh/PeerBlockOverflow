async function main() {
  const [deployer] = await ethers.getSigners();

  // const daoDealClient = await hre.ethers.deployContract("DaoDealClient");
  // await daoDealClient.waitForDeployment();
  // console.log(`Contract deploy to ${daoDealClient.target}`);

  const peerBlockOverflow = await ethers.deployContract("PeerBlockOverflow");
  await peerBlockOverflow.waitForDeployment();
  console.log(`Contract deploy to ${peerBlockOverflow.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
