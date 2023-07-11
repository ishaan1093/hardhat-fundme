require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");
//require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const COINMARKETCAP_API_KEY =
  process.env.COINMARKETCAP_API_KEY || "0cbfcbbb-52e8-4ab4-99cc-5afb5e3bd6bb";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/pzSwF6PqoKfOtIPf3GWqXnMtFu_00dyw";
const PRIVATE_KEY =
  process.env.PRIVATE_KEY ||
  "d22e7c41ed83af91ebc22c4540d3c0517d6096575f9e08abcee3eaff07d21248";
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "B2NW4ZBSXNNA4PK219FIMY1CK2FD2BHR73";
module.exports = {
  //solidity: "0.8.7",
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  }, //access prv versions of solidity
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      // gasPrice: 130000000000,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};
