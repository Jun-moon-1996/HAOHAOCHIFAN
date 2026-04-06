import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight, User, Shield, Lock, CreditCard, Bell, Settings as SettingsIcon, Trash2, LogOut, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Settings() {
  const { setView } = useAppStore();
  const [showClearCache, setShowClearCache] = useState(false);

  const sections = [
    {
      items: [
        { name: '个人信息', icon: <User className="w-5 h-5 text-blue-500" />, view: 'personal-info' },
        { name: '账号安全', icon: <Shield className="w-5 h-5 text-green-500" />, view: 'account-security', extra: '证件待完善' },
        { name: '隐私设置', icon: <Lock className="w-5 h-5 text-purple-500" />, view: 'privacy-settings' },
      ]
    },
    {
      items: [
        { name: '支付设置', icon: <CreditCard className="w-5 h-5 text-orange-500" />, view: 'payment-settings' },
        { name: '消息通知', icon: <Bell className="w-5 h-5 text-red-500" />, view: 'notification-settings' },
        { name: '通用设置', icon: <SettingsIcon className="w-5 h-5 text-gray-500" />, view: 'general-settings' },
        { name: '清理缓存', icon: <Trash2 className="w-5 h-5 text-cyan-500" />, action: () => setShowClearCache(true) },
      ]
    }
  ];

  return (
    <div className="h-screen bg-bg-light overflow-y-auto pb-20">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">设置</h1>
        </div>
      </div>

      <div className="mt-4 space-y-4 px-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            {section.items.map((item, iIdx) => (
              <button
                key={iIdx}
                onClick={() => {
                  if ((item as any).action) {
                    (item as any).action();
                  } else {
                    setView(item.view as any);
                  }
                }}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  iIdx !== section.items.length - 1 ? 'border-bottom border-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.extra && <span className="text-xs text-gray-400">{item.extra}</span>}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        ))}

        <div className="mt-8 space-y-3">
          <button className="w-full bg-white py-4 rounded-lg text-sm font-bold text-gray-700 shadow-sm border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <UserPlus className="w-5 h-5 text-gray-400" />
            切换账号
          </button>
          <button 
            onClick={() => setView('login')}
            className="w-full bg-white py-4 rounded-lg text-sm font-bold text-red-500 shadow-sm border border-gray-100 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            退出登录
          </button>
        </div>
      </div>

      {/* Clear Cache Modal */}
      <AnimatePresence>
        {showClearCache && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowClearCache(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col items-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">确定要清理缓存吗</h3>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed">
                缓存是使用过程中的临时数据，清理缓存不会影响功能的使用。
              </p>
              <div className="w-full space-y-3">
                <button 
                  onClick={() => setShowClearCache(false)}
                  className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  确定
                </button>
                <button 
                  onClick={() => setShowClearCache(false)}
                  className="w-full py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest"
                >
                  再想想
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
