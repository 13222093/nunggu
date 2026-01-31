'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { CONTRACTS, USDC_DECIMALS } from '@/lib/config';
import { GROUP_VAULT_ABI } from '@/lib/abi';

export function useGroupActions() {
    const { address, isConnected } = useAccount();
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

    const { writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash: txHash,
    });

    // Create Group
    const createGroup = async (groupName: string, initialDeposit: string) => {
        if (!isConnected || !address) {
            setStatus('error');
            setErrorMessage('Please connect your wallet first');
            return false;
        }

        try {
            setStatus('pending');
            const depositAmount = parseUnits(initialDeposit, USDC_DECIMALS);

            writeContract({
                address: CONTRACTS.GROUP_VAULT,
                abi: GROUP_VAULT_ABI,
                functionName: 'createGroup',
                args: [groupName, depositAmount],
            }, {
                onSuccess: (hash) => {
                    setTxHash(hash);
                    setStatus('success');
                },
                onError: (error) => {
                    setStatus('error');
                    setErrorMessage(error.message || 'Failed to create group');
                },
            });

            return true;
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to create group');
            return false;
        }
    };

    // Join Group
    const joinGroup = async (groupId: number, depositAmount: string) => {
        if (!isConnected || !address) {
            setStatus('error');
            setErrorMessage('Please connect your wallet first');
            return false;
        }

        try {
            setStatus('pending');
            const amount = parseUnits(depositAmount, USDC_DECIMALS);

            writeContract({
                address: CONTRACTS.GROUP_VAULT,
                abi: GROUP_VAULT_ABI,
                functionName: 'joinGroup',
                args: [BigInt(groupId), amount],
            }, {
                onSuccess: (hash) => {
                    setTxHash(hash);
                    setStatus('success');
                },
                onError: (error) => {
                    setStatus('error');
                    setErrorMessage(error.message || 'Failed to join group');
                },
            });

            return true;
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to join group');
            return false;
        }
    };

    // Deposit to Group
    const deposit = async (groupId: number, amount: string) => {
        if (!isConnected || !address) {
            setStatus('error');
            setErrorMessage('Please connect your wallet first');
            return false;
        }

        try {
            setStatus('pending');
            const depositAmount = parseUnits(amount, USDC_DECIMALS);

            writeContract({
                address: CONTRACTS.GROUP_VAULT,
                abi: GROUP_VAULT_ABI,
                functionName: 'deposit',
                args: [BigInt(groupId), depositAmount],
            }, {
                onSuccess: (hash) => {
                    setTxHash(hash);
                    setStatus('success');
                },
                onError: (error) => {
                    setStatus('error');
                    setErrorMessage(error.message || 'Failed to deposit');
                },
            });

            return true;
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to deposit');
            return false;
        }
    };

    // Vote on Proposal
    const vote = async (proposalId: number, support: boolean) => {
        if (!isConnected || !address) {
            setStatus('error');
            setErrorMessage('Please connect your wallet first');
            return false;
        }

        try {
            setStatus('pending');

            writeContract({
                address: CONTRACTS.GROUP_VAULT,
                abi: GROUP_VAULT_ABI,
                functionName: 'vote',
                args: [BigInt(proposalId), support],
            }, {
                onSuccess: (hash) => {
                    setTxHash(hash);
                    setStatus('success');
                },
                onError: (error) => {
                    setStatus('error');
                    setErrorMessage(error.message || 'Failed to vote');
                },
            });

            return true;
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Failed to vote');
            return false;
        }
    };

    const reset = () => {
        setStatus('idle');
        setErrorMessage('');
        setTxHash(undefined);
    };

    return {
        createGroup,
        joinGroup,
        deposit,
        vote,
        status,
        errorMessage,
        txHash,
        isPending,
        isConfirming,
        isSuccess,
        reset,
    };
}
