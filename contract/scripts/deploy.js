const hre = require("hardhat");

async function main() {
  const daoDealClient = await hre.ethers.deployContract("DaoDealClient");

  await daoDealClient.waitForDeployment();

  console.log(`Contract deploy to ${daoDealClient.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
