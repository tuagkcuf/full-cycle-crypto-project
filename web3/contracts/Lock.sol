// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./PriceConverter.sol";

error Lock__TimeNotPassed();
error Lock__InvalidUnlockTime();
error Lock__NotOwner();
error Lock__NotSendEnough();

/**
 * @title A contract for give me my money 
 * @author tuagkcuf 
 * @notice This contract is to show how to make me richer
 * @dev This implements price feeds as our library for uint256 variables
 */ 
contract Lock {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;
    uint public unlockTime;
    address payable public owner;
    AggregatorV3Interface private s_priceFeed;


    event Withdrawal(uint amount, uint when);

    /**
     * @notice Get price feed address and time when to unlock the funded money
     * @dev Pass price feed to the AggregatorV3Interface chainlink contract
     * @param _unlockTime. When to unlock funds
     * @param priceFeedAddress. Address of the AggregatorV3Interface of chainlink
     */
    constructor(uint _unlockTime, address priceFeedAddress) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /**
     * @notice Funds the contract
     * @dev If funded amount less than the minimum allowed usd to fund, than revert
     */
    function fund() public payable {
        if (msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD) {
            revert Lock__NotSendEnough();
        }
    }

    /**
     * @notice Withdraw funds
     * @dev If unlock time not passed or if msg.sender != owner, than revert. Otherwise withdraw
     */
    function withdraw() public {
        if (block.timestamp < unlockTime) {
            revert Lock__TimeNotPassed();
        }
        if (msg.sender != owner) {
            revert Lock__NotOwner();
        }

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
        // owner.call{value: address(this).balance}("") - less gas consumption
    }

    // Getter functions
    function getUnlockTime() external view returns (uin256) {
        return unlockTime;
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
