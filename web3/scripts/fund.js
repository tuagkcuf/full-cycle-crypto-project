import { getNamedAccounts, ethers } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()
    const Lock = await ethers.getContract("Lock", deployer)
    console.log("Funding contract...")
    const transactionResponse = await Lock.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionResponse.wait(1)
    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
