/**
 * Fetch Orders from Thetanuts V4 API (JavaScript version)
 * 
 * Usage: node scripts/thetanuts-v4/fetchOrders.js
 */

const THETANUTS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";

const PRICE_FEED_BTC = "0x64c911996D3c6aC71f9b455B1E8E7266BcbD848F";
const PRICE_FEED_ETH = "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70";
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

async function main() {
    console.log("🔍 Fetching orders from Thetanuts V4 API...\n");
    console.log(`   Endpoint: ${THETANUTS_API}\n`);

    const response = await fetch(THETANUTS_API);
    const data = await response.json();
    const orders = data.data.orders;

    console.log(`✅ Received ${orders.length} orders\n`);

    if (data.data.market_data) {
        console.log("📊 Market Data:");
        console.log(`   BTC: $${data.data.market_data.BTC.toLocaleString()}`);
        console.log(`   ETH: $${data.data.market_data.ETH.toLocaleString()}\n`);
    }

    const putOrders = orders.filter(o => !o.order.isCall);
    const callOrders = orders.filter(o => o.order.isCall);

    console.log(`📈 CALL Orders: ${callOrders.length}`);
    console.log(`📉 PUT Orders: ${putOrders.length} (relevant for NUNGGU)\n`);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("          PUT ORDERS (for \"Get Paid to Wait\")");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    putOrders.slice(0, 3).forEach((orderData, index) => {
        const o = orderData.order;
        const strategyMap = { 2: "Spread", 3: "Butterfly", 4: "Condor" };
        const strategy = strategyMap[o.strikes.length] || "Unknown";
        const asset = o.priceFeed.toLowerCase() === PRICE_FEED_BTC.toLowerCase() ? "BTC" : "ETH";
        const pricePerContract = Number(o.price) / 1e8;
        const maxCollateral = Number(o.maxCollateralUsable) / 1e6;
        const strikes = o.strikes.map(s => (s / 1e8).toLocaleString());
        const expiry = new Date(o.expiry * 1000).toISOString().split('T')[0];

        console.log(`Order #${index + 1}`);
        console.log(`   Asset: ${asset}`);
        console.log(`   Type: PUT ${strategy}`);
        console.log(`   Direction: ${o.isLong ? "LONG (buying)" : "SHORT (selling)"}`);
        console.log(`   Strikes: [${strikes.join(", ")}]`);
        console.log(`   Price/Contract: ${pricePerContract.toFixed(6)} USDC`);
        console.log(`   Max Collateral: ${maxCollateral.toLocaleString()} USDC`);
        console.log(`   Option Expiry: ${expiry}`);
        console.log(`   Maker: ${o.maker.slice(0, 10)}...${o.maker.slice(-8)}`);
        console.log();
    });

    if (putOrders.length > 0) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("   FIRST PUT ORDER (for testFillOrder.ts)");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        console.log(JSON.stringify(putOrders[0], null, 2));
    }
}

main().catch(console.error);
