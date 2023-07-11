const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config"); //to call the networks that are needed for mock
const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts(); //name of deployer that is extracted using getnamedaccts funstion in hre
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    log("local network detected deploying mocks..");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE], //these are constructor arguments for v3aggregator
    });
    log("Mocks Deployed!");
    log("------------------------------------------------");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("------------------------------------------------");
  } //deploy mock contract if the right chain id present
};
module.exports.tags = ["all", "mocks"]; // select if we want to run mock or all using yarn hardhat deploy --tags or --all
