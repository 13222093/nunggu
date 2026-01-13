import { ethers } from "hardhat";

/**
 * Deploy KITAVault to Base Mainnet or Sepolia
 * 
 * Usage:
 *   npx hardhat run scripts/deploy-kita.ts --network base
 *   npx hardhat run scripts/deploy-kita.ts --network baseSepolia
 */

// Base Mainnet addresses
const BASE_MAINNET = {
    OPTION_BOOK: "0xd58b814C7Ce700f251722b5555e25aE0fa8169A1",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    AAVE_POOL: "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",
};

// For testing - use mock addresses or deploy mocks
const LOCAL_TEST = {
    // These will be deployed by the script
};

async function main() {
    const [deployer] = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();

    console.log("🚀 Deploying KITAVault\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Network: ${network.name} (chainId: ${network.chainId})`);
    console.log(`Deployer: ${deployer.address}`);
    console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    let optionBookAddress: string;
    let usdcAddress: string;
    let aavePoolAddress: string;

    if (network.chainId === 8453n) {
        // Base Mainnet
        console.log("📍 Using Base Mainnet addresses\n");
        optionBookAddress = BASE_MAINNET.OPTION_BOOK;
        usdcAddress = BASE_MAINNET.USDC;
        aavePoolAddress = BASE_MAINNET.AAVE_POOL;
    } else if (network.chainId === 84532n) {
        // Base Sepolia - for testing, might need to deploy mocks
        console.log("📍 Base Sepolia - deploying mock contracts first\n");

        // Deploy Mock USDC
        const MockERC20 = await ethers.getContractFactory("MockERC20");
        const usdc = await MockERC20.deploy("USD Coin", "USDC", 6);
        await usdc.waitForDeployment();
        usdcAddress = await usdc.getAddress();
        console.log(`✅ Mock USDC: ${usdcAddress}`);

        // Deploy Mock Aave
        const MockAave = await ethers.getContractFactory("MockAave");
        const aave = await MockAave.deploy();
        await aave.waitForDeployment();
        aavePoolAddress = await aave.getAddress();
        console.log(`✅ Mock Aave: ${aavePoolAddress}`);

        // For OptionBook, we need to use a placeholder or the real one if available
        // Using deployer address as placeholder - won't work for actual trades
        optionBookAddress = deployer.address;
        console.log(`⚠️  Mock OptionBook: ${optionBookAddress} (placeholder)\n`);
    } else {
        // Local hardhat network
        console.log("📍 Local network - deploying all mocks\n");

        const MockERC20 = await ethers.getContractFactory("MockERC20");
        const usdc = await MockERC20.deploy("USD Coin", "USDC", 6);
        await usdc.waitForDeployment();
        usdcAddress = await usdc.getAddress();
        console.log(`✅ Mock USDC: ${usdcAddress}`);

        const MockAave = await ethers.getContractFactory("MockAave");
        const aave = await MockAave.deploy();
        await aave.waitForDeployment();
        aavePoolAddress = await aave.getAddress();
        console.log(`✅ Mock Aave: ${aavePoolAddress}`);

        optionBookAddress = deployer.address;
        console.log(`⚠️  Mock OptionBook: ${optionBookAddress} (placeholder)\n`);
    }

    // Deploy KITAVault
    console.log("📝 Deploying KITAVault...");
    const KITAVault = await ethers.getContractFactory("KITAVault");
    const vault = await KITAVault.deploy(
        optionBookAddress,
        usdcAddress,
        aavePoolAddress,
        deployer.address // Referrer = deployer for now
    );
    await vault.waitForDeployment();
    const vaultAddress = await vault.getAddress();

    console.log(`✅ KITAVault deployed: ${vaultAddress}\n`);

    // Summary
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("                    DEPLOYMENT SUMMARY");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log(`KITAVault:    ${vaultAddress}`);
    console.log(`OptionBook:   ${optionBookAddress}`);
    console.log(`USDC:         ${usdcAddress}`);
    console.log(`Aave Pool:    ${aavePoolAddress}`);
    console.log(`Referrer:     ${deployer.address}`);
    console.log();

    // Verification command
    if (network.chainId === 8453n || network.chainId === 84532n) {
        console.log("📝 To verify on BaseScan:");
        console.log(`npx hardhat verify --network ${network.name} ${vaultAddress} "${optionBookAddress}" "${usdcAddress}" "${aavePoolAddress}" "${deployer.address}"`);
    }

    return { vault, vaultAddress };
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });
