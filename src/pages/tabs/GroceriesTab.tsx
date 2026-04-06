import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { DISHES, INGREDIENTS } from '../../data';
import { Dish } from '../../types';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Search, Package, ShoppingCart, CheckSquare, Square, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface RecipeKitCardProps {
  dish: Dish;
  onAdd: (dish: Dish, includeSeasonings: boolean) => void;
}

const RecipeKitCard: React.FC<{ dish: Dish }> = ({ dish }) => {
  const { setView, setSelectedDish } = useAppStore();

  const ingredientsPrice = dish.ingredients.reduce((sum, req) => {
    const ing = INGREDIENTS.find(i => i.id === req.ingredientId);
    return sum + (ing ? ing.price * req.amount : 0);
  }, 0);

  const seasoningsPrice = dish.seasonings?.reduce((sum, req) => {
    const ing = INGREDIENTS.find(i => i.id === req.ingredientId);
    return sum + (ing ? ing.price * req.amount : 0);
  }, 0) || 0;

  const totalPrice = ingredientsPrice + seasoningsPrice;

  return (
    <div 
      onClick={() => {
        setSelectedDish(dish);
        setView('kit-detail');
      }}
      className="glass rounded-lg shadow-sm border border-white/20 overflow-hidden card-shadow p-4 flex items-center cursor-pointer hover:bg-white/50 transition-all group"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-sm">
        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="font-bold text-gray-800 text-base">{dish.name} 食材包</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-primary font-bold text-sm">预估 ¥{totalPrice.toFixed(2)}</p>
          <span className="text-[10px] text-gray-300 font-medium">|</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{dish.ingredients.length + (dish.seasonings?.length || 0)} 种食材</span>
        </div>
        <div className="mt-2 flex items-center text-[10px] text-accent font-bold uppercase tracking-widest">
          <span>查看详情并加购</span>
          <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default function GroceriesTab() {
  const { cart, addToCart, removeFromCart, clearCart } = useAppStore();
  const [mode, setMode] = useState<'recipe' | 'free'>('recipe');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const total = cart.reduce((sum, item) => sum + item.ingredient.price * item.amount, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);

  const handleCheckout = () => {
    alert('跳转到美团优选/盒马...');
    clearCart();
    setShowCart(false);
  };

  const handleAddRecipeKit = (dish: Dish, includeSeasonings: boolean) => {
    dish.ingredients.forEach(req => {
      const ingredient = INGREDIENTS.find(i => i.id === req.ingredientId);
      if (ingredient) {
        addToCart({ ingredient, amount: req.amount });
      }
    });

    if (includeSeasonings && dish.seasonings) {
      dish.seasonings.forEach(req => {
        const ingredient = INGREDIENTS.find(i => i.id === req.ingredientId);
        if (ingredient) {
          addToCart({ ingredient, amount: req.amount });
        }
      });
    }
  };

  const dishesWithIngredients = DISHES.filter(d => 
    d.ingredients.length > 0 && d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredIngredients = INGREDIENTS.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group ingredients by category
  const groupedIngredients = filteredIngredients.reduce((acc, ingredient) => {
    const cat = ingredient.category || '其他';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(ingredient);
    return acc;
  }, {} as Record<string, typeof INGREDIENTS>);

  return (
    <div className="min-h-full bg-bg-light flex flex-col relative pb-24">
      <div className="px-5 pt-12 pb-0">
        {/* Mode Toggle */}
        <div className="flex glass p-2 rounded-full mb-6 shadow-sm">
          <button
            onClick={() => setMode('recipe')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center space-x-2 ${
              mode === 'recipe' ? 'bg-green-gradient text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>菜谱食材包</span>
          </button>
          <button
            onClick={() => setMode('free')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-full transition-all flex items-center justify-center space-x-2 ${
              mode === 'free' ? 'bg-green-gradient text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>自由买菜</span>
          </button>
        </div>

        <div className="relative flex items-center mb-6 group">
          <div className="absolute left-4 z-10">
            <Search className="text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder={mode === 'recipe' ? "搜索菜谱食材包..." : "搜索食材..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass rounded-full py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="flex-1 px-5 overflow-y-auto hide-scrollbar">
        {mode === 'recipe' ? (
          <div className="space-y-6">
            {dishesWithIngredients.map(dish => (
              <RecipeKitCard key={dish.id} dish={dish} />
            ))}
            {dishesWithIngredients.length === 0 && (
              <div className="text-center text-gray-400 py-20 text-sm font-medium">
                没有找到相关的菜谱食材包
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedIngredients).map(([category, ingredients]) => (
              <div key={category} className="space-y-4">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between text-base font-bold text-gray-800 py-1"
                >
                  <div className="flex items-center">
                    <span className="w-2 h-4 bg-primary rounded-full mr-3"></span>
                    {category}
                    <span className="ml-2 text-xs font-bold text-gray-400">({ingredients.length})</span>
                  </div>
                  {collapsedCategories[category] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                {!collapsedCategories[category] && (
                  <div className="grid grid-cols-2 gap-4">
                    {ingredients.map(ingredient => {
                      const cartItem = cart.find(c => c.ingredient.id === ingredient.id);
                      return (
                        <div key={ingredient.id} className="glass p-4 rounded-[1.5rem] card-shadow flex flex-col justify-between min-h-[100px]">
                          <h3 className="font-bold text-gray-800 text-sm mb-3">{ingredient.name}</h3>
                          <div className="flex justify-between items-center mt-auto">
                            <p className="text-primary font-bold text-sm">
                              ¥{ingredient.price.toFixed(2)}<span className="text-gray-400 text-[9px] font-medium">/{ingredient.unit}</span>
                            </p>
                            
                            {cartItem ? (
                              <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-2 py-1">
                                <button
                                  onClick={() => {
                                    if (cartItem.amount > 1) {
                                      addToCart({ ingredient, amount: -1 });
                                    } else {
                                      removeFromCart(ingredient.id);
                                    }
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-full shadow-sm transition-all active:scale-90"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-primary text-xs w-4 text-center">{cartItem.amount}</span>
                                <button
                                  onClick={() => addToCart({ ingredient, amount: 1 })}
                                  className="w-8 h-8 flex items-center justify-center text-primary bg-white rounded-full shadow-sm transition-all active:scale-90"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart({ ingredient, amount: 1 })}
                                className="w-10 h-10 bg-green-gradient text-white rounded-full flex items-center justify-center hover:opacity-90 shadow-md transition-all active:scale-90"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            {Object.keys(groupedIngredients).length === 0 && (
              <div className="text-center text-gray-400 py-20 text-sm font-medium">
                没有找到相关的食材
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Cart Summary */}
      {totalItems > 0 && !showCart && (
        <div className="fixed bottom-24 left-4 right-4 z-20">
          <div 
            onClick={() => setShowCart(true)}
            className="bg-gray-900/95 backdrop-blur-2xl text-white rounded-lg p-3 flex items-center justify-between shadow-2xl cursor-pointer border border-white/10"
          >
            <div className="flex items-center space-x-4">
              <div className="relative ml-2">
                <div className="bg-green-gradient p-3 rounded-full shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="font-bold text-lg leading-none mb-1">¥{total.toFixed(2)}</p>
                <p className="text-[10px] text-gray-400 font-medium tracking-tight">预估总价，免配送费</p>
              </div>
            </div>
            <button className="bg-green-gradient hover:opacity-90 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg active:scale-95">
              去结算
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCart(false)} />
          <div className="bg-bg-light rounded-t-lg w-full max-h-[80vh] flex flex-col relative z-10 shadow-2xl border-t border-white/20">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">已选食材</h2>
              <button onClick={clearCart} className="text-xs text-gray-400 font-bold flex items-center hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4 mr-2" /> 清空
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.map((item) => (
                <div key={item.ingredient.id} className="flex items-center justify-between glass p-3 rounded-lg">
                  <div className="flex items-center">
                    <img src={item.ingredient.image} alt={item.ingredient.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50 mr-4" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{item.ingredient.name}</h3>
                      <p className="text-accent font-bold text-sm">¥{item.ingredient.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-accent/10 rounded-full px-3 py-2">
                    <button
                      onClick={() => {
                        if (item.amount > 1) {
                          addToCart({ ingredient: item.ingredient, amount: -1 });
                        } else {
                          removeFromCart(item.ingredient.id);
                        }
                      }}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 bg-white rounded-full shadow-sm transition-all active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-accent text-sm w-5 text-center">{item.amount}</span>
                    <button
                      onClick={() => addToCart({ ingredient: item.ingredient, amount: 1 })}
                      className="w-10 h-10 flex items-center justify-center text-accent bg-white rounded-full shadow-sm transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-md pb-10">
              <button
                onClick={handleCheckout}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-full shadow-xl shadow-accent/20 flex items-center justify-center space-x-3 transition-all active:scale-95"
              >
                <CreditCard className="w-5 h-5" />
                <span>¥{total.toFixed(2)} 立即结算</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
