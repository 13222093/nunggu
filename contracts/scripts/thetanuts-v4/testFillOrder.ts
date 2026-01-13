/**
 * Test fillOrder on Thetanuts V4 OptionBook
 * 
 * This script tests the fillOrder function with a real order from the API.
 * 
 * IMPORTANT: This will execute a REAL trade on Base Mainnet!
 * Make sure you have:
 * - USDC in your wallet
 * - Approved the OptionBook contract to spend your USDC
 * - Set your private key in .env
 * 
 * Usage: npx hardhat run scripts/thetanuts-v4/testFillOrder.ts --network base
 */

import { ethers } from "hardhat";

// Thetanuts V4 Contract Addresses (Base Mainnet)
const OPTION_BOOK = "0xd58b814C7Ce700f251722b5555e25aE0fa8169A1";
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const THETANUTS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";

// Your platform's referrer address (use your deployer/owner address)
// This tracks referral fees for your platform
const YOUR_REFERRER = "0x0000000000000000000000000000000000000000"; // TODO: Set to your address

// Minimal ABIs
const OPTION_BOOK_ABI = [
    {
        "inputs": [
            {
                "components": [
                    { "internalType": "address", "name": "maker", "type": "address" },
                    { "internalType": "uint256", "name": "orderExpiryTimestamp", "type": "uint256" },
                    { "internalType": "address", "name": "collateral", "type": "address" },
                    { "internalType": "bool", "name": "isCall", "type": "bool" },
                    { "internalType": "address", "name": "priceFeed", "type": "address" },
                    { "internalType": "address", "name": "implementation", "type": "address" },
                    { "internalType": "bool", "name": "isLong", "type": "bool" },
                    { "internalType": "uint256", "name": "maxCollateralUsable", "type": "uint256" },
                    { "internalType": "uint256[]", "name": "strikes", "type": "uint256[]" },
                    { "internalType": "uint256", "name": "expiry", "type": "uint256" },
                    { "internalType": "uint256", "name": "price", "type": "uint256" },
                    { "internalType": "uint256", "name": "numContracts", "type": "uint256" },
                    { "internalType": "bytes", "name": "extraOptionData", "type": "bytes" }
                ],
                "internalType": "struct OptionBook.Order",
                "name": "order",
                "type": "tuple"
            },
            { "internalType": "bytes", "name": "signature", "type": "bytes" },
            { "internalType": "address", "name": "referrer", "type": "address" }
        ],
        "name": "fillOrder",
        "outputs": [{ "internalType": "address", "name": "optionAddress", "type": "address" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const ERC20_ABI = [
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

interface ThetanutsOrder {
    order: {
        maker: string;
        collateral: string;
        isCall: boolean;
        priceFeed: string;
        implementation: string;
        strikes: number[];
        expiry: number;
        price: string;
        maxCollateralUsable: string;
        isLong: boolean;
        orderExpiryTimestamp: number;
        numContracts: string;
        extraOptionData: string;
    };
    nonce: string;
    signature: string;
    optionBookAddress: string;
}

async function fetchFirstPutOrder(): Promise<ThetanutsOrder | null> {
    console.log("🔍 Fetching orders from Thetanuts API...");

    const response = await fetch(THETANUTS_API);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const orders = data.data.orders as ThetanutsOrder[];

    // Find first PUT order (isCall = false)
    const putOrder = orders.find(o => !o.order.isCall);

    if (putOrder) {
        console.log("✅ Found PUT order for testing\n");
    }

    return putOrder || null;
}

async function main() {
    console.log("🧪 Thetanuts V4 fillOrder Test\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    const [signer] = await ethers.getSigners();
    const userAddress = await signer.getAddress();

    console.log("👤 Signer:", userAddress);
    console.log("🌐 Network:", (await ethers.provider.getNetwork()).name);
    console.log();

    // Fetch a real order from the API
    const orderData = await fetchFirstPutOrder();

    if (!orderData) {
        console.log("❌ No PUT orders available. Try again later.");
        return;
    }

    const o = orderData.order;
    const pricePerContract = Number(o.price) / 1e8;

    console.log("📋 Order Details:");
    console.log(`   Type: ${o.isCall ? "CALL" : "PUT"}`);
    console.log(`   Direction: ${o.isLong ? "LONG" : "SHORT"}`);
    console.log(`   Price/Contract: ${pricePerContract} USDC`);
    console.log(`   Strikes: [${o.strikes.map(s => s / 1e8).join(", ")}]`);
    console.log(`   Expiry: ${new Date(o.expiry * 1000).toISOString()}`);
    console.log();

    // Connect to contracts
    const usdc = new ethers.Contract(USDC, ERC20_ABI, signer);
    const optionBook = new ethers.Contract(OPTION_BOOK, OPTION_BOOK_ABI, signer);

    // Check USDC balance
    const balance = await usdc.balanceOf(userAddress);
    const decimals = await usdc.decimals();
    console.log(`💰 USDC Balance: ${ethers.formatUnits(balance, decimals)} USDC`);

    // Calculate how many contracts we can buy with $1 USDC (for testing)
    const testAmount = 1; // $1 USDC for minimal test
    const contractsToBuy = testAmount / pricePerContract;
    const numContracts = Math.floor(contractsToBuy * 1e6); // Scale to 6 decimals

    console.log(`🎯 Test Trade:`);
    console.log(`   Amount: ${testAmount} USDC`);
    console.log(`   Contracts: ${numContracts / 1e6}`);
    console.log();

    if (Number(balance) < testAmount * 1e6) {
        console.log("❌ Insufficient USDC balance for test trade.");
        console.log(`   Need: ${testAmount} USDC`);
        console.log(`   Have: ${ethers.formatUnits(balance, decimals)} USDC`);
        console.log("\n⚠️  DRY RUN COMPLETE - Would execute if you had funds.\n");

        // Show what the transaction would look like
        console.log("📝 Transaction that WOULD be sent:");
        console.log(JSON.stringify({
            to: OPTION_BOOK,
            function: "fillOrder",
            args: {
                order: {
                    maker: o.maker,
                    orderExpiryTimestamp: o.orderExpiryTimestamp,
                    collateral: o.collateral,
                    isCall: o.isCall,
                    priceFeed: o.priceFeed,
                    implementation: o.implementation,
                    isLong: o.isLong,
                    maxCollateralUsable: o.maxCollateralUsable,
                    strikes: o.strikes,
                    expiry: o.expiry,
                    price: o.price,
                    numContracts: numContracts.toString(),
                    extraOptionData: o.extraOptionData || "0x"
                },
                signature: orderData.signature.slice(0, 66) + "...",
                referrer: YOUR_REFERRER
            }
        }, null, 2));

        return;
    }

    // Check allowance and approve if needed
    const required = ethers.parseUnits(testAmount.toString(), 6);
    const allowance = await usdc.allowance(userAddress, OPTION_BOOK);

    if (allowance < required) {
        console.log("🔓 Approving USDC...");
        const approveTx = await usdc.approve(OPTION_BOOK, required);
        await approveTx.wait();
        console.log("✅ Approval confirmed\n");
    }

    // Build order params (DO NOT modify the order fields!)
    const orderParams = {
        maker: o.maker,
        orderExpiryTimestamp: o.orderExpiryTimestamp,
        collateral: o.collateral,
        isCall: o.isCall,
        priceFeed: o.priceFeed,
        implementation: o.implementation,
        isLong: o.isLong,
        maxCollateralUsable: o.maxCollateralUsable,
        strikes: o.strikes,
        expiry: o.expiry,
        price: o.price,
        numContracts: numContracts.toString(),
        extraOptionData: o.extraOptionData || "0x"
    };

    console.log("📤 Executing fillOrder...");

    try {
        const tx = await optionBook.fillOrder(
            orderParams,
            orderData.signature,
            YOUR_REFERRER
        );

        console.log(`   Tx Hash: ${tx.hash}`);
        console.log("   Waiting for confirmation...");

        const receipt = await tx.wait();

        if (receipt.status === 1) {
            console.log("\n✅ SUCCESS! fillOrder executed!");
            console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
            console.log(`   Block: ${receipt.blockNumber}`);

            // The return value is the option contract address
            // TODO: Parse from receipt logs
            console.log("\n🎉 You now own options! Check BaseScan for details.");
        } else {
            console.log("\n❌ Transaction failed");
        }
    } catch (error: any) {
        console.log("\n❌ fillOrder failed:");
        console.log(`   ${error.message}`);

        if (error.data) {
            console.log(`   Data: ${error.data}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });
