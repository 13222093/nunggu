import { parseAbiItem } from 'viem';
import { publicClient } from '../utils/client';
import { getCurrentConfig } from '../config';

// Simple in-memory store for MVP
export const recentPositions: any[] = [];
export const recentGroupEvents: any[] = [];

// ABIs
const PositionCreatedAbi = parseAbiItem(
  'event PositionCreated(address indexed user, uint256 indexed positionId, address optionContract, uint256 collateral, uint256 premium, uint256 strikePrice, uint256 expiry, bool isCall, bool isLong)'
);

const GroupCreatedAbi = parseAbiItem(
  'event GroupCreated(uint256 indexed groupId, string name, address indexed admin)'
);

const ProposalCreatedAbi = parseAbiItem(
  'event ProposalCreated(uint256 indexed proposalId, uint256 indexed groupId, uint8 proposalType, address indexed proposer)'
);

export const startEventListener = () => {
  const config = getCurrentConfig();
  const kitaVaultAddress = config.contracts.kitaVault as `0x${string}`;
  const groupVaultAddress = config.contracts.groupVault as `0x${string}`;

  // Listener for KITAVault
  if (kitaVaultAddress && !kitaVaultAddress.startsWith("0x0000")) {
    publicClient.watchEvent({
      address: kitaVaultAddress,
      event: PositionCreatedAbi,
      onLogs: (logs) => {
        logs.forEach(log => {
          const args = log.args;
          recentPositions.unshift({
            type: 'POSITION_CREATED',
            txHash: log.transactionHash,
            ...args,
            timestamp: new Date().toISOString()
          });
          if (recentPositions.length > 100) recentPositions.pop();
        });
      }
    });
  }

  // Listener for GroupVault
  if (groupVaultAddress && !groupVaultAddress.startsWith("0x0000")) {
    // Group Created
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: GroupCreatedAbi,
      onLogs: (logs) => {
        logs.forEach(log => {
          const args = log.args;
          recentGroupEvents.unshift({
            type: 'GROUP_CREATED',
            txHash: log.transactionHash,
            ...args,
            timestamp: new Date().toISOString()
          });
        });
      }
    });

    // Proposal Created
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: ProposalCreatedAbi,
      onLogs: (logs) => {
        logs.forEach(log => {
          const args = log.args;
          recentGroupEvents.unshift({
            type: 'PROPOSAL_CREATED',
            txHash: log.transactionHash,
            ...args,
            timestamp: new Date().toISOString()
          });
        });
      }
    });
  }
};