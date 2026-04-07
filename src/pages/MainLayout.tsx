import React from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { BookOpen, Dices, ShoppingCart, User } from 'lucide-react';
import RecipeTab from './tabs/RecipeTab';
import RandomPickerTab from './tabs/RandomPickerTab';
import GroceriesTab from './tabs/GroceriesTab';
import ProfileTab from './tabs/ProfileTab';

export default function MainLayout() {
  const { tab, setTab } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-[#F7FAF7] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0 pb-32">
        {tab === 'recipe' && <RecipeTab />}
        {tab === 'random' && <RandomPickerTab />}
        {tab === 'groceries' && <GroceriesTab />}
        {tab === 'profile' && <ProfileTab />}
      </div>

      <div className="fixed !bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom,34px)] h-[calc(64px+env(safe-area-inset-bottom,34px))] bg-white flex items-start justify-around pt-[10px] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        {[
          { id: 'recipe', icon: BookOpen },
          { id: 'random', icon: Dices },
          { id: 'groceries', icon: ShoppingCart },
          { id: 'profile', icon: User },
        ].map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id as any)}
            className={`flex flex-col items-center justify-center transition-all duration-300 relative h-[44px] px-4 ${
              tab === id 
                ? 'text-[#5DBE61]' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className={`transition-all ${tab === id ? 'bg-[#5DBE61]/10 p-1.5 rounded-lg' : ''}`}>
              <Icon className="w-6 h-6" />
            </div>
            {tab === id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -bottom-1 w-1 h-1 bg-[#5DBE61] rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
