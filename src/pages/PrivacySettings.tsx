import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PrivacySettings() {
  const { setView } = useAppStore();
  
  const [recommendations, setRecommendations] = useState({
    content: true,
    ads: false
  });
  
  const [riderRecording, setRiderRecording] = useState(false);
  const [activeDetail, setActiveDetail] = useState<{ title: string, details: { label: string, value: string }[] } | null>(null);

  const sections = [
    {
      title: '个人信息查阅',
      items: [
        { 
          name: '账号信息', 
          onClick: () => setActiveDetail({
            title: '账号信息',
            details: [
              { label: '手机号', value: '189****6628' },
              { label: '注册时间', value: '2024-05-20' }
            ]
          })
        },
        { 
          name: '当前设备信息', 
          onClick: () => setActiveDetail({
            title: '当前设备信息',
            details: [
              { label: '设备操作系统', value: 'iOS' },
              { label: '设备系统版本', value: '17.4.1' },
              { label: '设备语言', value: '简体中文' },
              { label: '时区', value: 'GMT+8' }
            ]
          })
        }
      ]
    },
    {
      title: '系统权限管理',
      items: [
        { name: '相机权限', extra: '去设置' },
        { name: '存储权限', extra: '去设置' },
        { name: '位置信息权限', extra: '使用中' },
        { name: '通讯录权限', extra: '未开启' },
        { name: '麦克风权限', extra: '去设置' }
      ]
    },
    {
      title: '推荐管理',
      items: [
        { 
          name: '个性化内容推荐', 
          type: 'toggle', 
          value: recommendations.content,
          onChange: () => setRecommendations(prev => ({ ...prev, content: !prev.content }))
        },
        { 
          name: '个性化广告推荐', 
          type: 'toggle', 
          value: recommendations.ads,
          onChange: () => setRecommendations(prev => ({ ...prev, ads: !prev.ads }))
        }
      ]
    },
    {
      title: '隐私保护',
      items: [
        { 
          name: '骑手录音权限', 
          type: 'toggle', 
          value: riderRecording,
          onChange: () => setRiderRecording(!riderRecording)
        }
      ]
    },
    {
      title: '隐私说明',
      items: [
        { name: '隐私政策' },
        { name: '用户协议' },
        { name: '第三方共享说明' }
      ]
    }
  ];

  if (activeDetail) {
    return (
      <div className="h-screen bg-bg-light overflow-y-auto pb-20">
        {/* Header */}
        <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
          <div className="h-[44px] flex items-center relative">
            <button onClick={() => setActiveDetail(null)} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{activeDetail.title}</h1>
          </div>
        </div>

        <div className="mt-4 px-5">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
            {activeDetail.details.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-500">{detail.label}</span>
                <span className="text-sm text-gray-800 font-medium">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-light overflow-y-auto pb-20 relative">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">隐私设置</h1>
        </div>
      </div>

      <div className="mt-4 space-y-6 px-5">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{section.title}</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              {section.items.map((item, iIdx) => (
                <div key={iIdx}>
                  {item.type === 'toggle' ? (
                    <div className={`w-full flex items-center justify-between p-4 text-left ${
                      iIdx !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                    }`}>
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <button 
                        onClick={() => item.onChange?.()}
                        className={`w-10 h-5 rounded-full transition-colors relative ${item.value ? 'bg-primary' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.value ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={item.onClick}
                      disabled={!item.onClick}
                      className={`w-full flex items-center justify-between p-4 text-left ${
                        iIdx !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                      } ${item.onClick ? 'hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''}`}
                    >
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <div className="flex items-center gap-2">
                        {item.extra && <span className="text-xs text-gray-400">{item.extra}</span>}
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
