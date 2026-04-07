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
    <div className="flex flex-col h-full bg-bg-light relative overflow-hidden">
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === 'recipe' && <RecipeTab />}
        {tab === 'random' && <RandomPickerTab />}
        {tab === 'groceries' && <GroceriesTab />}
        {tab === 'profile' && <ProfileTab />}
      </div>

      <div className="shrink-0 px-4 pt-2 pb-[env(safe-area-inset-bottom,34px)] bg-bg-light/80 backdrop-blur-sm z-50 border-t border-gray-100">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl flex justify-around items-center h-[60px] px-2 shadow-lg border border-white/40">
          {[
            { id: 'recipe', icon: BookOpen },
            { id: 'random', icon: Dices },
            { id: 'groceries', icon: ShoppingCart },
            { id: 'profile', icon: User },
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as any)}
              className={`flex flex-col items-center justify-center transition-all duration-300 relative ${
                tab === id 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`transition-all ${tab === id ? 'bg-primary/10 p-1.5 rounded-lg' : ''}`}>
                <Icon className="w-6 h-6" />
              </div>
              {tab === id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
