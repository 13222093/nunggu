import { baseSepolia } from 'viem/chains';
import type { Chain } from 'viem';

export const SUPPORTED_CHAINS: [Chain, ...Chain[]] = [baseSepolia];

// Contract addresses (Base Sepolia testnet)
export const CONTRACTS = {
  // Deployed contract addresses
  KITA_VAULT: '0x1cF7e8fF49cd61D7AAB9850BaC106E0947c31326' as `0x${string}`,
  GROUP_VAULT: '0x9B2b628b1bad3C9983A2E6C0170185d289489c6e' as `0x${string}`,
  USDC: '0x00dcEE3921A5BDf4Baa6bd836D8Bf88cE9cd0bF1' as `0x${string}`, // Mock USDC on Base Sepolia

  // Legacy (for backwards compatibility)
  VAULT_ADDRESS: process.env.NEXT_PUBLIC_VAULT_ADDRESS as `0x${string}` || '0x1cF7e8fF49cd61D7AAB9850BaC106E0947c31326' as `0x${string}`,
  IDRX_ADDRESS: process.env.NEXT_PUBLIC_IDRX_ADDRESS as `0x${string}` || '0x',
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

// USDC decimals
export const USDC_DECIMALS = 6;

// USDC to IDR conversion rate (hardcoded for now)
export const USDC_TO_IDR = 15800;
