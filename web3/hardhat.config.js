import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"
dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

export const solidity = {
    solidity: {
        compilers: [{ version: "0.8.18" }, { version: "0.6.6" }],
    },
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chaindId: 11155111,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 200000,
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
}
