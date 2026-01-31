// ERC20 Standard ABI for USDC approval and balance checks
export const ERC20_ABI = [
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// KITAVault ABI (Solo Vault)
export const KITA_VAULT_ABI = [
  {
    inputs: [
      {
        name: 'order', type: 'tuple', components: [
          { name: 'maker', type: 'address' },
          { name: 'asset', type: 'address' },
          { name: 'strikePrice', type: 'uint256' },
          { name: 'expiry', type: 'uint256' },
          { name: 'premium', type: 'uint256' },
          { name: 'isCall', type: 'bool' },
          { name: 'isLong', type: 'bool' }
        ]
      },
      { name: 'signature', type: 'bytes' },
      { name: 'collateralAmount', type: 'uint256' },
      { name: 'expectedPremium', type: 'uint256' }
    ],
    name: 'executeOrder',
    outputs: [{ name: 'positionId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'positionId', type: 'uint256' }],
    name: 'closePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserPositions',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// GroupVault ABI (Nabung Bareng)
export const GROUP_VAULT_ABI = [
  {
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'initialDeposit', type: 'uint256' }
    ],
    name: 'createGroup',
    outputs: [{ name: 'groupId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'groupId', type: 'uint256' },
      { name: 'deposit', type: 'uint256' }
    ],
    name: 'joinGroup',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'groupId', type: 'uint256' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'groupId', type: 'uint256' },
      { name: 'proposalType', type: 'uint8' },
      { name: 'data', type: 'bytes' }
    ],
    name: 'createProposal',
    outputs: [{ name: 'proposalId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'support', type: 'bool' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'proposalId', type: 'uint256' }],
    name: 'executeProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;