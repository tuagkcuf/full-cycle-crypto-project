import { getNamedAccounts, ethers } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const Lock = await ethers.getContract("Lock", deployer)
    console.log("Withdrawing")
    const transactionResponse = await Lock.withdraw()
    await transactionResponse.wait()
    console.log("Withdrawed")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
