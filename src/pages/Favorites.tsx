import React, { useState } from 'react';
import { useAppStore } from '../store';
import { ChevronLeft, Heart, Search, Clock } from 'lucide-react';
import { DISHES } from '../data';
import { motion } from 'motion/react';

export default function Favorites() {
  const { setView, favorites, setSelectedDish } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const favoritedDishes = DISHES.filter(dish => favorites.includes(dish.id));
  
  const filteredDishes = favoritedDishes.filter(dish => 
    dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dish.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="h-screen bg-[#F7FAF7] overflow-y-auto pb-10">
      {/* Header */}
      <div className="glass px-5 pt-[44px] shadow-sm sticky top-0 z-10 backdrop-blur-lg">
        <div className="h-[44px] flex items-center relative">
          <button onClick={() => setView('main')} className="p-2 hover:bg-white/50 transition-all rounded-full z-10">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">我的收藏</h1>
        </div>
      </div>

      <div className="px-5">
        {/* Search Bar */}
        <div className="relative flex items-center mt-3 mb-8 group h-[36px]">
          <div className="absolute left-3 z-10">
            <Search className="text-gray-400 w-4 h-4 group-focus-within:text-[#5DBE61] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="在收藏中搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100/80 rounded-full h-full pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#5DBE61]/30 transition-shadow shadow-sm text-sm"
          />
        </div>

        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedDish(dish);
                  setView('dish-detail');
                }}
                className="glass rounded-lg overflow-hidden card-shadow hover:scale-[1.02] transition-all cursor-pointer flex flex-col p-2"
              >
                <div className="relative aspect-square rounded-md overflow-hidden mb-3">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 right-2 w-8 h-8 glass rounded-full flex items-center justify-center text-red-500 shadow-lg z-10">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="px-2 pb-2 flex-1 flex flex-col">
                  <h3 className="font-medium text-gray-800 text-base mb-1 line-clamp-1">{dish.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {dish.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] px-2 py-1 bg-[#5DBE61]/10 text-[#5DBE61] rounded-full font-normal">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center text-gray-400 text-xs font-normal">
                    <Clock className="w-3 h-3 mr-1 text-[#5DBE61]" />
                    <span>15分钟</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-white/20">
              <Heart className="w-10 h-10" />
            </div>
            <p className="text-sm font-bold">
              {favoritedDishes.length === 0 ? '暂无收藏菜品' : '未找到匹配的收藏'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
