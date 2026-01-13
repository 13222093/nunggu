/**
 * Fetch Orders from Thetanuts V4 API
 * 
 * This script fetches available orders from the Thetanuts API
 * and displays them in a readable format for testing.
 * 
 * Usage: npx ts-node scripts/thetanuts-v4/fetchOrders.ts
 */

// Thetanuts V4 API endpoint
const THETANUTS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";

// Known addresses on Base Mainnet
const ADDRESSES = {
    OPTION_BOOK: "0xd58b814C7Ce700f251722b5555e25aE0fa8169A1",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    WETH: "0x4200000000000000000000000000000000000006",
    CBBTC: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    PRICE_FEED_BTC: "0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F",
    PRICE_FEED_ETH: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    // Implementations
    CALL_SPREAD: "0x2Db5aFA04aeE616157Beb53b96612947b3d13eE3",
    PUT_SPREAD: "0x571471B2f823cC6B5683FC99ac6781209BC85F55",
};

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

interface ThetanutsResponse {
    data: {
        orders: ThetanutsOrder[];
        market_data?: {
            BTC: number;
            ETH: number;
        };
    };
}

function getStrategyName(strikesLength: number): string {
    switch (strikesLength) {
        case 2: return "Spread";
        case 3: return "Butterfly";
        case 4: return "Condor";
        default: return "Unknown";
    }
}

function getAssetName(priceFeed: string): string {
    if (priceFeed.toLowerCase() === ADDRESSES.PRICE_FEED_BTC.toLowerCase()) return "BTC";
    if (priceFeed.toLowerCase() === ADDRESSES.PRICE_FEED_ETH.toLowerCase()) return "ETH";
    return "Unknown";
}

function getCollateralName(collateral: string): string {
    if (collateral.toLowerCase() === ADDRESSES.USDC.toLowerCase()) return "USDC";
    if (collateral.toLowerCase() === ADDRESSES.WETH.toLowerCase()) return "WETH";
    if (collateral.toLowerCase() === ADDRESSES.CBBTC.toLowerCase()) return "CBBTC";
    return "Unknown";
}

async function fetchOrders(): Promise<ThetanutsOrder[]> {
    console.log("🔍 Fetching orders from Thetanuts V4 API...\n");
    console.log(`   Endpoint: ${THETANUTS_API}\n`);

    const response = await fetch(THETANUTS_API);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: ThetanutsResponse = await response.json();

    console.log(`✅ Received ${data.data.orders.length} orders\n`);

    if (data.data.market_data) {
        console.log("📊 Market Data:");
        console.log(`   BTC: $${data.data.market_data.BTC.toLocaleString()}`);
        console.log(`   ETH: $${data.data.market_data.ETH.toLocaleString()}\n`);
    }

    return data.data.orders;
}

function displayOrders(orders: ThetanutsOrder[]) {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("                     AVAILABLE ORDERS");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Filter for PUT options (what we need for "Get Paid to Wait")
    const putOrders = orders.filter(o => !o.order.isCall);
    const callOrders = orders.filter(o => o.order.isCall);

    console.log(`📈 CALL Orders: ${callOrders.length}`);
    console.log(`📉 PUT Orders: ${putOrders.length} (relevant for NUNGGU)\n`);

    // Display PUT orders in detail
    console.log("=== PUT ORDERS (for \"Get Paid to Wait\") ===\n");

    putOrders.slice(0, 5).forEach((orderData, index) => {
        const o = orderData.order;
        const strategy = getStrategyName(o.strikes.length);
        const asset = getAssetName(o.priceFeed);
        const collateral = getCollateralName(o.collateral);
        const pricePerContract = Number(o.price) / 1e8;
        const maxCollateral = Number(o.maxCollateralUsable) / 1e6; // USDC has 6 decimals
        const strikes = o.strikes.map(s => (s / 1e8).toLocaleString());
        const expiry = new Date(o.expiry * 1000).toISOString().split('T')[0];
        const orderExpiry = new Date(o.orderExpiryTimestamp * 1000).toISOString();

        console.log(`Order #${index + 1}`);
        console.log(`   Asset: ${asset}`);
        console.log(`   Type: PUT ${strategy}`);
        console.log(`   Direction: ${o.isLong ? "LONG (buying)" : "SHORT (selling)"}`);
        console.log(`   Collateral: ${collateral}`);
        console.log(`   Strikes: [${strikes.join(", ")}]`);
        console.log(`   Price/Contract: ${pricePerContract.toFixed(4)} ${collateral}`);
        console.log(`   Max Collateral: ${maxCollateral.toLocaleString()} ${collateral}`);
        console.log(`   Option Expiry: ${expiry}`);
        console.log(`   Order Expires: ${orderExpiry}`);
        console.log(`   Maker: ${o.maker.slice(0, 10)}...${o.maker.slice(-8)}`);
        console.log(`   Signature: ${orderData.signature.slice(0, 20)}...`);
        console.log();
    });

    if (putOrders.length > 5) {
        console.log(`   ... and ${putOrders.length - 5} more PUT orders\n`);
    }

    // Return first PUT order for testing
    return putOrders[0];
}

async function main() {
    try {
        const orders = await fetchOrders();

        if (orders.length === 0) {
            console.log("⚠️  No orders available. Market makers may be offline.");
            return;
        }

        const firstPutOrder = displayOrders(orders);

        if (firstPutOrder) {
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("   SAMPLE ORDER FOR TESTING (copy to testFillOrder.ts)");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
            console.log(JSON.stringify(firstPutOrder, null, 2));
        }

    } catch (error) {
        console.error("❌ Error fetching orders:", error);
    }
}

main();
