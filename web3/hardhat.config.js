import "@nomicfoundation/hardhat-toolbox"
import * as dotenv from "dotenv"
dotenv.config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"

export const solidity = {
    version: "0.8.9",
    defaultNetwork: "sepolia",
    networks: {
        hardhat: {},
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chaindId: 11155111,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
}
