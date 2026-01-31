'use client';

import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { ArrowLeft, Zap, TrendingUp, AlertCircle, Target, Shield, DollarSign, Award, ArrowRight, CheckCircle2, ExternalLink, X, Loader2, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useConnect } from 'wagmi';
import { useExecuteOrder } from '@/hooks/useExecuteOrder';
import { CONTRACTS } from '@/lib/config';

export default function BuyCall() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { executeOrder, status, errorMessage, txHash, reset } = useExecuteOrder();

  // USDC to Rupiah conversion
  const USDC_TO_IDR = 15800;
  const toRupiah = (usdc: number) => (usdc * USDC_TO_IDR).toLocaleString('id-ID');

  // Hardcoded demo orders (Buy Call = isCall:true, isLong:true)
  const demoOrders = [
    {
      id: 'call-1',
      asset: 'BTC',
      strikePrice: '105000',
      premium: '150',
      collateralRequired: '150',
      expiry: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
      apy: '145',
      potentialReturn: '180%',
      currentPrice: '98500',
      maker: CONTRACTS.KITA_VAULT,
      isCall: true,
      isLong: true,
    },
    {
      id: 'call-2',
      asset: 'ETH',
      strikePrice: '3800',
      premium: '50',
      collateralRequired: '50',
      expiry: Math.floor(Date.now() / 1000) + (14 * 24 * 60 * 60),
      apy: '128',
      potentialReturn: '165%',
      currentPrice: '3520',
      maker: CONTRACTS.KITA_VAULT,
      isCall: true,
      isLong: true,
    },
  ];

  const [selectedAsset, setSelectedAsset] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle success
  useEffect(() => {
    if (status === 'success' && txHash) {
      setShowExecuteModal(false);
      setShowSuccessModal(true);
    }
  }, [status, txHash]);

  const handleBuyCall = (order: any) => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    setSelectedOrder(order);
    setShowExecuteModal(true);
  };

  const confirmExecute = async () => {
    if (!selectedOrder) return;
    await executeOrder(selectedOrder);
  };

  const closeModals = () => {
    setShowExecuteModal(false);
    setShowSuccessModal(false);
    setSelectedOrder(null);
    reset();
  };

  const strategyInfo = {
    name: 'Buy Call',
    title: 'Modal Receh, Potensi Jackpot',
    description: 'Beli opsi call untuk profit dari kenaikan harga dengan risiko terbatas.',
    risk: 'High',
  };

  const benefits = [
    { icon: Zap, title: 'Modal Kecil', description: 'Cukup bayar premium' },
    { icon: Target, title: 'Unlimited Upside', description: 'Profit tak terbatas' },
    { icon: Shield, title: 'Limited Risk', description: 'Loss max = premium' },
    { icon: Award, title: 'High Leverage', description: 'Return besar' },
  ];

  // SUCCESS MODAL
  if (showSuccessModal && txHash) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3),transparent_50%)] animate-pulse" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00FFF0] rounded-full blur-3xl opacity-15 animate-float-delayed" />
          </div>

          <div className="relative z-10 max-w-lg w-full bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-6 shadow-2xl animate-bounce">
              <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-white" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-[#0A4A7C] mb-2">Buy Call Berhasil! 🎉</h2>
            <p className="text-sm md:text-base text-gray-600 font-semibold mb-6">
              Order berhasil dieksekusi on-chain!
            </p>

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

            {selectedOrder && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-2 border-purple-200">
                <div className="space-y-1 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-black text-purple-600">Buy Call</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Asset:</span>
                    <span className="font-black">{selectedOrder.asset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium:</span>
                    <span className="font-black text-pink-600">${selectedOrder.premium} USDC</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gradient-to-r from-[#0A98FF] to-[#C15BFF] text-white py-3 md:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Lihat Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f] pt-24 px-4 pb-24 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="group w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-[#0A4A7C]" />
            </Link>
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-1 shadow-md">
                🎯 DEMO - TESTNET
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">{strategyInfo.title}</h1>
              <p className="text-sm text-white/90">{strategyInfo.name}</p>
            </div>
          </div>

          {/* Wallet Status */}
          {!isConnected && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 flex items-center gap-4">
              <Wallet className="w-8 h-8 text-yellow-600" />
              <div className="flex-1">
                <p className="font-bold text-yellow-800">Connect Wallet Dulu!</p>
                <p className="text-sm text-yellow-700">Hubungkan wallet untuk beli call option</p>
              </div>
              <button
                onClick={() => {
                  const injected = connectors.find(c => c.id === 'injected' || c.name.includes('MetaMask'));
                  if (injected) connect({ connector: injected });
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600"
              >
                Connect
              </button>
            </div>
          )}

          {/* ORDER CARDS */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-white/50">
            <h2 className="text-xl font-black text-[#0A4A7C] mb-2">📈 Pilih Call Option</h2>
            <p className="text-sm text-gray-600 mb-6">Beli call untuk profit jika harga naik. Premium = modal maksimal yang bisa hilang.</p>

            {/* Asset Filter */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSelectedAsset('all')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${selectedAsset === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSelectedAsset('BTC')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${selectedAsset === 'BTC'
                  ? 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                BTC ₿
              </button>
              <button
                onClick={() => setSelectedAsset('ETH')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${selectedAsset === 'ETH'
                  ? 'bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                ETH Ξ
              </button>
            </div>

            {/* Order Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoOrders
                .filter(order => selectedAsset === 'all' || order.asset === selectedAsset)
                .map((order) => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-5 shadow-xl border-2 border-purple-200 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
                        {order.asset} Call
                      </span>
                      <span className="text-xs text-gray-500">🎯 Buy Call</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Strike Price</p>
                      <p className="text-3xl font-black text-[#0A4A7C]">
                        ${parseFloat(order.strikePrice).toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-600 font-bold mt-1">
                        Now: ${parseFloat(order.currentPrice).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                        <p className="text-xs text-purple-700 font-bold">💰 Premium</p>
                        <p className="text-lg font-black text-purple-600">{order.premium} USDC</p>
                      </div>
                      <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                        <p className="text-xs text-pink-700 font-bold">📈 Potential</p>
                        <p className="text-lg font-black text-pink-600">{order.potentialReturn}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuyCall(order)}
                      disabled={!isConnected}
                      className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${isConnected
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 active:scale-95'
                          : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {isConnected ? (
                        <>
                          Beli Call Ini
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        'Connect Wallet First'
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/95 rounded-2xl p-5 shadow-xl border-4 border-white/50">
            <h2 className="text-lg font-black text-[#0A4A7C] mb-3">💡 Keuntungan Buy Call</h2>
            <div className="grid grid-cols-2 gap-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0A4A7C]">{benefit.title}</p>
                      <p className="text-[10px] text-gray-500">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-black text-red-700 text-sm">⚠️ High Risk</h3>
                <p className="text-xs text-red-800">Jika harga tidak naik melewati strike saat expiry, premium hangus 100%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTE MODAL */}
      {showExecuteModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <h3 className="text-xl font-black text-[#0A4A7C] mb-4">Konfirmasi Buy Call</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Asset</span>
                <span className="font-black">{selectedOrder.asset}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600">Strike</span>
                <span className="font-black">${selectedOrder.strikePrice}</span>
              </div>
              <div className="flex justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-sm text-purple-700 font-bold">💰 Premium</span>
                <span className="font-black text-purple-600">${selectedOrder.premium} USDC</span>
              </div>
            </div>

            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-700 font-bold">{errorMessage}</p>
              </div>
            )}

            <button
              onClick={confirmExecute}
              disabled={status === 'executing'}
              className={`w-full py-4 rounded-xl font-black text-white ${status === 'executing'
                  ? 'bg-gray-400'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105'
                } transition-all flex items-center justify-center gap-2`}
            >
              {status === 'executing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Execute on Blockchain
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              🔒 Real transaction on Base Sepolia testnet
            </p>
          </div>
        </div>
      )}

      <ChatBot />
    </>
  );
}
