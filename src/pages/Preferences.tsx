import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { Taste, Restriction, Goal } from '../types';
import { ChevronLeft } from 'lucide-react';

const TASTES: Taste[] = ['Spicy', 'Sweet', 'Salty', 'Sour', 'Light'];
const RESTRICTIONS: Restriction[] = ['No Pork', 'No Beef', 'No Chicken', 'No Duck', 'Vegetarian', 'Gluten Free', 'None'];
const GOALS: Goal[] = ['Weight Loss', 'Healthy'];

export default function Preferences() {
  const { setView, setPreferences, isInitialSetup } = useAppStore();
  const [selectedTastes, setSelectedTastes] = useState<Taste[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<Restriction[]>(['None']);
  const [selectedGoal, setSelectedGoal] = useState<Goal>('Healthy');

  const toggleTaste = (taste: Taste) => {
    setSelectedTastes(prev =>
      prev.includes(taste) ? prev.filter(t => t !== taste) : [...prev, taste]
    );
  };

  const toggleRestriction = (restriction: Restriction) => {
    if (restriction === 'None') {
      setSelectedRestrictions(['None']);
    } else {
      setSelectedRestrictions(prev => {
        const newRes = prev.filter(r => r !== 'None');
        return newRes.includes(restriction)
          ? newRes.filter(r => r !== restriction)
          : [...newRes, restriction];
      });
    }
  };

  const handleSave = () => {
    setPreferences({
      tastes: selectedTastes,
      restrictions: selectedRestrictions,
      goal: selectedGoal,
    });
    setView('main');
  };

  return (
    <div className="flex flex-col h-full bg-bg-light">
      {/* Header */}
      {!isInitialSetup && (
        <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg shrink-0">
          <div className="h-[44px] flex items-center relative">
            <button onClick={() => setView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">饮食偏好</h1>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {isInitialSetup && (
          <div className="mb-12 pt-12">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 tracking-tight">设置你的饮食偏好</h1>
            <p className="text-xs font-normal text-gray-400 uppercase tracking-widest">Personalize Your Experience</p>
          </div>
        )}

        <div className="space-y-10 pb-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 tracking-tight">口味偏好</h2>
              <span className="text-xs font-normal text-primary uppercase tracking-widest">Taste</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {TASTES.map(taste => (
                <button
                  key={taste}
                  onClick={() => toggleTaste(taste)}
                  className={`px-6 py-3 rounded-lg text-xs font-normal transition-all shadow-sm border active:scale-95 ${
                    selectedTastes.includes(taste)
                      ? 'bg-green-gradient text-white border-transparent shadow-lg shadow-primary/20 scale-105'
                      : 'glass text-gray-600 border-white/20 hover:bg-white'
                  }`}
                >
                  {taste === 'Spicy' ? '🌶️ 辣' : taste === 'Sweet' ? '🍬 甜' : taste === 'Salty' ? '🧂 咸' : taste === 'Sour' ? '🍋 酸' : '🥗 清淡'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 tracking-tight">饮食忌口</h2>
              <span className="text-xs font-normal text-primary uppercase tracking-widest">Restrictions</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {RESTRICTIONS.map(res => (
                <button
                  key={res}
                  onClick={() => toggleRestriction(res)}
                  className={`px-6 py-3 rounded-lg text-xs font-normal transition-all shadow-sm border active:scale-95 ${
                    selectedRestrictions.includes(res)
                      ? 'bg-green-gradient text-white border-transparent shadow-lg shadow-primary/20 scale-105'
                      : 'glass text-gray-600 border-white/20 hover:bg-white'
                  }`}
                >
                  {res === 'None' ? '无忌口' : res === 'No Pork' ? '不吃猪肉' : res === 'No Beef' ? '不吃牛肉' : res === 'No Chicken' ? '不吃鸡肉' : res === 'No Duck' ? '不吃鸭肉' : res === 'Vegetarian' ? '素食' : '无麸质'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 tracking-tight">饮食目标</h2>
              <span className="text-xs font-normal text-primary uppercase tracking-widest">Goals</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-6 rounded-lg text-xs font-normal transition-all border-2 flex flex-col items-center justify-center gap-3 ${
                    selectedGoal === goal
                      ? 'border-primary bg-primary/5 text-primary shadow-xl shadow-primary/10 scale-105'
                      : 'border-transparent glass text-gray-600 hover:bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${selectedGoal === goal ? 'bg-green-gradient text-white' : 'glass text-gray-400'}`}>
                    {goal === 'Weight Loss' ? '🔥' : '🥗'}
                  </div>
                  {goal === 'Weight Loss' ? '减脂' : '健康饮食'}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Fixed-at-bottom Button Container */}
      <div className="px-4 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))] bg-bg-light shrink-0 z-20">
        <button
          onClick={handleSave}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-5 rounded-full transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-sm"
        >
          开启美食之旅
        </button>
      </div>
    </div>
  );
}
