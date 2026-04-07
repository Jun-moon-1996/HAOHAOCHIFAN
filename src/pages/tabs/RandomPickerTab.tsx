import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../../store';
import { DISHES } from '../../data';
import { Dish } from '../../types';
import { Dices, RefreshCw, ChevronRight, Compass } from 'lucide-react';

export default function RandomPickerTab() {
  const { setView, setSelectedDish, preferences } = useAppStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDishes, setCurrentDishes] = useState<Dish[]>([]);
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const [pickerMode, setPickerMode] = useState<'single' | 'double'>('single');

  const tastes = [
    { id: 'Spicy', label: '想吃辣' },
    { id: 'Sweet', label: '想吃甜' },
    { id: 'Salty', label: '想吃咸' },
    { id: 'Sour', label: '想吃酸' },
    { id: 'Light', label: '想清淡' },
  ];

  // Matte semi-transparent capsule colors for the gashapon machine
  const capsuleColors = [
    'from-[#E57373]/80 to-[#E57373]/40', 'from-[#64B5F6]/80 to-[#64B5F6]/40', 
    'from-[#81C784]/80 to-[#81C784]/40', 'from-[#BA68C8]/80 to-[#BA68C8]/40', 
    'from-[#81C784]/80 to-[#81C784]/40', 'from-[#FFB74D]/80 to-[#FFB74D]/40', 
    'from-[#F06292]/80 to-[#F06292]/40', 'from-[#4DB6AC]/80 to-[#4DB6AC]/40'
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setCurrentDishes([]);

    // Simulate the gashapon machine shaking
    setTimeout(() => {
      let pool = DISHES;
      
      // Filter by goal
      if (preferences?.goal === 'Weight Loss') {
        pool = pool.filter(d => d.tags.includes('减脂'));
      } else if (preferences?.goal === 'Healthy') {
        const nonWeightLoss = pool.filter(d => !d.tags.includes('减脂'));
        if (Math.random() < 0.7 && nonWeightLoss.length > 0) {
          pool = nonWeightLoss;
        }
      }
      
      if (selectedTaste) {
        pool = pool.filter(d => d.tastes.includes(selectedTaste as any));
      }
      
      if (pool.length === 0) pool = DISHES;
      
      // Default to single dish now that mode selector is removed
      const count = 1;
      const results: Dish[] = [];
      const tempPool = [...pool];
      
      for (let i = 0; i < count; i++) {
        if (tempPool.length === 0) break;
        const randomIndex = Math.floor(Math.random() * tempPool.length);
        results.push(tempPool[randomIndex]);
        tempPool.splice(randomIndex, 1);
      }
      
      setCurrentDishes(results);
      setIsSpinning(false);
    }, 2000);
  };

  const handleViewDetails = (dish: Dish) => {
    setSelectedDish(dish);
    setView('dish-detail');
  };

  return (
    <div className="flex flex-col items-center p-5 bg-bg-light pb-32">
      {/* Header Section */}
      <div className="w-full flex justify-center items-start pt-[calc(3rem+env(safe-area-inset-top))] mb-12 px-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">今天吃什么</h1>
          <p className="text-xs font-normal text-gray-400 uppercase tracking-widest mt-1">FOODIE MOMENT</p>
        </div>
      </div>

      {/* Gashapon Machine Section */}
      <div className="relative w-full flex flex-col items-center mb-16">
        {/* The Globe */}
        <motion.div 
          animate={isSpinning ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}}
          transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
          className="relative w-64 h-64 bg-white/30 backdrop-blur-sm rounded-full border-4 border-[#3D4B48]/10 overflow-hidden z-10 flex items-center justify-center shadow-inner"
        >
          {/* Inner Glow/Reflection */}
          <div className="absolute inset-4 rounded-full border-t-4 border-l-4 border-white/20 pointer-events-none z-20" />
          
          {/* Capsules inside */}
          <div className="relative w-full h-full p-6">
            <AnimatePresence>
              {[...Array(20)].map((_, i) => {
                // Random-ish cluttered positions at the bottom
                const randomX = (i % 5) * 18 + Math.random() * 10 + 5;
                const randomY = 55 + Math.floor(i / 5) * 10 + Math.random() * 5;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ y: -100, opacity: 0 }}
                    animate={isSpinning ? {
                      x: [0, (Math.random() * 140 - 70) * (i % 2 === 0 ? 1 : 0.5), (Math.random() * 140 - 70) * (i % 2 === 0 ? 0.5 : 1), 0],
                      y: [0, -(Math.random() * 120 + 40) * (i % 3 === 0 ? 1.5 : 0.6), -(Math.random() * 120 + 40) * (i % 3 === 1 ? 1.5 : 0.6), 0],
                      rotate: [0, 180, 360],
                      opacity: 1
                    } : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      transition: { 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 15,
                        delay: i * 0.02 
                      }
                    }}
                    transition={isSpinning ? {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    } : {}}
                    className={`absolute w-10 h-10 rounded-full border border-white/30 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.1),2px_2px_4px_rgba(0,0,0,0.05)] bg-gradient-to-br ${capsuleColors[i % capsuleColors.length]}`}
                    style={{
                      left: `${randomX}%`,
                      top: `${randomY}%`,
                      zIndex: Math.floor(Math.random() * 10)
                    }}
                  >
                    {/* Subtle highlight for 3D effect */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white/20 rounded-full blur-[1px] rotate-[-45deg]" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Machine Base */}
        <motion.div 
          animate={isSpinning ? { x: [-1, 1, -1, 1, 0] } : {}}
          transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
          className="w-72 h-40 bg-accent border-4 border-[#3D4B48]/5 rounded-[30px] -mt-8 pt-10 pb-6 px-10 flex flex-col items-center justify-center relative shadow-xl z-0"
        >
          {/* GO Button */}
          <button 
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-20 h-20 rounded-full border-4 border-white/80 flex flex-col items-center justify-center transition-all active:scale-90 shadow-lg ${
              isSpinning ? 'bg-gray-200' : 'bg-yellow-400 hover:bg-yellow-300 hover:scale-105'
            }`}
          >
            <span className="text-lg font-black italic text-gray-800 leading-none">GO!</span>
            <span className="text-[8px] font-bold text-gray-800/60 mt-1 uppercase tracking-tighter">Tap Here</span>
          </button>
        </motion.div>
      </div>

      {/* Result Overlay / Modal */}
      <AnimatePresence>
        {currentDishes.length > 0 && !isSpinning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
              onClick={() => setCurrentDishes([])}
            >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="bg-white w-full max-w-sm rounded-lg overflow-hidden card-shadow p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">今日份美食推荐</h2>
                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-widest">Today's Special Selection</p>
              </div>

              <div className="mb-8">
                {currentDishes.map(dish => (
                  <div key={dish.id} className="flex flex-col items-center">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden mb-4 border-4 border-white shadow-md">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                        <h3 className="text-white font-bold text-lg line-clamp-1">{dish.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleViewDetails(currentDishes[0])}
                    className="flex-1 bg-white text-accent font-bold py-4 rounded-full flex items-center justify-center active:scale-95 transition-all border-2 border-accent/20 shadow-sm"
                  >
                    详情
                  </button>
                  <button 
                    onClick={handleSpin}
                    className="flex-1 bg-accent text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-accent/20 active:scale-95 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    再抽一次
                  </button>
                </div>
                <button 
                  onClick={() => setCurrentDishes([])}
                  className="w-full py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taste Filters */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">口味筛选</h2>
          <span className="text-[10px] font-normal text-gray-400 uppercase tracking-widest">Optional</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tastes.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTaste(selectedTaste === t.id ? null : t.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all border active:scale-95 ${
                selectedTaste === t.id 
                  ? 'bg-accent border-accent text-white shadow-md' 
                  : 'glass border-gray-100 text-gray-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[10px] text-gray-400 font-normal tracking-widest uppercase">摇出今日份的小确幸</p>
      </div>
    </div>
  );
}
