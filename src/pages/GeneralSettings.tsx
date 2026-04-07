import React from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GeneralSettings() {
  const { setView, user, updateUser } = useAppStore();

  const toggleSetting = (key: keyof typeof user.generalSettings) => {
    if (key === 'nonWifiImageQuality') return;
    const newSettings = { ...user.generalSettings };
    (newSettings as any)[key] = !newSettings[key];
    updateUser({ generalSettings: newSettings });
  };

  const setQuality = (quality: 'Normal' | 'HD') => {
    updateUser({ 
      generalSettings: { ...user.generalSettings, nonWifiImageQuality: quality } 
    });
  };

  const Toggle = ({ active, onClick }: { active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`w-10 h-5 rounded-full transition-colors relative ${active ? 'bg-[#5DBE61]' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-0.5 bottom-0.5 bg-white rounded-full transition-all w-4 h-4 ${active ? 'left-5.5' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-20">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">通用设置</h1>
        </div>
      </div>

      <div className="mt-4 px-5 space-y-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-700">允许读取剪贴板</span>
            <Toggle active={user.generalSettings.allowClipboard} onClick={() => toggleSetting('allowClipboard')} />
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-700">截屏后展示反馈入口</span>
            <Toggle active={user.generalSettings.screenshotFeedback} onClick={() => toggleSetting('screenshotFeedback')} />
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-700">截屏后展示分享面板</span>
            <Toggle active={user.generalSettings.screenshotShare} onClick={() => toggleSetting('screenshotShare')} />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">非WiFi下图片质量</span>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setQuality('Normal')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${user.generalSettings.nonWifiImageQuality === 'Normal' ? 'bg-white text-[#5DBE61] shadow-sm font-bold' : 'text-gray-400'}`}
                >
                  普通
                </button>
                <button 
                  onClick={() => setQuality('HD')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${user.generalSettings.nonWifiImageQuality === 'HD' ? 'bg-white text-[#5DBE61] shadow-sm font-bold' : 'text-gray-400'}`}
                >
                  高清
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium text-gray-700">WiFi环境下自动下载并安装最新版本</span>
            <Toggle active={user.generalSettings.wifiAutoUpdate} onClick={() => toggleSetting('wifiAutoUpdate')} />
          </div>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium text-gray-700">网络诊断</span>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
