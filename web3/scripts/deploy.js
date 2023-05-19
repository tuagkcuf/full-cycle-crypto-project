// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// TODO: make a chainlink contract like vrf
// TODO: rewrite contract myself with chainlink vrf
// TODO: add mocks for chainlink
// TODO: update script properly using fcc study and write it myself
// TODO: update tests properly and write them myself
// TODO: add etherscan verification script
// TODO: convert everything to es6 module
// TODO: find all remaining things that i didnt add here with fcc study
// TODO: start with frontend side of this project
import { ethers as _ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = _ethers.utils.parseEther("0.001");

  const Lock = await _ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
