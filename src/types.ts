export type Taste = 'Spicy' | 'Sweet' | 'Salty' | 'Sour' | 'Light';
export type Restriction = 'No Pork' | 'No Beef' | 'No Chicken' | 'No Duck' | 'Vegetarian' | 'Gluten Free' | 'None';
export type Goal = 'Weight Loss' | 'Healthy';

export interface UserPreferences {
  tastes: Taste[];
  restrictions: Restriction[];
  goal: Goal;
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

export interface DishOption {
  name: string;
  type: 'single' | 'multiple';
  choices: {
    ingredientId: string;
    amount: number;
    isDefault?: boolean;
  }[];
}

export interface Dish {
  id: string;
  name: string;
  image: string;
  tastes: Taste[];
  tags: string[];
  ingredients: { ingredientId: string; amount: number }[];
  seasonings?: { ingredientId: string; amount: number }[];
  options?: DishOption[];
  tutorials: { type: 'video' | 'text'; platform: string; url: string; title: string }[];
  calories: number;
  category: string;
}

export interface CartItem {
  ingredient: Ingredient;
  amount: number;
}

export interface Address {
  id: string;
  name: string;
  detail: string;
  doorNumber: string;
  label: string;
  contactName: string;
  gender: '先生' | '女士';
  phone: string;
  lat: number;
  lng: number;
  isDefault?: boolean;
}

export interface NotificationSettings {
  outsideApp: {
    system: boolean;
    systemDetail: boolean;
    service: boolean;
    promo: boolean;
    sms: boolean;
  };
  insideApp: {
    banner: boolean;
    bannerDetail: boolean;
    service: boolean;
    promo: boolean;
    chat: boolean;
  };
}

export interface GeneralSettings {
  allowClipboard: boolean;
  screenshotFeedback: boolean;
  screenshotShare: boolean;
  nonWifiImageQuality: 'Normal' | 'HD';
  wifiAutoUpdate: boolean;
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;
  email: string;
  realNameStatus: string;
  passwordLevel: '低' | '中' | '高';
  isWechatBound: boolean;
  isQQBound: boolean;
  paymentPasswordSet: boolean;
  fingerprintPayment: boolean;
  smallAmountNoPassword: boolean;
  deductionOrder: string[];
  autoDeduction: boolean;
  fastPayment: boolean;
  payLater: boolean;
  notifications: NotificationSettings;
  generalSettings: GeneralSettings;
}
