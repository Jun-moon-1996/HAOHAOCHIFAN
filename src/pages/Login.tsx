import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { ChefHat } from 'lucide-react';

export default function Login() {
  const { setView, setIsInitialSetup } = useAppStore();

  const handleLogin = () => {
    setIsInitialSetup(true);
    setView('preferences');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-primary/5 overflow-y-auto flex flex-col items-center justify-center p-4"
    >
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col items-center border border-white/40">
        <div className="w-24 h-24 bg-green-gradient rounded-lg flex items-center justify-center mb-8 shadow-xl shadow-primary/30 rotate-3">
          <ChefHat className="text-white w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">好好吃饭</h1>
        <p className="text-gray-400 mb-10 text-xs font-bold uppercase tracking-widest">Eat Better, Live Better</p>

        <button
          onClick={handleLogin}
          className="w-full bg-green-gradient hover:opacity-90 text-white font-bold py-5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 mb-4"
        >
          微信一键登录
        </button>
        <button
          onClick={handleLogin}
          className="w-full glass hover:bg-white text-gray-600 font-bold py-5 rounded-lg transition-all active:scale-95"
        >
          手机号登录
        </button>
      </div>
    </motion.div>
  );
}
