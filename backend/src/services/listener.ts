import { createPublicClient, http, parseAbiItem } from 'viem';
import { baseSepolia } from 'viem/chains';

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.BASE_RPC_URL)
});

// ABI minimal for events
const PositionCreatedAbi = parseAbiItem(
  'event PositionCreated(address indexed user, uint256 collateral, uint256 premium)'
);

export const startEventListener = () => {
  console.log("👂 Listening for blockchain events...");

  client.watchEvent({
    address: process.env.VAULT_ADDRESS as `0x${string}`,
    event: PositionCreatedAbi,
    onLogs: (logs) => {
      logs.forEach(log => {
        const { user, collateral, premium } = log.args;
        console.log(`New Position: ${user} | Collateral: ${collateral} | Premium: ${premium}`);
        // TODO: Save to DB or trigger Notification
      });
    }
  });
};