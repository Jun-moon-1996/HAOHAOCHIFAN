import React, { useState, useRef } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight, Camera, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PersonalInfo() {
  const { setView, user, updateUser } = useAppStore();
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [avatar, setAvatar] = useState(user.avatar);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveNickname = () => {
    updateUser({ nickname });
    setEditingNickname(false);
  };

  const handleAvatarClick = () => {
    setShowPermissionModal(true);
  };

  const handleGrantPermission = () => {
    setShowPermissionModal(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        updateUser({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full bg-[#F7FAF7] overflow-y-auto pb-20">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">个人信息</h1>
        </div>
      </div>

      <div className="mt-4 px-5 space-y-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {/* Avatar */}
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleAvatarClick}>
            <span className="text-sm font-medium text-gray-700">头像</span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm relative group">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>

          {/* Nickname */}
          <div className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">昵称</span>
              <AnimatePresence mode="wait">
                {editingNickname ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center gap-2"
                  >
                    <input 
                      autoFocus
                      type="text" 
                      value={nickname} 
                      onChange={(e) => setNickname(e.target.value)}
                      className="text-sm text-right font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5DBE61]/50"
                    />
                    <button onClick={handleSaveNickname} className="p-1 text-green-500 hover:bg-green-50 rounded-full">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setNickname(user.nickname); setEditingNickname(false); }} className="p-1 text-red-500 hover:bg-red-50 rounded-full">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-3 cursor-pointer" 
                    onClick={() => setEditingNickname(true)}
                  >
                    <span className="text-sm font-medium text-gray-500">{nickname}</span>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-700">ID</span>
            <span className="text-sm font-medium text-gray-400">{user.id}</span>
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      <AnimatePresence>
        {showPermissionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setShowPermissionModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">访问相册权限</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                美团请求访问您的手机相册，以便您可以选择图片作为头像。
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPermissionModal(false)}
                  className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  拒绝
                </button>
                <button 
                  onClick={handleGrantPermission}
                  className="flex-1 py-4 rounded-2xl text-sm font-bold text-white bg-[#5DBE61] shadow-lg shadow-[#5DBE61]/20 hover:bg-[#5DBE61]/90 transition-colors"
                >
                  允许
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
