// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IOptionBook
 * @notice Interface for Thetanuts V4 OptionBook contract
 * @dev Based on official docs: https://docs.thetanuts.finance/for-builders/executing-trades
 */
interface IOptionBook {
    /**
     * @notice Order struct as defined by Thetanuts V4
     */
    struct Order {
        address maker;                  // Market maker address
        uint256 orderExpiryTimestamp;   // When this order expires
        address collateral;             // Collateral token (USDC/WETH/CBBTC)
        bool isCall;                    // true = call, false = put
        address priceFeed;              // Chainlink price feed address
        address implementation;         // Strategy implementation (spread/butterfly/condor)
        bool isLong;                    // true = buying, false = selling
        uint256 maxCollateralUsable;    // Maximum collateral the maker is willing to use
        uint256[] strikes;              // Strike prices (8 decimals), length determines strategy
        uint256 expiry;                 // Option expiry timestamp
        uint256 price;                  // Price per contract (8 decimals)
        uint256 numContracts;           // Number of contracts to fill
        bytes extraOptionData;          // Additional option parameters
    }

    /**
     * @notice Fill a maker's order
     * @param order The order struct from the API
     * @param signature EIP-712 signature from the maker
     * @param referrer Your platform's referrer address for fee tracking
     * @return optionAddress The deployed option contract address
     */
    function fillOrder(
        Order calldata order,
        bytes calldata signature,
        address referrer
    ) external returns (address optionAddress);

    /**
     * @notice Get accumulated fees for a referrer
     * @param token The collateral token address
     * @param referrer The referrer address
     * @return Accumulated fee amount
     */
    function fees(address token, address referrer) external view returns (uint256);

    /**
     * @notice Claim accumulated referral fees
     * @param token The collateral token address
     */
    function claimFees(address token) external;

    /**
     * @notice Emitted when an order is filled
     */
    event OrderFilled(
        address indexed taker,
        address indexed maker,
        address indexed optionAddress,
        address referrer,
        uint256 numContracts,
        uint256 premium
    );
}
