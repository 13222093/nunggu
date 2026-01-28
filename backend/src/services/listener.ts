import { parseAbiItem } from 'viem';
import { publicClient } from '../utils/client';
import { getCurrentConfig } from '../config';
import prisma from '../utils/prisma';
import { Decimal } from '@prisma/client/runtime/library';

// ABIs
const PositionCreatedAbi = parseAbiItem(
  'event PositionCreated(address indexed user, uint256 indexed positionId, address optionContract, uint256 collateral, uint256 premium, uint256 strikePrice, uint256 expiry, bool isCall, bool isLong)'
);

const GroupCreatedAbi = parseAbiItem(
  'event GroupCreated(uint256 indexed groupId, string name, address indexed admin)'
);

const MemberJoinedAbi = parseAbiItem(
  'event MemberJoined(uint256 indexed groupId, address indexed member, uint256 amount)'
);

const ProposalCreatedAbi = parseAbiItem(
  'event ProposalCreated(uint256 indexed proposalId, uint256 indexed groupId, uint8 proposalType, address indexed proposer)'
);

const StrategyExecutedAbi = parseAbiItem(
  'event StrategyExecuted(uint256 indexed groupId, address optionContract, uint256 collateral, uint256 premium)'
);

export const startEventListener = () => {
  const config = getCurrentConfig();
  const kitaVaultAddress = config.contracts.kitaVault as `0x${string}`;
  const groupVaultAddress = config.contracts.groupVault as `0x${string}`;

  // Helper to ensure user exists
  const ensureUser = async (address: string) => {
    let user = await prisma.user.findUnique({
      where: { walletAddress: address }
    });
    if (!user) {
      user = await prisma.user.create({
        data: { walletAddress: address }
      });
    }
    return user;
  };

  // Listener for KITAVault
  if (kitaVaultAddress && !kitaVaultAddress.startsWith("0x0000")) {
    publicClient.watchEvent({
      address: kitaVaultAddress,
      event: PositionCreatedAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            const { user: userAddr, positionId, optionContract, collateral, strikePrice, expiry, isCall, isLong } = log.args;
            if (!userAddr || positionId === undefined) continue;

            const user = await ensureUser(userAddr);

            await prisma.position.upsert({
              where: { onchainId: Number(positionId) },
              update: {
                status: 'OPEN',
                txHash: log.transactionHash
              },
              create: {
                onchainId: Number(positionId),
                userId: user.id,
                vaultAddress: optionContract || '',
                assetSymbol: (Number(strikePrice || 0) > 50000e8) ? 'BTC' : 'ETH',
                amount: new Decimal(collateral?.toString() || '0'),
                strikePrice: new Decimal(strikePrice?.toString() || '0'),
                expiry: new Date(Number(expiry) * 1000),
                isCall: !!isCall,
                isLong: !!isLong,
                status: 'OPEN',
                txHash: log.transactionHash
              }
            });
          } catch (error) {
            console.error('Error processing PositionCreated event:', error);
          }
        }
      }
    });
  }

  // Listener for GroupVault
  if (groupVaultAddress && !groupVaultAddress.startsWith("0x0000")) {
    // Group Created
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: GroupCreatedAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            const { groupId, name, admin: adminAddr } = log.args;
            if (groupId === undefined || !adminAddr) continue;

            const admin = await ensureUser(adminAddr);

            await prisma.group.upsert({
              where: { onchainId: Number(groupId) },
              update: { name: name || 'Unnamed Group', adminId: admin.id },
              create: {
                onchainId: Number(groupId),
                name: name || 'Unnamed Group',
                adminId: admin.id
              }
            });
          } catch (error) {
            console.error('Error processing GroupCreated event:', error);
          }
        }
      }
    });

    // Member Joined
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: MemberJoinedAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            const { groupId, member: memberAddr, amount } = log.args;
            if (groupId === undefined || !memberAddr) continue;

            const user = await ensureUser(memberAddr);
            const group = await prisma.group.findUnique({
              where: { onchainId: Number(groupId) }
            });

            if (group) {
              await prisma.groupMember.upsert({
                where: {
                  groupId_userId: {
                    groupId: group.id,
                    userId: user.id
                  }
                },
                update: { amount: new Decimal(amount?.toString() || '0') },
                create: {
                  groupId: group.id,
                  userId: user.id,
                  amount: new Decimal(amount?.toString() || '0')
                }
              });
            }
          } catch (error) {
            console.error('Error processing MemberJoined event:', error);
          }
        }
      }
    });

    // Proposal Created
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: ProposalCreatedAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            const { proposalId, groupId, proposalType, proposer: proposerAddr } = log.args;
            if (proposalId === undefined || groupId === undefined || !proposerAddr) continue;

            const proposer = await ensureUser(proposerAddr);
            const group = await prisma.group.findUnique({
              where: { onchainId: Number(groupId) }
            });

            if (group) {
              await prisma.proposal.upsert({
                where: { onchainId: Number(proposalId) },
                update: {},
                create: {
                  onchainId: Number(proposalId),
                  groupId: group.id,
                  proposerId: proposer.id,
                  proposalType: Number(proposalType),
                  status: 'PENDING',
                  deadline: new Date(Date.now() + 48 * 60 * 60 * 1000) // Default 48h
                }
              });
            }
          } catch (error) {
            console.error('Error processing ProposalCreated event:', error);
          }
        }
      }
    });

    // Strategy Executed
    publicClient.watchEvent({
      address: groupVaultAddress,
      event: StrategyExecutedAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            const { groupId, optionContract, collateral } = log.args;
            if (groupId === undefined) continue;

            const group = await prisma.group.findUnique({
              where: { onchainId: Number(groupId) }
            });

            if (group) {
              await prisma.position.create({
                data: {
                  groupId: group.id,
                  vaultAddress: optionContract || '',
                  assetSymbol: 'ETH', // Default
                  amount: new Decimal(collateral?.toString() || '0'),
                  strikePrice: new Decimal(0), 
                  expiry: new Date(),
                  status: 'OPEN',
                  txHash: log.transactionHash
                }
              });
            }
          } catch (error) {
            console.error('Error processing StrategyExecuted event:', error);
          }
        }
      }
    });
  }
};