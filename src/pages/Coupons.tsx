import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, Ticket, Gift, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Coupons() {
  const { setView } = useAppStore();
  const [activeTab, setActiveTab] = useState('红包');
  const [showFilter, setShowFilter] = useState(false);

  const tabs = ['红包', '卡券'];

  const coupons = []; // Start with no coupons for new users

  return (
    <div className="h-screen bg-bg-light overflow-y-auto pb-10 relative">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">红包卡券</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-8 flex justify-around">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-8 text-sm font-black relative transition-all ${
              activeTab === tab ? 'text-accent scale-110' : 'text-gray-400'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="couponTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full mx-6 shadow-lg shadow-accent/20" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Coupon List */}
      <div className="px-4 space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
        {coupons.length > 0 ? (
          coupons.map(coupon => (
            <div key={coupon.id} className="glass rounded-lg p-6 shadow-sm w-full border border-white/20">
              {/* ... coupon item content ... */}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center text-gray-300 py-20">
            <div className="w-24 h-24 glass rounded-lg flex items-center justify-center mb-6 shadow-sm border border-white/20">
              {activeTab === '红包' ? <Gift className="w-12 h-12" /> : <Ticket className="w-12 h-12" />}
            </div>
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">暂无{activeTab}</p>
            <p className="text-[10px] font-bold mt-2 uppercase tracking-wider">红包卡券将在此显示</p>
          </div>
        )}
      </div>
    </div>
  );
}
