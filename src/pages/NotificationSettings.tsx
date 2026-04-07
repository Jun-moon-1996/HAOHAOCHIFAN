import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NotificationSettings() {
  const { setView, user, updateUser } = useAppStore();
  const [subView, setSubView] = useState<'main' | 'system' | 'banner'>('main');

  const toggleNotification = (category: 'outsideApp' | 'insideApp', key: string) => {
    const newNotifications = { ...user.notifications };
    (newNotifications[category] as any)[key] = !(newNotifications[category] as any)[key];
    updateUser({ notifications: newNotifications });
  };

  const Toggle = ({ active, onClick, small = false }: { active: boolean, onClick: () => void, small?: boolean }) => (
    <button 
      onClick={onClick}
      className={`${small ? 'w-8 h-4' : 'w-10 h-5'} rounded-full transition-colors relative ${active ? 'bg-[#5DBE61]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-0.5 bottom-0.5 bg-white rounded-full transition-all ${small ? 'w-3 h-3' : 'w-4 h-4'} ${active ? (small ? 'left-4.5' : 'left-5.5') : 'left-0.5'}`} />
    </button>
  );

  if (subView === 'system') {
    return (
      <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-20">
        <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
          <div className="h-[44px] flex items-center relative">
            <button onClick={() => setSubView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">手机系统通知</h1>
          </div>
        </div>
        <div className="mt-4 px-5">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">手机系统通知</span>
              <Toggle active={user.notifications.outsideApp.systemDetail} onClick={() => toggleNotification('outsideApp', 'systemDetail')} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">服务提醒</span>
              <Toggle active={user.notifications.outsideApp.service} onClick={() => toggleNotification('outsideApp', 'service')} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">优惠活动</span>
              <Toggle active={user.notifications.outsideApp.promo} onClick={() => toggleNotification('outsideApp', 'promo')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subView === 'banner') {
    return (
      <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-20">
        <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
          <div className="h-[44px] flex items-center relative">
            <button onClick={() => setSubView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">横幅通知</h1>
          </div>
        </div>
        <div className="mt-4 px-5">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">横幅通知</span>
              <Toggle active={user.notifications.insideApp.bannerDetail} onClick={() => toggleNotification('insideApp', 'bannerDetail')} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">服务提醒</span>
              <Toggle active={user.notifications.insideApp.service} onClick={() => toggleNotification('insideApp', 'service')} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">优惠活动</span>
              <Toggle active={user.notifications.insideApp.promo} onClick={() => toggleNotification('insideApp', 'promo')} />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">即时聊天</span>
              <Toggle active={user.notifications.insideApp.chat} onClick={() => toggleNotification('insideApp', 'chat')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-20">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">消息通知</h1>
        </div>
      </div>

      <div className="mt-4 space-y-6 px-5">
        {/* Outside App Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">应用外</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            <button 
              onClick={() => setSubView('system')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">手机系统通知</span>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm font-medium text-gray-700">短信通知</span>
              <Toggle active={user.notifications.outsideApp.sms} onClick={() => toggleNotification('outsideApp', 'sms')} />
            </div>
          </div>
        </div>

        {/* Inside App Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">应用内</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <button 
              onClick={() => setSubView('banner')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">横幅通知</span>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
