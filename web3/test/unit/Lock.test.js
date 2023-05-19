import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { assert, expect } from "chai"
import { developmentChains } from "../../helper-hardhat-config"
import { mine } from "@nomicfoundation/hardhat-network-helpers"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lock", function () {
          let Lock, deployer, player, mockV3Aggregator
          const lockedAmount = ethers.utils.parseEther("0.1")
          const lockedTime = 10000060
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              player = (await getNamedAccounts()).player
              await deployments.fixture(["all"])
              Lock = await ethers.getContract("Lock", deployer)
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
          })

          describe("constructor", function () {
              it("sets unlock time, aggregator address and owner correctly", async function () {
                  const ownerAddress = await Lock.getOwner()
                  const unlockTime = await Lock.getUnlockTime()
                  const priceFeed = await Lock.getPriceFeed()
                  assert.equal(ownerAddress, deployer)
                  assert.equal(unlockTime, lockedTime)
                  assert.equal(priceFeed, mockV3Aggregator.address)
              })
          })

          describe("fund", function () {
              it("fails if you don't send enough ether", async function () {
                  await expect(Lock.fund()).to.be.reverted
              })
          })

          describe("withdraw", function () {
              it("fails if block.timestamp < unlockTime", async function () {
                  await expect(Lock.withdraw()).to.be.revertedWith("Lock__TimeNotPassed")
              })
              it("fails if not owner calls withdraw", async function () {
                  await mine(20000)
                  await expect(Lock.withdraw()).to.be.revertedWith("Lock__NotOwner")
              })
          })
      })
