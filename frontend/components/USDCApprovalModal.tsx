'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { ERC20_ABI } from '@/lib/abi';
import { CONTRACTS, USDC_DECIMALS } from '@/lib/config';

interface USDCApprovalModalProps {
    amount: string; // Amount in USDC (e.g., "1000")
    spender: `0x${string}`; // Contract address to approve
    onApproved: () => void;
    onClose: () => void;
}

export function USDCApprovalModal({ amount, spender, onApproved, onClose }: USDCApprovalModalProps) {
    const { address } = useAccount();
    const [status, setStatus] = useState<'checking' | 'needsApproval' | 'approving' | 'approved' | 'error'>('checking');
    const [errorMessage, setErrorMessage] = useState('');

    // Check current allowance
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: CONTRACTS.USDC,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: address ? [address, spender] : undefined,
    });

    // Check USDC balance
    const { data: balance } = useReadContract({
        address: CONTRACTS.USDC,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
    });

    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    // Check if approval is needed
    useEffect(() => {
        if (allowance !== undefined) {
            const amountBigInt = parseUnits(amount, USDC_DECIMALS);
            if (allowance >= amountBigInt) {
                setStatus('approved');
                // Auto-proceed if already approved
                setTimeout(() => onApproved(), 500);
            } else {
                setStatus('needsApproval');
            }
        }
    }, [allowance, amount, onApproved]);

    // Handle approval success
    useEffect(() => {
        if (isConfirmed) {
            setStatus('approved');
            refetchAllowance();
            setTimeout(() => onApproved(), 1000);
        }
    }, [isConfirmed, onApproved, refetchAllowance]);

    // Handle errors
    useEffect(() => {
        if (error) {
            setStatus('error');
            setErrorMessage(error.message || 'Approval failed');
        }
    }, [error]);

    const handleApprove = async () => {
        try {
            setStatus('approving');
            const amountBigInt = parseUnits(amount, USDC_DECIMALS);

            writeContract({
                address: CONTRACTS.USDC,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [spender, amountBigInt],
            });
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Failed to approve');
        }
    };

    const balanceFormatted = balance ? formatUnits(balance, USDC_DECIMALS) : '0';
    const hasEnoughBalance = balance ? balance >= parseUnits(amount, USDC_DECIMALS) : false;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-white/50 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-black text-[#0A4A7C] mb-2">
                        USDC Approval
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 font-medium">
                        Approve USDC to execute this order
                    </p>
                </div>

                {/* Balance Check */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 font-semibold">Your USDC Balance:</span>
                        <span className="text-base font-black text-[#0A4A7C]">{parseFloat(balanceFormatted).toFixed(2)} USDC</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 font-semibold">Required Amount:</span>
                        <span className="text-base font-black text-purple-600">{amount} USDC</span>
                    </div>

                    {!hasEnoughBalance && (
                        <div className="mt-3 p-3 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 font-semibold">
                                Insufficient USDC balance. Please deposit more USDC first.
                            </p>
                        </div>
                    )}
                </div>

                {/* Status Display */}
                <div className="mb-6">
                    {status === 'checking' && (
                        <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-2xl">
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                            <span className="text-blue-700 font-semibold">Checking approval status...</span>
                        </div>
                    )}

                    {status === 'needsApproval' && (
                        <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl">
                            <p className="text-sm text-purple-700 font-semibold mb-2">
                                ⚠️ Approval Required
                            </p>
                            <p className="text-xs text-purple-600">
                                You need to approve {amount} USDC before executing this order.
                            </p>
                        </div>
                    )}

                    {(status === 'approving' || isConfirming) && (
                        <div className="flex items-center justify-center gap-3 p-4 bg-yellow-50 rounded-2xl">
                            <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
                            <span className="text-yellow-700 font-semibold">
                                {isPending ? 'Waiting for signature...' : 'Confirming approval...'}
                            </span>
                        </div>
                    )}

                    {status === 'approved' && (
                        <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-2xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold">✅ USDC Approved!</span>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                            <p className="text-sm text-red-700 font-semibold mb-1">❌ Approval Failed</p>
                            <p className="text-xs text-red-600">{errorMessage}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>

                    {status === 'needsApproval' && (
                        <button
                            onClick={handleApprove}
                            disabled={!hasEnoughBalance || isPending}
                            className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${hasEnoughBalance && !isPending
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-[1.02] shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isPending ? 'Approving...' : 'Approve USDC'}
                        </button>
                    )}
                </div>

                {/* Transaction Hash */}
                {hash && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-600 font-semibold mb-1">Transaction Hash:</p>
                        <a
                            href={`https://sepolia.basescan.org/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-700 font-mono break-all"
                        >
                            {hash}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
