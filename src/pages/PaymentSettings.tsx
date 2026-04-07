import React from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight, UserCheck, Lock, Fingerprint, Zap, ListOrdered, RefreshCw, FastForward, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export default function PaymentSettings() {
  const { setView, user, updateUser } = useAppStore();

  const toggleSetting = (key: keyof typeof user) => {
    updateUser({ [key]: !user[key] });
  };

  const section1 = [
    { name: '身份信息', value: user.realNameStatus, valueColor: user.realNameStatus === '已完善' ? 'text-green-500' : 'text-gray-400', icon: <UserCheck className="w-5 h-5 text-blue-500" /> },
    { name: '支付密码', icon: <Lock className="w-5 h-5 text-green-500" /> },
    { name: '指纹支付', value: user.fingerprintPayment ? '已开启' : '去开启', valueColor: user.fingerprintPayment ? 'text-green-500' : 'text-gray-400', icon: <Fingerprint className="w-5 h-5 text-purple-500" />, toggle: 'fingerprintPayment' },
    { name: '小额免密', value: user.smallAmountNoPassword ? '已开启' : '去查看', valueColor: user.smallAmountNoPassword ? 'text-green-500' : 'text-gray-400', icon: <Zap className="w-5 h-5 text-orange-500" />, toggle: 'smallAmountNoPassword' },
  ];

  const section2 = [
    { name: '扣款顺序', icon: <ListOrdered className="w-5 h-5 text-indigo-500" /> },
    { name: '自动扣款', icon: <RefreshCw className="w-5 h-5 text-cyan-500" />, toggle: 'autoDeduction' },
    { name: '极速支付', value: user.fastPayment ? '已开启' : '去查看', valueColor: user.fastPayment ? 'text-green-500' : 'text-gray-400', icon: <FastForward className="w-5 h-5 text-pink-500" />, toggle: 'fastPayment' },
    { name: '先用后付', icon: <CreditCard className="w-5 h-5 text-emerald-500" />, toggle: 'payLater' },
  ];

  return (
    <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-20">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">支付设置</h1>
        </div>
      </div>

      <div className="mt-4 px-5 space-y-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {section1.map((item, i) => (
            <button
              key={i}
              onClick={() => item.toggle ? toggleSetting(item.toggle as any) : {}}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className={`text-xs font-medium ${item.valueColor || 'text-gray-400'}`}>{item.value}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {section2.map((item, i) => (
            <button
              key={i}
              onClick={() => item.toggle ? toggleSetting(item.toggle as any) : {}}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className={`text-xs font-medium ${item.valueColor || 'text-gray-400'}`}>{item.value}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        <div className="pt-20 pb-10 text-center">
          <div className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-1">美团支付</div>
          <div className="text-[10px] text-gray-300 uppercase tracking-widest">— 美团支付 省钱省心 —</div>
        </div>
      </div>
    </div>
  );
}
