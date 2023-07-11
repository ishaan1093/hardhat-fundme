const hre = require("hardhat");

async function main() {
  const { deployer } = await hre.getNamedAccounts();
  const fundMe = await hre.ethers.getContract("FundMe", deployer);
  console.log(`Got contract FundMe at ${fundMe.address}`);
  console.log("Withdrawing from contract...");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait();
  console.log("Got it back!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
