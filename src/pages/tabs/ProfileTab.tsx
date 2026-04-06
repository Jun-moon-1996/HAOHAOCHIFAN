import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { 
  ShoppingBag, Truck, MapPin, 
  Home, Briefcase, 
  BookOpen, Video, 
  Ticket, Gift, 
  Utensils, Ban, Target, 
  HelpCircle, MessageCircle, 
  Bell, Shield, Lock, LogOut,
  ChevronRight, ChevronLeft,
  ClipboardList, User, Heart, Settings, Headphones,
  CreditCard, Package
} from 'lucide-react';

export default function ProfileTab() {
  const { setView, user, setIsInitialSetup } = useAppStore();
  const [activePage, setActivePage] = useState<string | null>(null);

  const handleLogout = () => {
    setView('login');
  };

  const sections = [
    {
      title: '我的订单',
      icon: <ClipboardList className="w-5 h-5 text-blue-500" />,
      action: () => setView('orders')
    },
    {
      title: '收货地址',
      icon: <MapPin className="w-5 h-5 text-green-500" />,
      action: () => setView('address-list')
    },
    {
      title: '我的收藏',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      action: () => setView('favorites')
    },
    {
      title: '红包卡券',
      icon: <Ticket className="w-5 h-5 text-orange-500" />,
      action: () => setView('coupons')
    },
    {
      title: '饮食偏好',
      icon: <Utensils className="w-5 h-5 text-primary" />,
      action: () => {
        setIsInitialSetup(false);
        setView('preferences');
      }
    },
    {
      title: '客服中心',
      icon: <Headphones className="w-5 h-5 text-indigo-500" />,
      action: () => setView('customer-service')
    },
    {
      title: '设置',
      hidden: true,
      icon: <Settings className="w-5 h-5 text-gray-500" />,
      items: [
        { name: '通知设置', icon: <Bell className="w-6 h-6" /> },
        { name: '隐私设置', icon: <Shield className="w-6 h-6" /> },
        { name: '账号安全', icon: <Lock className="w-6 h-6" /> },
        { name: '退出登录', icon: <LogOut className="w-6 h-6" />, action: handleLogout, textClass: 'text-red-500', iconClass: 'bg-red-50 text-red-500 hover:bg-red-100' },
      ]
    }
  ];

  if (activePage) {
    const activeSection = sections.find(s => s.title === activePage);
    const items = activeSection?.items || [];

    return (
      <div className="min-h-full bg-bg-light pb-24">
        <div className="glass px-5 py-6 shadow-sm flex items-center mb-6 sticky top-0 z-10 backdrop-blur-lg">
          <button onClick={() => setActivePage(null)} className="mr-4 p-2 glass rounded-full hover:bg-white transition-all shadow-sm">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{activePage}</h1>
        </div>
        
        <div className="px-5">
          <div className="glass rounded-lg card-shadow p-8">
            <div className={`grid gap-y-10 gap-x-4 ${items.length >= 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {items.map((item: any, i) => (
                <button 
                  key={i} 
                  className="flex flex-col items-center justify-center group"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (activePage === '饮食偏好') {
                      setView('preferences');
                    }
                  }}
                >
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-3 transition-all group-active:scale-90 ${item.iconClass || 'glass text-gray-700 hover:bg-white shadow-sm'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-xs font-bold ${item.textClass || 'text-gray-600'}`}>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const visibleSections = sections.filter(s => !s.hidden);

  return (
    <div className="min-h-full bg-bg-light pb-24">
      <div className="px-5 pt-16 pb-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-24 h-24 rounded-lg shadow-2xl overflow-hidden rotate-3">
            <div className="w-full h-full rounded-lg overflow-hidden bg-white">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover -rotate-3" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-800 mb-1 tracking-tight">{user.nickname}</h1>
            <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              <span>ID: {user.id}</span>
            </div>
          </div>
          <button 
            onClick={() => setView('settings')}
            className="w-12 h-12 glass rounded-lg flex items-center justify-center text-gray-600 shadow-sm hover:bg-white transition-all"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Removed horizontal buttons */}


        <div className="bg-white rounded-2xl card-shadow overflow-hidden p-2">
          {visibleSections.map((section, index) => (
            <button 
              key={index}
              onClick={() => {
                if (section.action) {
                  section.action();
                } else {
                  setActivePage(section.title);
                }
              }}
              className={`w-full flex items-center justify-between p-5 rounded-lg hover:bg-white/50 transition-all group ${
                index !== visibleSections.length - 1 ? 'mb-1' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mr-4 group-hover:bg-white shadow-sm transition-all">
                  {section.icon}
                </div>
                <span className="font-bold text-gray-700 text-sm">{section.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
