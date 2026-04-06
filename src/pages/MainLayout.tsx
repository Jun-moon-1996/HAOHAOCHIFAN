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
    <div className="flex flex-col h-screen bg-bg-light max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        {tab === 'recipe' && <RecipeTab />}
        {tab === 'random' && <RandomPickerTab />}
        {tab === 'groceries' && <GroceriesTab />}
        {tab === 'profile' && <ProfileTab />}
      </div>

      <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-lg flex justify-around items-center h-[50px] px-4 z-50 card-shadow border border-white/40">
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
  );
}
