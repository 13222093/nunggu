import { parseAbiItem } from 'viem';
import { publicClient } from '../utils/client';
import { getCurrentConfig } from '../config';
import prisma from '../utils/prisma';
import { telegramService } from './telegram.service';

// Simple in-memory store for MVP (Kept for compatibility limits)
export const recentPositions: any[] = [];
export const recentGroupEvents: any[] = [];

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
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

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

  console.log(`👂 Starting Event Listener on ${config.chain.name}...`);
  telegramService.startPolling();

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

            // 1. Database Logic (HEAD)
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
                amount: collateral?.toString() || '0',
                strikePrice: strikePrice?.toString() || '0',
                expiry: new Date(Number(expiry) * 1000),
                isCall: !!isCall,
                isLong: !!isLong,
                status: 'OPEN',
                txHash: log.transactionHash
              }
            });

            // 2. Bot Logic (Origin/Backend/Bot)
            console.log(`📍 [KITA] New Position: ID ${positionId} | User ${userAddr}`);

            recentPositions.unshift({
              type: 'POSITION_CREATED',
              txHash: log.transactionHash,
              ...log.args,
              timestamp: new Date().toISOString()
            });
            if (recentPositions.length > 100) recentPositions.pop();

            if (adminChatId) {
              telegramService.sendMessage(adminChatId, `🚀 *Posisi Baru Terdeteksi!*\nUser: \`${userAddr?.slice(0, 6)}...${userAddr?.slice(-4)}\`\nCollateral: ${Number(collateral) / 1e6} USDC\nCashback: ${Number(log.args.premium) / 1e6} USDC`);
            }

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

            // 1. Database Logic
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

            // 2. Bot Logic
            console.log(`👥 [GROUP] New Group: ${name} (ID: ${groupId})`);

            recentGroupEvents.unshift({
              type: 'GROUP_CREATED',
              txHash: log.transactionHash,
              ...log.args,
              timestamp: new Date().toISOString()
            });

            if (adminChatId) {
              telegramService.sendMessage(adminChatId, `👥 *Grup Baru Dibuat!*\nNama: ${name}\nAdmin: \`${adminAddr?.slice(0, 6)}...\``);
            }

          } catch (error) {
            console.error('Error processing GroupCreated event:', error);
          }
        }
      }
    });

    // Member Joined (Only in HEAD)
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
                update: { amount: amount?.toString() || '0' },
                create: {
                  groupId: group.id,
                  userId: user.id,
                  amount: amount?.toString() || '0'
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

            // 1. Database Logic
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

            // 2. Bot Logic
            console.log(`🗳️ [GROUP] New Proposal: ID ${proposalId} in Group ${groupId}`);

            recentGroupEvents.unshift({
              type: 'PROPOSAL_CREATED',
              txHash: log.transactionHash,
              ...log.args,
              timestamp: new Date().toISOString()
            });

            if (adminChatId) {
              telegramService.sendMessage(adminChatId, `🗳️ *Voting Dimulai!*\nProposal ID: ${proposalId}\nGrup ID: ${groupId}\n\nKetik /vote untuk ikut berpartisipasi!`);
            }

          } catch (error) {
            console.error('Error processing ProposalCreated event:', error);
          }
        }
      }
    });

    // Strategy Executed (Only in HEAD)
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
                  amount: collateral?.toString() || '0',
                  strikePrice: '0',
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