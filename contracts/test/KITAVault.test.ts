import { expect } from "chai";
import { ethers } from "hardhat";
import { KITAVault, MockERC20, MockAave } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("KITAVault", function () {
    let vault: KITAVault;
    let usdc: MockERC20;
    let aave: MockAave;
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let mockOptionBook: SignerWithAddress; // We'll use an EOA for mock

    const INITIAL_BALANCE = ethers.parseUnits("1000000", 6); // 1M USDC
    const COLLATERAL = ethers.parseUnits("1000", 6); // 1000 USDC

    beforeEach(async function () {
        [owner, user1, user2, mockOptionBook] = await ethers.getSigners();

        // Deploy Mock USDC (6 decimals like real USDC)
        const MockERC20Factory = await ethers.getContractFactory("MockERC20");
        usdc = await MockERC20Factory.deploy("USD Coin", "USDC", 6);
        await usdc.waitForDeployment();

        // Deploy Mock Aave
        const MockAaveFactory = await ethers.getContractFactory("MockAave");
        aave = await MockAaveFactory.deploy();
        await aave.waitForDeployment();

        // Deploy KITAVault
        // Note: We use a mock address for OptionBook since we can't test fillOrder locally
        const VaultFactory = await ethers.getContractFactory("KITAVault");
        vault = await VaultFactory.deploy(
            mockOptionBook.address, // Mock OptionBook address
            await usdc.getAddress(),
            await aave.getAddress(),
            owner.address // Referrer
        );
        await vault.waitForDeployment();

        // Mint USDC to users
        await usdc.mint(user1.address, INITIAL_BALANCE);
        await usdc.mint(user2.address, INITIAL_BALANCE);
    });

    describe("Deployment", function () {
        it("Should set correct addresses", async function () {
            expect(await vault.collateralToken()).to.equal(await usdc.getAddress());
            expect(await vault.referrer()).to.equal(owner.address);
        });

        it("Should set correct initial values", async function () {
            expect(await vault.platformFee()).to.equal(500); // 5%
            expect(await vault.minCollateral()).to.equal(1e6); // 1 USDC
            expect(await vault.totalPositionsCreated()).to.equal(0);
            expect(await vault.totalValueLocked()).to.equal(0);
        });
    });

    describe("Admin Functions", function () {
        it("Should allow owner to update fee", async function () {
            await vault.updateFee(1000); // 10%
            expect(await vault.platformFee()).to.equal(1000);
        });

        it("Should not allow fee > MAX_FEE", async function () {
            await expect(vault.updateFee(3000)).to.be.revertedWith("Fee too high");
        });

        it("Should allow owner to update referrer", async function () {
            await vault.updateReferrer(user1.address);
            expect(await vault.referrer()).to.equal(user1.address);
        });

        it("Should allow owner to pause/unpause", async function () {
            await vault.pause();
            expect(await vault.paused()).to.be.true;

            await vault.unpause();
            expect(await vault.paused()).to.be.false;
        });

        it("Should only allow owner to call admin functions", async function () {
            await expect(
                vault.connect(user1).updateFee(1000)
            ).to.be.revertedWithCustomError(vault, "OwnableUnauthorizedAccount");
        });
    });

    describe("View Functions", function () {
        it("Should return empty positions for new user", async function () {
            const positions = await vault.getUserPositions(user1.address);
            expect(positions.length).to.equal(0);
        });

        it("Should return zero premium for new user", async function () {
            const premium = await vault.getTotalPremiumEarned(user1.address);
            expect(premium).to.equal(0);
        });

        it("Should return zero position count for new user", async function () {
            const count = await vault.getPositionCount(user1.address);
            expect(count).to.equal(0);
        });
    });

    describe("Minimum Collateral", function () {
        it("Should allow owner to update minimum collateral", async function () {
            await vault.updateMinCollateral(ethers.parseUnits("100", 6));
            expect(await vault.minCollateral()).to.equal(ethers.parseUnits("100", 6));
        });
    });

    // Note: executeOrder() cannot be fully tested without a real OptionBook
    // Integration tests should be done on Base Sepolia/Mainnet
    describe("Integration Notes", function () {
        it("Should have OptionBook interface available", async function () {
            // This just verifies the contract deployed correctly
            expect(await vault.getAddress()).to.not.equal(ethers.ZeroAddress);
        });
    });
});
