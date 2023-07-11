const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
  //const { getNamedaccounts, deployments } = hre; //basically using these function from hre, as good as hre.getNamedaccounts, hre.deployments
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]; //gives address
  let ethUsdPriceFeedAddress; // we will not use it as a const as we want to update it
  //we do not want to hardcode so we find the address using chainid i.e. if chaindid is X then deploy at Y address
  // need to use aave
  //hence we configure helper-hardhat-configure file and put the instances//fin address using chainlink
  if (chainId == 31337) {
    const ethusdAggregator = await deployments.get("MockV3Aggregator"); //gets last deployed contract
    ethUsdPriceFeedAddress = ethusdAggregator.address;
  } //if a mock is deployed
  else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]; //gives addr from chainlink id
  } //if deployed on test net
  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //goes straight to constructor so need to put address of server
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${fundMe.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }
}; //hre basically brings in everything from hardhat
//mocking - simulate all the objects on which the object we want to test in isolation depends //simulate behaviour of real objects//usually happens when we ant to test locally
module.exports.tags = ["all", "fundme"];
