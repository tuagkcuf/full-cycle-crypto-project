import * as fs from "node:fs/promises"
import { network, ethers } from "hardhat"
import * as dotenv from "dotenv"

import { frontEndAbiFile, frontEndContractsFile } from "../helper-hardhat-config"

dotenv.config()

export default async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing addresses and abis to frontend")
        await updateAddresses()
        await updateAbi()
        console.log("Writing to frontend is finished")
    }
}

async function updateAbi() {
    const Lock = await ethers.getContract("Lock")
    fs.writeFileSync(
        `${frontEndAbiFile}Lock.json`,
        Lock.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateAddresses() {
    const chainId = network.config.chainId.toString()
    const Lock = await ethers.getContract("Lock")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (chainId in contractAddresses) {
        if (!contractAddresses[chainId]["Lock"].includes(Lock.address)) {
            contractAddresses[chainId]["Lock"].push(Lock.address)
        }
    } else {
        contractAddresses[chainId] = { Lock: [Lock.address] }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]