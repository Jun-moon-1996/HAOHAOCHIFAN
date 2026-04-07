import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { INGREDIENTS } from '../data';
import { ArrowLeft, PlayCircle, FileText, ShoppingCart, Plus, Minus, ChevronRight, CheckSquare, Square, Heart, Share2, Flame } from 'lucide-react';

export default function DishDetail() {
  const { setView, selectedDish, addToCart, setTab, favorites, toggleFavorite } = useAppStore();
  const [portions, setPortions] = useState(1);
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
  const [includeSeasonings, setIncludeSeasonings] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const isFavorited = selectedDish ? favorites.includes(selectedDish.id) : false;

  useEffect(() => {
    if (selectedDish) {
      const initial: Record<string, number> = {};
      selectedDish.ingredients.forEach(item => {
        initial[item.ingredientId] = item.amount;
      });
      if (selectedDish.seasonings) {
        selectedDish.seasonings.forEach(item => {
          initial[item.ingredientId] = item.amount;
        });
      }
      setCustomAmounts(initial);
      
      const initialOptions: Record<string, string[]> = {};
      if (selectedDish.options) {
        selectedDish.options.forEach(opt => {
          const defaultChoices = opt.choices.filter(c => c.isDefault).map(c => c.ingredientId);
          initialOptions[opt.name] = defaultChoices;
        });
      }
      setSelectedOptions(initialOptions);
      
      setPortions(1);
      setIncludeSeasonings(true);
    }
  }, [selectedDish]);

  if (!selectedDish) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => setView('main')}>返回</button>
      </div>
    );
  }

  const handlePortionChange = (newPortions: number) => {
    if (newPortions < 1) return;
    setPortions(newPortions);
    setCustomAmounts(prev => {
      const updated = { ...prev };
      selectedDish.ingredients.forEach(item => {
        updated[item.ingredientId] = item.amount * newPortions;
      });
      return updated;
    });
  };

  const handleIngredientAmountChange = (id: string, delta: number) => {
    setCustomAmounts(prev => {
      const current = prev[id] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleOptionToggle = (groupName: string, ingredientId: string, type: 'single' | 'multiple') => {
    setSelectedOptions(prev => {
      const current = prev[groupName] || [];
      if (type === 'single') {
        return { ...prev, [groupName]: [ingredientId] };
      } else {
        if (current.includes(ingredientId)) {
          return { ...prev, [groupName]: current.filter(id => id !== ingredientId) };
        } else {
          return { ...prev, [groupName]: [...current, ingredientId] };
        }
      }
    });
  };

  const handleAddAllToCart = () => {
    selectedDish.ingredients.forEach(item => {
      const amount = customAmounts[item.ingredientId] ?? item.amount;
      if (amount > 0) {
        const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
        if (ingredient) {
          addToCart({ ingredient, amount });
        }
      }
    });

    if (includeSeasonings && selectedDish.seasonings) {
      selectedDish.seasonings.forEach(item => {
        const amount = customAmounts[item.ingredientId] ?? item.amount;
        if (amount > 0) {
          const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
          if (ingredient) {
            addToCart({ ingredient, amount });
          }
        }
      });
    }

    if (selectedDish.options) {
      selectedDish.options.forEach(opt => {
        const selectedIds = selectedOptions[opt.name] || [];
        selectedIds.forEach(id => {
          const choice = opt.choices.find(c => c.ingredientId === id);
          const ingredient = INGREDIENTS.find(i => i.id === id);
          if (choice && ingredient) {
            addToCart({ ingredient, amount: choice.amount * portions });
          }
        });
      });
    }

    setTab('groceries');
    setView('main');
  };

  const ingredientsPrice = selectedDish.ingredients.reduce((sum, item) => {
    const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
    const amount = customAmounts[item.ingredientId] ?? item.amount;
    return sum + (ingredient ? ingredient.price * amount : 0);
  }, 0);

  const seasoningsPrice = selectedDish.seasonings?.reduce((sum, item) => {
    const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
    const amount = customAmounts[item.ingredientId] ?? item.amount;
    return sum + (ingredient ? ingredient.price * amount : 0);
  }, 0) || 0;

  const optionsPrice = selectedDish.options?.reduce((sum, opt) => {
    const selectedIds = selectedOptions[opt.name] || [];
    const optSum = selectedIds.reduce((s, id) => {
      const choice = opt.choices.find(c => c.ingredientId === id);
      const ingredient = INGREDIENTS.find(i => i.id === id);
      if (choice && ingredient) {
        return s + (ingredient.price * choice.amount * portions);
      }
      return s;
    }, 0);
    return sum + optSum;
  }, 0) || 0;

  const totalPrice = ingredientsPrice + (includeSeasonings ? seasoningsPrice : 0) + optionsPrice;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F7FAF7] relative"
    >
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Top Image Section with Fade Effect */}
        <div className="relative h-[320px] w-full overflow-hidden bg-white">
          <img 
            src={selectedDish.image} 
            alt={selectedDish.name} 
            className="w-full h-full object-cover object-center" 
            referrerPolicy="no-referrer" 
          />
          {/* Top shadow for back button visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent h-20" />
          
          {/* Bottom Fade-out Effect - Blends into bg-[#F7FAF7] */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F7FAF7] via-[#F7FAF7]/60 to-transparent" />
          
          <div className="absolute top-12 left-5 right-5 flex justify-between items-center z-20">
            <button
              onClick={() => setView('main')}
              className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-xl border border-white/50 transition-all active:scale-90"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => selectedDish && toggleFavorite(selectedDish.id)}
                className={`w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border border-white/50 transition-all active:scale-90 ${isFavorited ? 'text-red-500' : 'text-gray-800'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 shadow-xl border border-white/50 transition-all active:scale-90">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-5 right-5 z-20">
            <h1 className="text-2xl font-black text-gray-900 mb-2 drop-shadow-sm tracking-tight">{selectedDish.name}</h1>
            <div className="flex flex-wrap gap-2">
              {selectedDish.tastes.map(taste => (
                <span key={taste} className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] text-gray-600 font-bold tracking-wide shadow-sm border border-white/30">
                  {taste === 'Spicy' ? '辣' : taste === 'Sweet' ? '甜' : taste === 'Salty' ? '咸' : taste === 'Sour' ? '酸' : '清淡'}
                </span>
              ))}
              {selectedDish.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] text-gray-600 font-bold tracking-wide shadow-sm border border-white/30">
                  {tag}
                </span>
              ))}
              <div className="flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-[10px] text-gray-600 font-bold shadow-sm border border-white/30">
                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span>{selectedDish.calories} kcal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 mt-4 relative z-10 space-y-6 pb-10">
          {/* Tutorial Recommendation Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-lg card-shadow p-8 border border-white/40"
          >
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 tracking-tight">教程推荐</h2>
                  <div className="h-1 w-8 bg-[#5DBE61] rounded-full mt-1" />
                </div>
                <span className="text-[10px] font-bold text-[#5DBE61] uppercase tracking-widest bg-[#5DBE61]/10 px-3 py-1 rounded-full">Tutorials</span>
              </div>
              <div className="space-y-4">
                {selectedDish.tutorials.map((tutorial, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      window.open(tutorial.url, '_blank');
                    }}
                    className="w-full flex items-center p-4 glass rounded-lg hover:bg-white transition-all group text-left border border-white/20 shadow-sm"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-transform group-hover:scale-110 ${tutorial.type === 'video' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {tutorial.type === 'video' ? <PlayCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 group-hover:text-[#5DBE61] transition-colors text-base line-clamp-1">{tutorial.title}</h3>
                      <p className="text-xs text-gray-400 font-normal mt-1 uppercase tracking-wider">{tutorial.platform}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#5DBE61] transition-colors" />
                  </button>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Ingredients Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-lg card-shadow p-8 space-y-10 border border-white/40"
          >
            <section>
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 tracking-tight">所需食材</h2>
                  <div className="h-1 w-8 bg-[#5DBE61] rounded-full mt-1" />
                </div>
                
                <div className="flex items-center space-x-4 glass px-5 py-2 rounded-full shadow-sm">
                  <button 
                    onClick={() => handlePortionChange(portions - 1)} 
                    className="w-8 h-8 flex items-center justify-center glass text-gray-600 rounded-full hover:bg-white transition-all shadow-sm active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col items-center min-w-[32px]">
                    <span className="text-[8px] font-bold text-gray-400 uppercase leading-none mb-1">人份</span>
                    <span className="font-bold text-gray-800 text-sm leading-none">{portions}</span>
                  </div>
                  <button 
                    onClick={() => handlePortionChange(portions + 1)} 
                    className="w-8 h-8 flex items-center justify-center glass text-gray-600 rounded-full hover:bg-white transition-all shadow-sm active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="glass rounded-lg overflow-hidden border border-white/20 shadow-sm">
                {selectedDish.ingredients.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    此菜品无基础食材
                  </div>
                ) : (
                  selectedDish.ingredients.map((item, index) => {
                    const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
                    if (!ingredient) return null;
                    const currentAmount = customAmounts[item.ingredientId] ?? item.amount;
  
                    return (
                      <div key={item.ingredientId} className={`flex items-center p-5 ${index !== selectedDish.ingredients.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-base">{ingredient.name}</h4>
                          <p className="text-xs font-normal text-[#5DBE61] mt-1 uppercase tracking-wider">¥{ingredient.price.toFixed(2)} / {ingredient.unit}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-[#5DBE61]/10 rounded-full px-3 py-2">
                          <button
                            onClick={() => handleIngredientAmountChange(item.ingredientId, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white rounded-full shadow-sm transition-all active:scale-90"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-[#5DBE61] text-sm w-6 text-center">{currentAmount}</span>
                          <button
                            onClick={() => handleIngredientAmountChange(item.ingredientId, 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#5DBE61] hover:bg-white rounded-full shadow-sm transition-all active:scale-90"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
  
            {selectedDish.seasonings && selectedDish.seasonings.length > 0 && (
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 tracking-tight">可选调料包</h2>
                  <button
                    onClick={() => setIncludeSeasonings(!includeSeasonings)}
                    className="flex items-center space-x-2 text-xs font-normal text-gray-400 hover:text-[#5DBE61] transition-all uppercase tracking-widest"
                  >
                    {includeSeasonings ? (
                      <CheckSquare className="w-5 h-5 text-[#5DBE61]" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                    <span>包含调料包 (+¥{seasoningsPrice.toFixed(2)})</span>
                  </button>
                </div>
  
                <div className={`glass rounded-lg overflow-hidden transition-all border border-white/20 shadow-sm ${includeSeasonings ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                  {selectedDish.seasonings.map((item, index) => {
                    const ingredient = INGREDIENTS.find(i => i.id === item.ingredientId);
                    if (!ingredient) return null;
                    const currentAmount = customAmounts[item.ingredientId] ?? item.amount;
  
                    return (
                      <div key={item.ingredientId} className={`flex items-center p-5 ${index !== selectedDish.seasonings!.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-base">{ingredient.name}</h4>
                          <p className="text-xs font-normal text-[#5DBE61] mt-1 uppercase tracking-wider">¥{ingredient.price.toFixed(2)} / {ingredient.unit}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3 bg-[#5DBE61]/10 rounded-full px-3 py-2">
                          <button
                            onClick={() => handleIngredientAmountChange(item.ingredientId, -1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-white rounded-full shadow-sm transition-all active:scale-90"
                            disabled={!includeSeasonings}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-[#5DBE61] text-sm w-6 text-center">{currentAmount}</span>
                          <button
                            onClick={() => handleIngredientAmountChange(item.ingredientId, 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#5DBE61] hover:bg-white rounded-full shadow-sm transition-all active:scale-90"
                            disabled={!includeSeasonings}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
  
            {selectedDish.options && selectedDish.options.map((opt, idx) => (
              <section key={idx}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 tracking-tight">{opt.name}</h2>
                  <span className="text-xs font-normal text-[#5DBE61] uppercase tracking-widest">{opt.type === 'multiple' ? 'Multiple Choice' : 'Single Choice'}</span>
                </div>
                <div className="glass rounded-lg overflow-hidden border border-white/20 shadow-sm">
                  {opt.choices.map((choice, index) => {
                    const ingredient = INGREDIENTS.find(i => i.id === choice.ingredientId);
                    if (!ingredient) return null;
                    const isSelected = selectedOptions[opt.name]?.includes(choice.ingredientId);
                    
                    return (
                      <div 
                        key={choice.ingredientId} 
                        className={`flex items-center p-5 cursor-pointer hover:bg-white/50 transition-all ${index !== opt.choices.length - 1 ? 'border-b border-white/10' : ''}`}
                        onClick={() => handleOptionToggle(opt.name, choice.ingredientId, opt.type)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {opt.type === 'multiple' ? (
                            isSelected ? <CheckSquare className="w-6 h-6 text-[#5DBE61]" /> : <Square className="w-6 h-6 text-gray-300" />
                          ) : (
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-[#5DBE61] bg-[#5DBE61]/10' : 'border-gray-300'}`}>
                              {isSelected && <div className="w-3 h-3 rounded-full bg-[#5DBE61] shadow-sm shadow-[#5DBE61]/50" />}
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{ingredient.name}</h4>
                            <p className="text-[10px] font-bold text-[#5DBE61] mt-1 uppercase tracking-wider">+{ingredient.price.toFixed(2)} / {ingredient.unit}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Cart Bar */}
      <div className="shrink-0 px-5 pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))] bg-[#F7FAF7] z-20">
        <div className="bg-gray-900/90 backdrop-blur-xl text-white rounded-lg p-4 flex items-center justify-between shadow-2xl border border-white/10">
          <div className="ml-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-2xl font-black text-[#5DBE61] leading-none">¥{totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddAllToCart}
            disabled={totalPrice === 0}
            className="bg-[#5DBE61] hover:bg-[#5DBE61]/90 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold px-10 py-4 rounded-full shadow-xl shadow-[#5DBE61]/20 transition-all active:scale-95 flex items-center space-x-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest">加入购物车</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
