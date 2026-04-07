import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { DISHES } from '../../data';
import { Search, Filter, Clock, Bell, MapPin, Compass } from 'lucide-react';

const CATEGORIES = ['全部', '米饭', '面类', '炒菜', '快手小吃'];

export default function RecipeTab() {
  const { setView, setSelectedDish, preferences, recipeCategory, setRecipeCategory } = useAppStore();
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDishes = DISHES.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (recipeCategory === '全部') return true;
    return dish.category === recipeCategory;
  }).sort((a, b) => {
    // Prioritize weight loss dishes if goal is Weight Loss
    if (preferences?.goal === 'Weight Loss') {
      const aIsWL = a.tags.includes('减脂');
      const bIsWL = b.tags.includes('减脂');
      if (aIsWL && !bIsWL) return -1;
      if (!aIsWL && bIsWL) return 1;
    }
    return 0;
  });

  return (
    <div className="min-h-full bg-[#F7FAF7]">
      <div className="bg-gradient-to-b from-[#5DBE61]/15 to-transparent px-5 pt-[calc(3rem+env(safe-area-inset-top))] pb-4">
        {/* Search Bar */}
        <div className="relative flex items-center mb-[20px] group">
          <div className="absolute left-4 z-10">
            <Search className="text-gray-400 w-5 h-5 group-focus-within:text-[#5DBE61] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="你想吃什么？"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[44px] glass rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5DBE61]/30 transition-shadow shadow-sm text-base"
          />
        </div>
        
        {/* Category Scroll Bar */}
        <div className="flex overflow-x-auto hide-scrollbar -mx-5 px-5 pb-2 gap-3 mb-[20px]">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setRecipeCategory(category)}
              className={`whitespace-nowrap px-6 h-[36px] flex items-center justify-center rounded-full text-xs font-bold transition-all active:scale-95 ${
                recipeCategory === category
                  ? 'bg-[#5DBE61] text-white shadow-lg scale-105'
                  : 'glass text-gray-500 hover:bg-white/90'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">为你推荐</h2>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-[#5DBE61] font-normal hover:underline"
          >
            {showAll ? '收起' : '查看全部'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {(showAll ? filteredDishes : filteredDishes.slice(0, 4)).map(dish => (
            <div
              key={dish.id}
              onClick={() => {
                setSelectedDish(dish);
                setView('dish-detail');
              }}
              className="bg-white rounded-lg overflow-hidden card-shadow active:scale-95 transition-all cursor-pointer flex flex-col p-2"
            >
              <div className="relative aspect-square rounded-md overflow-hidden mb-3">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
            </div>
          ))}
        </div>
        
        {filteredDishes.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm font-medium">
            没有找到相关菜品，换个分类或关键词试试吧
          </div>
        )}
      </div>
    </div>
  );
}
