const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};
const developmentChains = ["hardhat", "localhost"]; //want to test on these netw using mocks
module.exports = {
  networkConfig,
  developmentChains,
}; //used so that other scripts can work with this
