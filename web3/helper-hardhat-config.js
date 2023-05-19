const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "your price feeds",
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "your price feeds",
    },
}

const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 20000000

const frontEndContractsFile = "path to place contracts' addresses"
const frontEndAbiFile = "path to place contracts' abis"

export { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }
