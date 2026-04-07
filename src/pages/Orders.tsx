import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, Search, Filter, MoreHorizontal, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Orders() {
  const { setView } = useAppStore();
  const [activeTab, setActiveTab] = useState('全部');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const tabs = ['全部', '待付款', '待收货', '退款/售后'];
  const years = [2026, 2025, 2024, 2023];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const orders = []; // Start with no orders for new users

  return (
    <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-10 relative">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-20 backdrop-blur-lg">
        <div className="h-[44px] flex items-center gap-2">
          <button onClick={() => setView('main')} className="p-1 hover:bg-white/50 transition-all rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 bg-gray-100/80 rounded-full flex items-center px-3 h-[28px]">
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="搜索我的食材订单" 
              className="bg-transparent text-xs w-full outline-none text-gray-700"
            />
          </div>
          <button 
            onClick={() => setShowFilter(true)}
            className="p-1 hover:bg-white/50 transition-all rounded-full"
          >
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/50 backdrop-blur-md grid grid-cols-4 border-b border-gray-100 mb-2 px-2">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-sm font-medium relative flex items-center justify-center ${
              activeTab === tab ? 'text-gray-900 font-bold' : 'text-gray-500'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#5DBE61] rounded-full mx-2" />
            )}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="px-4 space-y-3 min-h-[60vh] flex flex-col items-center justify-center">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm w-full">
              {/* ... order item content ... */}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center text-gray-300 py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10" />
            </div>
            <p className="text-sm font-medium">暂无{selectedYear}年{selectedMonth}月的食材订单</p>
            <p className="text-xs mt-1">下单食材后将在此显示</p>
          </div>
        )}
      </div>

      {/* Date Filter Modal */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg z-50 p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900">按时间筛选</h3>
                <button onClick={() => setShowFilter(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Year Selection */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">年份</p>
                  <div className="flex flex-wrap gap-3">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                          selectedYear === year 
                            ? 'bg-[#5DBE61] text-white shadow-lg shadow-[#5DBE61]/20' 
                            : 'bg-gray-50 text-gray-400 border border-transparent'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Month Selection */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">月份</p>
                  <div className="grid grid-cols-4 gap-3">
                    {months.map(month => (
                      <button
                        key={month}
                        onClick={() => setSelectedMonth(month)}
                        className={`py-3 rounded-lg text-sm font-bold transition-all ${
                          selectedMonth === month 
                            ? 'bg-[#5DBE61] text-white shadow-lg shadow-[#5DBE61]/20' 
                            : 'bg-gray-50 text-gray-400 border border-transparent'
                        }`}
                      >
                        {month}月
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowFilter(false)}
                className="w-full bg-gray-900 text-white font-black py-5 rounded-lg mt-10 shadow-xl active:scale-95 transition-all"
              >
                确定
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
