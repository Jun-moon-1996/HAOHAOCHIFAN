import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserPreferences, CartItem, Dish, Address, UserProfile } from './types';

interface AppState {
  view: 'login' | 'preferences' | 'main' | 'dish-detail' | 'kit-detail' | 'orders' | 'address-list' | 'address-edit' | 'favorites' | 'coupons' | 'settings' | 'personal-info' | 'account-security' | 'payment-settings' | 'customer-service' | 'privacy-settings' | 'notification-settings' | 'general-settings';
  tab: 'recipe' | 'random' | 'groceries' | 'profile';
  preferences: UserPreferences | null;
  cart: CartItem[];
  selectedDish: Dish | null;
  addresses: Address[];
  editingAddressId: string | null;
  favorites: string[];
  user: UserProfile;
  recipeCategory: string;
  isInitialSetup: boolean;
}

interface AppContextType extends AppState {
  setView: (view: AppState['view']) => void;
  setTab: (tab: AppState['tab']) => void;
  setPreferences: (prefs: UserPreferences) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (ingredientId: string) => void;
  clearCart: () => void;
  setSelectedDish: (dish: Dish | null) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  updateAddress: (address: Address) => void;
  setEditingAddressId: (id: string | null) => void;
  toggleFavorite: (dishId: string) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  setRecipeCategory: (category: string) => void;
  setIsInitialSetup: (isInitial: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    view: 'login',
    tab: 'random',
    preferences: null,
    cart: [],
    selectedDish: null,
    addresses: [],
    editingAddressId: null,
    favorites: [],
    user: {
      id: '12345678',
      nickname: '吃货小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      phone: '189****6628',
      email: 'xiaoming@example.com',
      realNameStatus: '待完善',
      passwordLevel: '中',
      isWechatBound: true,
      isQQBound: false,
      paymentPasswordSet: true,
      fingerprintPayment: false,
      smallAmountNoPassword: false,
      deductionOrder: ['余额', '银行卡', '微信支付'],
      autoDeduction: false,
      fastPayment: false,
      payLater: false,
      notifications: {
        outsideApp: {
          system: true,
          systemDetail: true,
          service: true,
          promo: false,
          sms: false,
        },
        insideApp: {
          banner: true,
          bannerDetail: true,
          service: true,
          promo: true,
          chat: true,
        },
      },
      generalSettings: {
        allowClipboard: true,
        screenshotFeedback: true,
        screenshotShare: true,
        nonWifiImageQuality: 'Normal',
        wifiAutoUpdate: true,
      },
    },
    recipeCategory: '全部',
    isInitialSetup: false,
  });

  const setView = (view: AppState['view']) => setState((s) => ({ ...s, view }));
  const setTab = (tab: AppState['tab']) => setState((s) => ({ ...s, tab }));
  const setPreferences = (preferences: UserPreferences) => setState((s) => ({ ...s, preferences }));
  const setSelectedDish = (selectedDish: Dish | null) => setState((s) => ({ ...s, selectedDish }));
  const setRecipeCategory = (recipeCategory: string) => setState((s) => ({ ...s, recipeCategory }));
  const setIsInitialSetup = (isInitialSetup: boolean) => setState((s) => ({ ...s, isInitialSetup }));

  const updateUser = (updates: Partial<UserProfile>) => {
    setState((s) => ({
      ...s,
      user: { ...s.user, ...updates },
    }));
  };

  const toggleFavorite = (dishId: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(dishId)
        ? s.favorites.filter((id) => id !== dishId)
        : [...s.favorites, dishId],
    }));
  };

  const setEditingAddressId = (editingAddressId: string | null) => setState((s) => ({ ...s, editingAddressId }));

  const addAddress = (address: Address) => {
    setState((s) => {
      let newAddresses = s.addresses;
      if (address.isDefault) {
        newAddresses = newAddresses.map(a => ({ ...a, isDefault: false }));
      }
      return {
        ...s,
        addresses: [...newAddresses, address],
      };
    });
  };

  const removeAddress = (id: string) => {
    setState((s) => ({
      ...s,
      addresses: s.addresses.filter(a => a.id !== id),
    }));
  };

  const updateAddress = (address: Address) => {
    setState((s) => {
      let newAddresses = s.addresses.map(a => a.id === address.id ? address : a);
      if (address.isDefault) {
        newAddresses = newAddresses.map(a => a.id === address.id ? a : (a.isDefault ? { ...a, isDefault: false } : a));
      }
      return {
        ...s,
        addresses: newAddresses,
      };
    });
  };

  const addToCart = (item: CartItem) => {
    setState((s) => {
      const existing = s.cart.find((c) => c.ingredient.id === item.ingredient.id);
      if (existing) {
        return {
          ...s,
          cart: s.cart.map((c) =>
            c.ingredient.id === item.ingredient.id ? { ...c, amount: c.amount + item.amount } : c
          ),
        };
      }
      return { ...s, cart: [...s.cart, item] };
    });
  };

  const removeFromCart = (ingredientId: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((c) => c.ingredient.id !== ingredientId),
    }));
  };

  const clearCart = () => setState((s) => ({ ...s, cart: [] }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        setView,
        setTab,
        setPreferences,
        addToCart,
        removeFromCart,
        clearCart,
        setSelectedDish,
        addAddress,
        removeAddress,
        updateAddress,
        setEditingAddressId,
        toggleFavorite,
        updateUser,
        setRecipeCategory,
        setIsInitialSetup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};
