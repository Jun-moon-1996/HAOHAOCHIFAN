import React from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function AddressList() {
  const { setView, addresses, removeAddress, setEditingAddressId } = useAppStore();

  const handleEdit = (id: string) => {
    setEditingAddressId(id);
    setView('address-edit');
  };

  const handleAdd = () => {
    setEditingAddressId(null);
    setView('address-edit');
  };

  return (
    <div className="h-screen bg-bg-light overflow-y-auto pb-10">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">我的收货地址</h1>
          <div className="flex-1" />
          <button 
            onClick={handleAdd}
            className="text-xs font-bold text-primary px-4 py-2 glass rounded-full hover:bg-white transition-all z-10"
          >
            新增地址
          </button>
        </div>
      </div>

      {/* Address List */}
      <div className="px-5 space-y-4">
        {addresses.length > 0 ? (
          addresses.map(addr => (
            <div key={addr.id} className="relative overflow-hidden rounded-lg glass shadow-sm">
              {/* Delete Button (Behind) */}
              <div className="absolute inset-0 bg-red-500 flex items-center justify-end px-8">
                <button 
                  onClick={() => removeAddress(addr.id)}
                  className="text-white flex flex-col items-center gap-1"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-[10px] font-bold">删除</span>
                </button>
              </div>

              {/* Address Card (Draggable) */}
              <motion.div 
                drag="x"
                dragConstraints={{ left: -80, right: 0 }}
                dragElastic={0.1}
                className="bg-white px-6 py-5 flex items-center justify-between relative z-10"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    {addr.isDefault && (
                      <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded-md">
                        默认
                      </span>
                    )}
                    {addr.label && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md">
                        {addr.label}
                      </span>
                    )}
                    <span className="text-sm font-bold text-gray-800 truncate">{addr.name} {addr.doorNumber}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1 truncate">{addr.detail}</div>
                  <div className="text-xs text-gray-500">
                    {addr.contactName} {addr.gender} {addr.phone}
                  </div>
                </div>
                <button 
                  onClick={() => handleEdit(addr.id)}
                  className="p-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300 py-20 min-h-[70vh]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-sm font-medium">暂无收货地址</p>
            <button 
              onClick={handleAdd}
              className="mt-4 px-6 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              去添加地址
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
