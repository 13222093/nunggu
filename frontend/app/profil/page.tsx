'use client';

import { Navbar } from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatBot } from '@/components/ChatBot';

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      const user = JSON.parse(data);
      setUserData(user);
      setEditedName(user.fullName);
      setProfilePhoto(user.profilePhoto || null);
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    if (userData) {
      const updatedUser = { ...userData, fullName: editedName, profilePhoto };
      setUserData(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(userData.fullName);
    setProfilePhoto(userData.profilePhoto || null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('userProfiling');
    setShowLogoutModal(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 pt-24 px-4 flex items-center justify-center">
          <div className="text-gray-600 text-lg">Loading...</div>
        </div>
      </>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0A98FF] to-[#04877f] pt-24 px-4 pb-12 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#C15BFF] rounded-full blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBFF2B] rounded-full blur-3xl opacity-20 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00FFF0] rounded-full blur-3xl opacity-25 animate-float-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-8">
            <div className="inline-block bg-gradient-to-r from-[#0A98FF] to-[#04877f] text-white px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-md">
              ACCOUNT
            </div>
            <h1 className="text-4xl font-black text-white drop-shadow-lg mb-2">Profil</h1>
            <p className="text-white/90 font-medium">Kelola informasi profil dan akunmu</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Picture & Basic Info */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-2xl font-black text-[#0A4A7C]">Informasi Profil</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        Simpan
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-8 mb-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative">
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-blue-100 shadow-xl">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                      {isEditing && (
                        <>
                          <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                          <button
                            onClick={() => document.getElementById('photo-upload')?.click()}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg border-2 border-white"
                          >
                            <span className="text-xs text-white">📷</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    {!isEditing ? (
                      <>
                        <h3 className="text-2xl font-black text-[#0A4A7C] mb-1">{userData.fullName}</h3>
                        <p className="text-gray-500 font-bold">@{userData.username}</p>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 text-[#0A4A7C] font-bold text-lg mb-2 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="Nama Lengkap"
                        />
                        <p className="text-gray-400 font-medium">@{userData.username}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Nama Lengkap</span>
                    <span className="text-[#0A4A7C] font-bold">{isEditing ? editedName : userData.fullName}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Email</span>
                    <span className="text-[#0A4A7C] font-bold">{userData.email}</span>
                  </div>
                  <div className="flex justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">Nomor Telepon</span>
                    <span className="text-[#0A4A7C] font-bold">{userData.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-gray-500 font-medium">Bergabung Sejak</span>
                    <span className="text-[#0A4A7C] font-bold">
                      {new Date(userData.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50">
                <h2 className="text-2xl font-black text-[#0A4A7C] mb-6">Aksi Akun</h2>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full text-left px-6 py-4 rounded-xl bg-red-50 hover:bg-red-100 transition-all border-2 border-red-100 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 font-bold group-hover:translate-x-1 transition-transform">Keluar</span>
                  </div>
                  <span className="text-red-400 font-bold">→</span>
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-[#0A4A7C] to-[#0A98FF] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="font-bold text-lg mb-6 opacity-90 border-b border-white/20 pb-4">Status Akun</h3>
                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="text-sm text-blue-100 font-medium mb-1">Total Investasi</p>
                    <p className="text-3xl font-black">Rp 0</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100 font-medium mb-1">Return</p>
                    <p className="text-2xl font-black text-[#00FFF0]">+0%</p>
                  </div>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-white/50 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4 shadow-inner">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl font-black text-[#0A4A7C] mb-2">Butuh Bantuan?</h3>
                <p className="text-gray-500 font-medium mb-6">Tim support kami siap membantu kamu 24/7</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-all hover:shadow-xl active:scale-95">
                  Hubungi Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-[#0A4A7C]/80 backdrop-blur-md flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-4 border-white/50 animate-slideUp">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner">
                <span className="text-4xl">🚪</span>
              </div>
              <h3 className="text-2xl font-black text-[#0A4A7C] mb-3">Keluar dari Akun?</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Kamu akan keluar dari akun ini. Data kamu akan tetap tersimpan dan bisa login kembali kapan saja.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-red-500/30"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
      <ChatBot />
    </>
  );
}
