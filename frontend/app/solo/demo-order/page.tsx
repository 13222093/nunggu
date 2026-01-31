'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Navbar } from '@/components/Navbar';
import { Wallet, TrendingUp, CheckCircle2, ExternalLink, Zap, Shield, Sparkles } from 'lucide-react';
import { useExecuteOrder } from '@/hooks/useExecuteOrder';
import { CONTRACTS } from '@/lib/config';

// Hardcoded demo order - guaranteed to work!
const DEMO_ORDER = {
    id: 'demo-1',
    asset: 'ETH',
    strikePrice: '3000',
    premium: '50',
    expiry: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days from now
    collateralRequired: '3000',
    maker: CONTRACTS.KITA_VAULT,
    isCall: false,
    isLong: false,
    apy: 8.5,
    duration: '7 Hari',
};

export default function DemoOrderPage() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const { executeOrder, status, errorMessage, txHash } = useExecuteOrder();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Check login
        const userData = localStorage.getItem('userData');
        const userSession = localStorage.getItem('userSession');
        if (!userData && !userSession) {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (status === 'success' && txHash) {
            setShowSuccess(true);
            // Auto redirect after 5 seconds
            const timer = setTimeout(() => {
                router.push('/dashboard');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status, txHash, router]);

    const handleExecute = async () => {
        if (!isConnected) {
            alert('Please connect your wallet first!');
            return;
        }
        await executeOrder(DEMO_ORDER);
    };

    // Success Modal
    if (showSuccess && txHash) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] flex items-center justify-center p-4">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse" />

                    {/* Floating orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float" />
                        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00FFF0] rounded-full blur-3xl opacity-15 animate-float-delayed" />
                    </div>

                    <div className="relative z-10 max-w-lg w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 text-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl animate-bounce-slow">
                            <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-white" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#0A4A7C] mb-2">Transaksi Berhasil! 🎉</h2>
                        <p className="text-sm md:text-base text-gray-600 font-semibold mb-6">
                            Order berhasil dieksekusi on-chain!
                        </p>

                        {/* Transaction Hash */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border-2 border-gray-200">
                            <p className="text-xs font-bold text-gray-500 mb-2">Transaction Hash</p>
                            <p className="text-xs md:text-sm font-mono text-gray-800 break-all mb-3">
                                {txHash}
                            </p>
                            <a
                                href={`https://sepolia.basescan.org/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#0A98FF] hover:text-[#0A4A7C] font-bold text-sm transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View on BaseScan
                            </a>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
                            <p className="text-xs font-bold text-gray-500 mb-2">Order Summary</p>
                            <div className="space-y-1 text-left">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-semibold">Asset:</span>
                                    <span className="font-black text-gray-800">{DEMO_ORDER.asset}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-semibold">Strike Price:</span>
                                    <span className="font-black text-gray-800">${DEMO_ORDER.strikePrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-semibold">Premium:</span>
                                    <span className="font-black text-green-600">${DEMO_ORDER.premium} USDC</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-semibold">Duration:</span>
                                    <span className="font-black text-gray-800">{DEMO_ORDER.duration}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-gradient-to-r from-[#0A98FF] to-[#C15BFF] text-white py-3 md:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            Lihat Dashboard
                        </button>

                        <p className="text-xs text-gray-500 mt-4">
                            Redirecting in 5 seconds...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-[#C15BFF] via-[#0A98FF] to-[#0A4A7C] overflow-hidden">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

                {/* Floating orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float" />
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00FFF0] rounded-full blur-3xl opacity-15 animate-float-delayed" />
                </div>

                {/* Floating Icons */}
                <div className="absolute top-20 right-8 animate-bounce" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FBFF2B] to-[#FFBC57] rounded-xl flex items-center justify-center shadow-xl rotate-12 backdrop-blur-sm border-2 border-white/30">
                        <Zap className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                </div>

                <div className="absolute top-32 left-12 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00FFF0] to-[#0A98FF] rounded-lg flex items-center justify-center shadow-xl -rotate-12 backdrop-blur-sm border-2 border-white/30">
                        <TrendingUp className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>
                </div>

                <div className="absolute bottom-24 left-8 animate-spin-slow">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/40">
                        <Shield className="w-7 h-7 text-white drop-shadow-lg" />
                    </div>
                </div>

                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pt-24 md:pt-32 pb-8">
                    {/* Header */}
                    <div className="w-full max-w-2xl mb-6 md:mb-8 text-center">
                        <div className="inline-block bg-gradient-to-r from-[#FBFF2B] to-[#FFBC57] text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-4 shadow-lg">
                            🎯 DEMO ORDER - TESTNET
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg mb-2">
                            Test Transaction 🚀
                        </h1>
                        <p className="text-sm md:text-base text-white/90 font-semibold">
                            Execute real on-chain order on Base Sepolia testnet
                        </p>
                    </div>

                    {/* Order Card */}
                    <div className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-8 border-2 border-white/50">
                        {/* Wallet Status */}
                        {!isConnected ? (
                            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl text-center">
                                <Wallet className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                                <p className="text-sm font-bold text-yellow-800">Connect your wallet first to execute order</p>
                            </div>
                        ) : (
                            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="text-sm font-bold text-green-800">Wallet Connected!</p>
                                <p className="text-xs text-gray-600 font-mono mt-1">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                            </div>
                        )}

                        {/* Order Details */}
                        <div className="mb-6">
                            <h2 className="text-xl md:text-2xl font-black text-[#0A4A7C] mb-4">Order Details</h2>

                            <div className="space-y-3">
                                {/* Asset */}
                                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                                    <span className="text-sm font-bold text-gray-600">Asset</span>
                                    <span className="text-lg font-black text-gray-800">{DEMO_ORDER.asset}</span>
                                </div>

                                {/* Strike Price */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <span className="text-sm font-bold text-gray-600">Strike Price</span>
                                    <span className="text-lg font-black text-gray-800">${DEMO_ORDER.strikePrice}</span>
                                </div>

                                {/* Premium */}
                                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                    <span className="text-sm font-bold text-gray-600">Premium Earned</span>
                                    <span className="text-lg font-black text-green-600">${DEMO_ORDER.premium} USDC</span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <span className="text-sm font-bold text-gray-600">Duration</span>
                                    <span className="text-lg font-black text-gray-800">{DEMO_ORDER.duration}</span>
                                </div>

                                {/* APY */}
                                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                    <span className="text-sm font-bold text-gray-600">Estimated APY</span>
                                    <span className="text-lg font-black text-purple-600">{DEMO_ORDER.apy}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Gas Fee Notice */}
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <p className="text-xs font-bold text-blue-800 mb-1">⛽ Gas Fee Estimate</p>
                            <p className="text-sm text-blue-600 font-semibold">~0.0001 ETH (~Rp 0 on testnet)</p>
                            <p className="text-xs text-gray-600 mt-2">
                                💡 Your balance: 0.001 ETH testnet (enough for ~10 transactions)
                            </p>
                        </div>

                        {/* Error Display */}
                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                <p className="text-sm font-bold text-red-800">{errorMessage}</p>
                            </div>
                        )}

                        {/* Execute Button */}
                        <button
                            onClick={handleExecute}
                            disabled={!isConnected || status === 'executing'}
                            className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all text-base md:text-lg ${!isConnected || status === 'executing'
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#0A98FF] to-[#C15BFF] hover:scale-105 active:scale-95'
                                }`}
                        >
                            {status === 'executing' ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Sparkles className="w-5 h-5 animate-spin" />
                                    Executing Transaction...
                                </span>
                            ) : (
                                'Execute Order on Blockchain'
                            )}
                        </button>

                        {/* Helper Text */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500 font-semibold">
                                🔒 This is a real blockchain transaction on Base Sepolia testnet. <br />
                                Transaction hash will appear after execution.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
