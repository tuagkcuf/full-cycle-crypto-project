import { ethers, network } from "hardhat"
import { developmentChains, networkConfig } from "../helper-hardhat-config"
import * as dotenv from "dotenv"
import { verify } from "../utils/verify"
dotenv.config()

export default async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = getNamedAccounts()

    const currentTimestampInSeconds = Math.round(Date.now() / 1000)
    const unlockTime = currentTimestampInSeconds + 60

    const lockedAmount = ethers.utils.parseEther("0.001")

    const chainId = network.config.chainId
    let ethUsdPriceFeed
    if (developmentChains.includes(network.name)) {
        const ethUsdPriceFeed = await get("MockV3Aggregator")
        ethUsdPriceFeed = ethUsdPriceFeed.address
    } else {
        ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const args = [unlockTime, ethUsdPriceFeed]
    log("Deploying Lock contract...")
    const Lock = await deploy(
        "Lock",
        {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        },
        { value: lockedAmount }
    )

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(Lock.address, args, lockedAmount)
    }
}
