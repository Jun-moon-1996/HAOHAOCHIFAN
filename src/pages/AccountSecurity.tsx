import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, ChevronRight, Phone, Lock, Share2, UserCheck, Trash2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AccountSecurity() {
  const { setView, user, updateUser } = useAppStore();
  
  // Phone modification state
  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneStep, setPhoneStep] = useState<'verify' | 'update'>('verify');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [phoneError, setPhoneError] = useState('');

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyPhone = () => {
    setPhoneError('');
    // Mock check: assume code is '1234'
    if (verificationCode === '1234') {
      setPhoneStep('update');
      setVerificationCode('');
    } else {
      setPhoneError('验证码错误，请重试 (Mock: 1234)');
    }
  };

  const handleSavePhone = () => {
    if (!/^1[3-9]\d{9}$/.test(newPhone)) {
      setPhoneError('请输入有效的手机号');
      return;
    }
    updateUser({ phone: newPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') });
    setEditingPhone(false);
    setPhoneStep('verify');
    setNewPhone('');
    setPhoneError('');
  };

  // Password modification state
  const [editingPassword, setEditingPassword] = useState(false);
  const [passwordStep, setPasswordStep] = useState<'verify' | 'update'>('verify');
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleVerifyPassword = () => {
    setPasswordError('');
    // Mock check: assume original password is '123456'
    if (originalPassword === '123456') {
      setPasswordStep('update');
      setOriginalPassword('');
    } else {
      setPasswordError('原密码错误 (Mock: 123456)');
    }
  };

  const handleSavePassword = () => {
    setPasswordError('');
    if (newPassword.length < 6) {
      setPasswordError('新密码长度不能少于6位');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('两次输入的密码不一致');
      return;
    }
    updateUser({ passwordLevel: '高' });
    setEditingPassword(false);
    setPasswordStep('verify');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordError('');
  };

  const securityItems = [
    {
      name: '修改手机号码',
      value: user.phone,
      icon: <Phone className="w-5 h-5 text-blue-500" />,
      action: () => setEditingPhone(true)
    },
    {
      name: '修改登录密码',
      value: `等级：${user.passwordLevel}`,
      valueColor: user.passwordLevel === '高' ? 'text-green-500' : user.passwordLevel === '中' ? 'text-orange-500' : 'text-red-500',
      icon: <Lock className="w-5 h-5 text-green-500" />,
      action: () => setEditingPassword(true)
    },
    {
      name: '账号绑定管理',
      subText: `微信：${user.isWechatBound ? '已绑定' : '未绑定'} | QQ：${user.isQQBound ? '已绑定' : '未绑定'}`,
      icon: <Share2 className="w-5 h-5 text-purple-500" />,
      action: () => updateUser({ isWechatBound: !user.isWechatBound })
    }
  ];

  const verificationItems = [
    {
      name: '实名认证',
      value: user.realNameStatus,
      valueColor: user.realNameStatus === '已完善' ? 'text-green-500' : 'text-gray-400',
      icon: <UserCheck className="w-5 h-5 text-orange-500" />,
      action: () => updateUser({ realNameStatus: user.realNameStatus === '已完善' ? '待完善' : '已完善' })
    }
  ];

  const dangerItems = [
    {
      name: '注销账号',
      subText: '注销后无法恢复，请谨慎操作',
      icon: <Trash2 className="w-5 h-5 text-red-500" />,
      action: () => {}
    }
  ];

  return (
    <div className="h-screen bg-bg-light overflow-y-auto pb-20">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('settings')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">账号安全</h1>
        </div>
      </div>

      <div className="mt-4 px-5 space-y-4">
        {/* Security Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {securityItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-700">{item.name}</div>
                  {item.subText && <div className="text-[10px] text-gray-400">{item.subText}</div>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className={`text-xs font-medium ${item.valueColor || 'text-gray-400'}`}>{item.value}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Verification Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {verificationItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-700">{item.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className={`text-xs font-medium ${item.valueColor || 'text-gray-400'}`}>{item.value}</span>}
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </button>
          ))}
        </div>

        {/* Danger Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          {dangerItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-700">{item.name}</div>
                  {item.subText && <div className="text-[10px] text-gray-400">{item.subText}</div>}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        <div className="pt-10 pb-20 text-center">
        </div>
      </div>

      {/* Phone Edit Modal */}
      <AnimatePresence>
        {editingPhone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => { setEditingPhone(false); setPhoneStep('verify'); }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                {phoneStep === 'verify' ? '验证原手机号' : '设置新手机号'}
              </h3>
              
              <div className="space-y-4">
                {phoneStep === 'verify' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Original Phone</label>
                      <div className="w-full bg-gray-50 rounded-2xl px-5 py-4 text-sm font-medium text-gray-400">
                        {user.phone}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Verification Code</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={verificationCode} 
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className={`w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 transition-all ${
                            phoneError ? 'ring-2 ring-red-500/50' : 'focus:ring-accent/50'
                          }`}
                          placeholder="请输入4位验证码"
                          maxLength={4}
                        />
                        <button 
                          onClick={startCountdown}
                          disabled={countdown > 0}
                          className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl text-xs font-bold transition-all ${
                            countdown > 0 ? 'bg-gray-200 text-gray-400' : 'bg-accent/10 text-accent hover:bg-accent/20'
                          }`}
                        >
                          {countdown > 0 ? `${countdown}s` : '获取验证码'}
                        </button>
                      </div>
                      {phoneError && <p className="text-[10px] text-red-500 mt-1 ml-1">{phoneError}</p>}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => { setEditingPhone(false); setPhoneError(''); }}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={handleVerifyPhone}
                        disabled={verificationCode.length !== 4}
                        className={`flex-1 py-4 rounded-2xl text-sm font-bold text-white transition-all ${
                          verificationCode.length === 4 ? 'bg-accent shadow-lg shadow-accent/20 hover:bg-accent/90' : 'bg-gray-300'
                        }`}
                      >
                        下一步
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Phone Number</label>
                      <input 
                        type="text" 
                        value={newPhone} 
                        onChange={(e) => setNewPhone(e.target.value)}
                        className={`w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 transition-all ${
                          phoneError ? 'ring-2 ring-red-500/50' : 'focus:ring-accent/50'
                        }`}
                        placeholder="请输入新手机号"
                      />
                      {phoneError && <p className="text-[10px] text-red-500 mt-1 ml-1">{phoneError}</p>}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => { setPhoneStep('verify'); setPhoneError(''); }}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        上一步
                      </button>
                      <button 
                        onClick={handleSavePhone}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-white bg-accent shadow-lg shadow-accent/20 hover:bg-accent/90 transition-colors"
                      >
                        完成
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Password Edit Modal */}
      <AnimatePresence>
        {editingPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => { setEditingPassword(false); setPasswordStep('verify'); setPasswordError(''); }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                {passwordStep === 'verify' ? '验证原密码' : '设置新密码'}
              </h3>
              
              <div className="space-y-4">
                {passwordStep === 'verify' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Original Password</label>
                      <input 
                        type="password" 
                        value={originalPassword} 
                        onChange={(e) => setOriginalPassword(e.target.value)}
                        className={`w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 transition-all ${
                          passwordError ? 'ring-2 ring-red-500/50' : 'focus:ring-accent/50'
                        }`}
                        placeholder="请输入当前登录密码"
                      />
                      {passwordError ? (
                        <p className="text-[10px] text-red-500 mt-2 ml-1">{passwordError}</p>
                      ) : (
                        <p className="text-[10px] text-gray-400 mt-2 ml-1">Mock: 默认密码为 123456</p>
                      )}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => { setEditingPassword(false); setPasswordError(''); }}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        取消
                      </button>
                      <button 
                        onClick={handleVerifyPassword}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-white bg-accent shadow-lg shadow-accent/20 hover:bg-accent/90 transition-colors"
                      >
                        验证
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                        <input 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 transition-all ${
                            passwordError ? 'ring-2 ring-red-500/50' : 'focus:ring-accent/50'
                          }`}
                          placeholder="请输入新密码"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <input 
                          type="password" 
                          value={confirmNewPassword} 
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className={`w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 transition-all ${
                            passwordError ? 'ring-2 ring-red-500/50' : 'focus:ring-accent/50'
                          }`}
                          placeholder="请再次输入新密码"
                        />
                      </div>
                      {passwordError && <p className="text-[10px] text-red-500 mt-1 ml-1">{passwordError}</p>}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => { setPasswordStep('verify'); setPasswordError(''); }}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        上一步
                      </button>
                      <button 
                        onClick={handleSavePassword}
                        className="flex-1 py-4 rounded-2xl text-sm font-bold text-white bg-accent shadow-lg shadow-accent/20 hover:bg-accent/90 transition-colors"
                      >
                        完成
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
