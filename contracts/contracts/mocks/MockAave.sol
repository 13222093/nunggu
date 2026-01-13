// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IAave.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockAToken
 * @notice Mock implementation of Aave aToken for testing
 */
contract MockAToken is ERC20 {
    address public immutable underlyingAsset;

    constructor(address _underlyingAsset) ERC20("Mock aToken", "aIDRX") {
        underlyingAsset = _underlyingAsset;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}

/**
 * @title MockAave
 * @notice Mock implementation of Aave Pool for testing
 */
contract MockAave is IAave {
    mapping(address => MockAToken) public aTokens;

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 /* referralCode */
    ) external override {
        // Create aToken if it doesn't exist
        if (address(aTokens[asset]) == address(0)) {
            aTokens[asset] = new MockAToken(asset);
        }

        // Transfer underlying from sender
        ERC20(asset).transferFrom(msg.sender, address(this), amount);

        // Mint aTokens to onBehalfOf
        aTokens[asset].mint(onBehalfOf, amount);
    }

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external override returns (uint256) {
        require(address(aTokens[asset]) != address(0), "Asset not supplied");

        // Handle max withdrawal
        uint256 withdrawAmount = amount;
        if (amount == type(uint256).max) {
            withdrawAmount = aTokens[asset].balanceOf(msg.sender);
        }

        // Burn aTokens from sender
        aTokens[asset].burn(msg.sender, withdrawAmount);

        // Transfer underlying to recipient
        ERC20(asset).transfer(to, withdrawAmount);

        return withdrawAmount;
    }

    function getReserveData(address asset)
        external
        view
        override
        returns (
            uint256 configuration,
            uint128 liquidityIndex,
            uint128 currentLiquidityRate,
            uint128 variableBorrowIndex,
            uint128 currentVariableBorrowRate,
            uint128 currentStableBorrowRate,
            uint40 lastUpdateTimestamp,
            uint16 id,
            address aTokenAddress,
            address stableDebtTokenAddress,
            address variableDebtTokenAddress,
            address interestRateStrategyAddress,
            uint128 accruedToTreasury,
            uint128 unbacked,
            uint128 isolationModeTotalDebt
        )
    {
        address aToken = address(aTokens[asset]);
        configuration = 0;
        liquidityIndex = 1e27;
        currentLiquidityRate = 0;
        variableBorrowIndex = 0;
        currentVariableBorrowRate = 0;
        currentStableBorrowRate = 0;
        lastUpdateTimestamp = uint40(block.timestamp);
        id = 0;
        aTokenAddress = aToken;
        stableDebtTokenAddress = address(0);
        variableDebtTokenAddress = address(0);
        interestRateStrategyAddress = address(0);
        accruedToTreasury = 0;
        unbacked = 0;
        isolationModeTotalDebt = 0;
    }

    function getAToken(address asset) external view returns (address) {
        return address(aTokens[asset]);
    }
}
