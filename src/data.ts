import { Dish, Ingredient } from './types';

export const BASE64_IMAGES: Record<string, string> = {
  '麻婆豆腐': '',
  '煎饺': '',
  '三明治': '',
  '意大利面': '',
  '汉堡': '',
};

export const INGREDIENTS: Ingredient[] = [
  { id: 'i1', name: '豆腐', price: 3.5, unit: '块', image: 'https://picsum.photos/seed/tofu/200/200', category: '蔬菜豆制品' },
  { id: 'i2', name: '猪肉末', price: 5.0, unit: '份', image: 'https://picsum.photos/seed/pork/200/200', category: '肉蛋水产' },
  { id: 'i3', name: '豆瓣酱', price: 0.5, unit: '包', image: 'https://picsum.photos/seed/sauce/200/200', category: '调味品' },
  { id: 'i4', name: '番茄', price: 3.0, unit: '个', image: 'https://picsum.photos/seed/tomato/200/200', category: '蔬菜豆制品' },
  { id: 'i5', name: '鸡蛋', price: 1.5, unit: '个', image: 'https://picsum.photos/seed/egg/200/200', category: '肉蛋水产' },
  { id: 'i6', name: '小葱', price: 1.0, unit: '把', image: 'https://picsum.photos/seed/scallion/200/200', category: '调味品' },
  { id: 'i7', name: '大米', price: 2.0, unit: '份', image: 'https://picsum.photos/seed/rice/200/200', category: '主食面点' },
  { id: 'i8', name: '西兰花', price: 4.5, unit: '份', image: 'https://picsum.photos/seed/broccoli/200/200', category: '蔬菜豆制品' },
  { id: 'i9', name: '大蒜', price: 1.0, unit: '头', image: 'https://picsum.photos/seed/garlic/200/200', category: '调味品' },
  { id: 'i10', name: '土豆', price: 1.5, unit: '个', image: 'https://picsum.photos/seed/potato/200/200', category: '蔬菜豆制品' },
  { id: 'i11', name: '青椒', price: 2.0, unit: '个', image: 'https://picsum.photos/seed/greenpepper/200/200', category: '蔬菜豆制品' },
  { id: 'i12', name: '茄子', price: 4.0, unit: '个', image: 'https://picsum.photos/seed/eggplant/200/200', category: '蔬菜豆制品' },
  { id: 'i13', name: '生抽', price: 0.5, unit: '包', image: 'https://picsum.photos/seed/soysauce/200/200', category: '调味品' },
  { id: 'i14', name: '老抽', price: 0.5, unit: '包', image: 'https://picsum.photos/seed/darksoysauce/200/200', category: '调味品' },
  { id: 'i15', name: '白糖', price: 0.3, unit: '包', image: 'https://picsum.photos/seed/sugar/200/200', category: '调味品' },
  { id: 'i16', name: '米醋', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/vinegar/200/200', category: '调味品' },
  { id: 'i17', name: '盐', price: 0.2, unit: '包', image: 'https://picsum.photos/seed/salt/200/200', category: '调味品' },
  { id: 'i18', name: '玉米淀粉', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/cornstarch/200/200', category: '调味品' },
  { id: 'i20', name: '白醋', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/whitevinegar/200/200', category: '调味品' },
  { id: 'i21', name: '鸡胸肉', price: 7.0, unit: '块', image: 'https://picsum.photos/seed/chickenbreast/200/200', category: '肉蛋水产' },
  { id: 'i22', name: '黄瓜', price: 2.5, unit: '个', image: 'https://picsum.photos/seed/cucumber/200/200', category: '蔬菜豆制品' },
  { id: 'i23', name: '花生米', price: 2.0, unit: '小包', image: 'https://picsum.photos/seed/peanuts/200/200', category: '其他' },
  { id: 'i24', name: '干辣椒', price: 0.5, unit: '小包', image: 'https://picsum.photos/seed/driedchili/200/200', category: '调味品' },
  { id: 'i25', name: '香醋', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/balsamicvinegar/200/200', category: '调味品' },
  { id: 'i27', name: '嫩豆腐', price: 3.5, unit: '盒', image: 'https://picsum.photos/seed/silkentofu/200/200', category: '蔬菜豆制品' },
  { id: 'i30', name: '花椒粉', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/sichuanpeppercorn/200/200', category: '调味品' },
  { id: 'i31', name: '辣椒粉', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/chilipowder/200/200', category: '调味品' },
  { id: 'i32', name: '火腿', price: 3.0, unit: '份', image: 'https://picsum.photos/seed/ham/200/200', category: '肉蛋水产' },
  { id: 'i33', name: '胡萝卜', price: 1.5, unit: '个', image: 'https://picsum.photos/seed/carrot/200/200', category: '蔬菜豆制品' },
  { id: 'i34', name: '青豆', price: 2.0, unit: '小包', image: 'https://picsum.photos/seed/greenpeas/200/200', category: '蔬菜豆制品' },
  { id: 'i35', name: '白胡椒粉', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/whitepepper/200/200', category: '调味品' },
  { id: 'i37', name: '鸡腿肉', price: 7.0, unit: '块', image: 'https://picsum.photos/seed/chickenleg/200/200', category: '肉蛋水产' },
  { id: 'i38', name: '洋葱', price: 2.0, unit: '个', image: 'https://picsum.photos/seed/onion/200/200', category: '蔬菜豆制品' },
  { id: 'i40', name: '咖喱块', price: 1.2, unit: '包', image: 'https://picsum.photos/seed/curry/200/200', category: '调味品' },
  { id: 'i44', name: '蚝油', price: 0.6, unit: '包', image: 'https://picsum.photos/seed/oystersauce/200/200', category: '调味品' },
  { id: 'i45', name: '黑胡椒', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/blackpepper/200/200', category: '调味品' },
  { id: 'i46', name: '玉米粒', price: 2.0, unit: '小包', image: 'https://picsum.photos/seed/corn/200/200', category: '蔬菜豆制品' },
  { id: 'i47', name: '马苏里拉芝士', price: 5.0, unit: '份', image: 'https://picsum.photos/seed/mozzarella/200/200', category: '其他' },
  { id: 'i48', name: '鸡肉', price: 4.5, unit: '份', image: 'https://picsum.photos/seed/chicken/200/200', category: '肉蛋水产' },
  { id: 'i49', name: '牛肉', price: 6.0, unit: '份', image: 'https://picsum.photos/seed/beef/200/200', category: '肉蛋水产' },
  { id: 'i50', name: '培根', price: 4.5, unit: '份', image: 'https://picsum.photos/seed/bacon/200/200', category: '肉蛋水产' },
  { id: 'i51', name: '番茄酱', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/ketchup/200/200', category: '调味品' },
  { id: 'i52', name: '鲜面条', price: 3.0, unit: '份', image: 'https://picsum.photos/seed/noodles/200/200', category: '主食面点' },
  { id: 'i54', name: '花生碎', price: 2.0, unit: '小包', image: 'https://picsum.photos/seed/crushedpeanuts/200/200', category: '其他' },
  { id: 'i55', name: '辣椒油', price: 0.6, unit: '包', image: 'https://picsum.photos/seed/chilioil/200/200', category: '调味品' },
  { id: 'i56', name: '芝麻酱', price: 0.8, unit: '包', image: 'https://picsum.photos/seed/sesamepaste/200/200', category: '调味品' },
  { id: 'i57', name: '红薯粉', price: 4.0, unit: '份', image: 'https://picsum.photos/seed/sweetpotatonoodles/200/200', category: '主食面点' },
  { id: 'i59', name: '榨菜', price: 1.5, unit: '小包', image: 'https://picsum.photos/seed/zhacai/200/200', category: '其他' },
  { id: 'i60', name: '拉面', price: 3.5, unit: '份', image: 'https://picsum.photos/seed/ramen/200/200', category: '主食面点' },
  { id: 'i61', name: '牛肉片', price: 9.0, unit: '份', image: 'https://picsum.photos/seed/beefslice/200/200', category: '肉蛋水产' },
  { id: 'i62', name: '青菜', price: 2.0, unit: '份', image: 'https://picsum.photos/seed/bokchoy/200/200', category: '蔬菜豆制品' },
  { id: 'i63', name: '牛肉汤料', price: 1.2, unit: '包', image: 'https://picsum.photos/seed/beefflavor/200/200', category: '调味品' },
  { id: 'i64', name: '面条', price: 3.0, unit: '份', image: 'https://picsum.photos/seed/noodles/200/200', category: '主食面点' },
  { id: 'i67', name: '食用油', price: 0.4, unit: '包', image: 'https://picsum.photos/seed/cookingoil/200/200', category: '调味品' },
  { id: 'i70', name: '腊肠', price: 6.5, unit: '根', image: 'https://picsum.photos/seed/sausage/200/200', category: '肉蛋水产' },
  { id: 'i72', name: '猪肉白菜饺子', price: 9.0, unit: '份', image: 'https://picsum.photos/seed/dumplings1/200/200', category: '主食面点' },
  { id: 'i73', name: '猪肉韭菜饺子', price: 9.0, unit: '份', image: 'https://picsum.photos/seed/dumplings2/200/200', category: '主食面点' },
  { id: 'i74', name: '牛肉洋葱饺子', price: 11.0, unit: '份', image: 'https://picsum.photos/seed/dumplings3/200/200', category: '主食面点' },
  { id: 'i75', name: '鸡肉玉米饺子', price: 10.0, unit: '份', image: 'https://picsum.photos/seed/dumplings4/200/200', category: '主食面点' },
  { id: 'i76', name: '三鲜饺子', price: 12.0, unit: '份', image: 'https://picsum.photos/seed/dumplings5/200/200', category: '主食面点' },
  { id: 'i77', name: '吐司', price: 5.0, unit: '包', image: 'https://picsum.photos/seed/toast/200/200', category: '主食面点' },
  { id: 'i78', name: '生菜', price: 2.0, unit: '颗', image: 'https://picsum.photos/seed/lettuce/200/200', category: '蔬菜豆制品' },
  { id: 'i79', name: '火腿片', price: 3.0, unit: '份', image: 'https://picsum.photos/seed/hamslice/200/200', category: '肉蛋水产' },
  { id: 'i80', name: '芝士片', price: 4.0, unit: '份', image: 'https://picsum.photos/seed/cheeseslice/200/200', category: '其他' },
  { id: 'i81', name: '煎蛋', price: 1.5, unit: '个', image: 'https://picsum.photos/seed/friedegg/200/200', category: '肉蛋水产' },
  { id: 'i82', name: '沙拉酱', price: 0.5, unit: '包', image: 'https://picsum.photos/seed/mayo/200/200', category: '调味品' },
  { id: 'i83', name: '蜂蜜芥末酱', price: 0.6, unit: '包', image: 'https://picsum.photos/seed/mustard/200/200', category: '调味品' },
  { id: 'i84', name: '娃娃菜', price: 5.0, unit: '颗', image: 'https://picsum.photos/seed/babycabbage/200/200', category: '蔬菜豆制品' },
  { id: 'i85', name: '虾仁', price: 12.0, unit: '份', image: 'https://picsum.photos/seed/shrimp/200/200', category: '肉蛋水产' },
  { id: 'i86', name: '虾滑', price: 15.0, unit: '份', image: 'https://picsum.photos/seed/shrimppaste/200/200', category: '肉蛋水产' },
  { id: 'i87', name: '粉丝', price: 3.0, unit: '把', image: 'https://picsum.photos/seed/glassnoodles/200/200', category: '主食面点' },
  { id: 'i88', name: '大白菜', price: 4.0, unit: '颗', image: 'https://picsum.photos/seed/chinesecabbage/200/200', category: '蔬菜豆制品' },
  { id: 'i89', name: '香油', price: 0.8, unit: '包', image: 'https://picsum.photos/seed/sesameoil/200/200', category: '调味品' },
  { id: 'i90', name: '口蘑', price: 6.0, unit: '份', image: 'https://picsum.photos/seed/mushroom/200/200', category: '蔬菜豆制品' },
];

export const DISHES: Dish[] = [
  {
    id: '100',
    name: '红烧茄子',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/红烧茄子.png',
    tastes: ['Sweet', 'Salty'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i12', amount: 1 },
      { ingredientId: 'i11', amount: 1 },
      { ingredientId: 'i9', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 2 },
      { ingredientId: 'i14', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i16', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i18', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/67eb9030000000001200f5eb?source=webshare&xhsshare=pc_web&xsec_token=ABeYrE2cRoIid0Uv99f2-Ho-LVjweyjgqe3tCNwdSjMhE=&xsec_source=pc_share', title: '茄子这么做简直太下饭了！🥹酱香浓郁巨好吃 - 食堂大叔不讲李' }
    ],
    calories: 350,
    category: '炒菜'
  },
  {
    id: '1',
    name: '麻婆豆腐',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/麻婆豆腐.png',
    tastes: ['Spicy'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i27', amount: 1 },
      { ingredientId: 'i2', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i3', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i30', amount: 1 },
      { ingredientId: 'i31', amount: 1 },
      { ingredientId: 'i18', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/9M6o6MtCnkn', title: '超级无敌好吃又下饭的麻婆豆腐🔥🔥🔥 从小就超爱吃的...' }
    ],
    calories: 420,
    category: '炒菜'
  },
  {
    id: '2',
    name: '煎饺',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/煎饺.png',
    tastes: ['Salty'],
    tags: ['快手小吃'],
    ingredients: [],
    options: [
      {
        name: '选择饺子口味（12个 / 份）',
        type: 'single',
        choices: [
          { ingredientId: 'i72', amount: 1, isDefault: true },
          { ingredientId: 'i73', amount: 1 },
          { ingredientId: 'i74', amount: 1 },
          { ingredientId: 'i75', amount: 1 },
          { ingredientId: 'i76', amount: 1 },
        ]
      }
    ],
    seasonings: [
      { ingredientId: 'i25', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i55', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/9AXZWRmhTI2', title: '早起十分钟就能快速做出的营养早餐，省时省力还好吃' }
    ],
    calories: 480,
    category: '快手小吃'
  },
  {
    id: '3',
    name: '三明治',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/三明治.png',
    tastes: ['Light'],
    tags: ['快手小吃'],
    ingredients: [
      { ingredientId: 'i77', amount: 2 },
      { ingredientId: 'i78', amount: 1 },
    ],
    options: [
      {
        name: '可选肉类',
        type: 'multiple',
        choices: [
          { ingredientId: 'i32', amount: 1 },
          { ingredientId: 'i48', amount: 1 },
          { ingredientId: 'i61', amount: 1 },
          { ingredientId: 'i50', amount: 1 },
          { ingredientId: 'i79', amount: 1 },
        ]
      },
      {
        name: '可选蔬菜',
        type: 'multiple',
        choices: [
          { ingredientId: 'i4', amount: 1 },
          { ingredientId: 'i22', amount: 1 },
          { ingredientId: 'i38', amount: 1 },
          { ingredientId: 'i46', amount: 1 },
        ]
      },
      {
        name: '可选配料',
        type: 'multiple',
        choices: [
          { ingredientId: 'i80', amount: 1 },
          { ingredientId: 'i5', amount: 1 },
          { ingredientId: 'i81', amount: 1 },
        ]
      },
      {
        name: '可选酱料包',
        type: 'multiple',
        choices: [
          { ingredientId: 'i82', amount: 1 },
          { ingredientId: 'i51', amount: 1 },
          { ingredientId: 'i83', amount: 1 },
        ]
      }
    ],
    seasonings: [],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/3nkosPfjjAA', title: '十分钟轻松搞定 ☀️| 午餐肉芝士蛋包三明治 吐司 ➕...' }
    ],
    calories: 320,
    category: '快手小吃'
  },
  {
    id: '6',
    name: '咖喱鸡肉饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/咖喱鸡肉饭.png',
    tastes: ['Salty'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i37', amount: 1 },
      { ingredientId: 'i10', amount: 1 },
      { ingredientId: 'i33', amount: 1 },
      { ingredientId: 'i38', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i40', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/AaoPTEenHvH', title: '夏天到了，又下决心要减肥，吃这个咖喱鸡肉饭就正好，...' }
    ],
    calories: 650,
    category: '米饭'
  },
  {
    id: '7',
    name: '宫保鸡丁',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/宫保鸡丁.png',
    tastes: ['Spicy', 'Sweet'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i21', amount: 1 },
      { ingredientId: 'i22', amount: 1 },
      { ingredientId: 'i23', amount: 1 },
      { ingredientId: 'i24', amount: 1 },
      { ingredientId: 'i9', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 2 },
      { ingredientId: 'i14', amount: 1 },
      { ingredientId: 'i25', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i18', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/65ec1872000000000b022ff9?source=webshare&xhsshare=pc_web&xsec_token=ABZ_rw2yyJ2zy-HsUUYBH6UzYOEb95RcNdQhrSlfTmQQc=&xsec_source=pc_share', title: '食堂大叔不讲李' }
    ],
    calories: 580,
    category: '炒菜'
  },
  {
    id: '8',
    name: '扬州炒饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/扬州炒饭.png',
    tastes: ['Light'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i5', amount: 2 },
      { ingredientId: 'i32', amount: 1 },
      { ingredientId: 'i33', amount: 1 },
      { ingredientId: 'i34', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i35', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/8oypunspuTQ', title: '扬州炒饭，颗粒分明，香糯可口 @吃货薯 @视频薯' }
    ],
    calories: 620,
    category: '米饭'
  },
  {
    id: '9',
    name: '牛肉盖饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/牛肉盖饭.png',
    tastes: ['Salty'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i61', amount: 1 },
      { ingredientId: 'i5', amount: 1 },
      { ingredientId: 'i38', amount: 1 },
      { ingredientId: 'i8', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 2 },
      { ingredientId: 'i44', amount: 1 },
      { ingredientId: 'i45', amount: 1 },
      { ingredientId: 'i18', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/1jotGGnQm0B', title: '滑嫩超满足！在家就能解锁🔥美味牛肉饭 简单又好吃的...' }
    ],
    calories: 720,
    category: '米饭'
  },
  {
    id: '10',
    name: '番茄鸡蛋盖饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/番茄鸡蛋饭.png',
    tastes: ['Sour'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i4', amount: 2 },
      { ingredientId: 'i5', amount: 3 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/7CBGQhKeqLI', title: '花费3.6💰｜挑战十块钱做饭第439顿🔥🔥🔥🔥 救命啊🆘 ...' }
    ],
    calories: 550,
    category: '米饭'
  },
  {
    id: '11',
    name: '蒜蓉西兰花',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/蒜香西兰花.png',
    tastes: ['Light'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i8', amount: 1 },
      { ingredientId: 'i9', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/1xhsZ2QrztR', title: '花费4.9💰｜挑战十块钱做饭第385顿🔥🔥🔥 不爱吃西兰...' }
    ],
    calories: 180,
    category: '炒菜'
  },
  {
    id: '12',
    name: '蛋炒饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/蛋炒饭.png',
    tastes: ['Light'],
    tags: ['主食', '炒饭', '经典'],
    ingredients: [
      { ingredientId: 'i5', amount: 2 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i32', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i35', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/5RjKjjXUj0r', title: '都去做这个蛋炒饭，这个配方可以吃几十年～ 真的好好...' }
    ],
    calories: 520,
    category: '米饭'
  },
  {
    id: '13',
    name: '青椒土豆丝',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/青椒土豆丝.png',
    tastes: ['Light'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i10', amount: 2 },
      { ingredientId: 'i11', amount: 1 },
      { ingredientId: 'i9', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i20', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/2H2oFNDDGLr', title: '绝味酸辣土豆丝❗️告别饭店，在家支棱起来❗️' }
    ],
    calories: 280,
    category: '炒菜'
  },
  {
    id: '14',
    name: '麻酱拌面',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/麻酱拌面.png',
    tastes: ['Salty'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i64', amount: 1 },
      { ingredientId: 'i22', amount: 1 },
      { ingredientId: 'i54', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i56', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i25', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/4z6OK8w6SZJ', title: '2分钟懒人拌面 特别简单又特别好吃😋快安排起来吧' }
    ],
    calories: 560,
    category: '面类'
  },
  {
    id: '15',
    name: '酸辣粉',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/酸辣粉.png',
    tastes: ['Spicy', 'Sour'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i57', amount: 1 },
      { ingredientId: 'i23', amount: 1 },
      { ingredientId: 'i59', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i55', amount: 1 },
      { ingredientId: 'i25', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i35', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/5tqHPSbH9x1', title: '自制酸辣粉🍜十分钟搞定‼️酸辣过瘾又开胃' }
    ],
    calories: 450,
    category: '面类'
  },
  {
    id: '16',
    name: '葱油拌面',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/葱油拌面.png',
    tastes: ['Salty'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i64', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i14', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/6ylaSdwNaeg', title: '下班如何快速吃上饭！每次做这个葱油拌面，闺蜜都闻着...' }
    ],
    calories: 480,
    category: '面类'
  },
  {
    id: '17',
    name: '担担面',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/担担面.png',
    tastes: ['Spicy'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i52', amount: 1 },
      { ingredientId: 'i2', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
      { ingredientId: 'i54', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i55', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i30', amount: 1 },
      { ingredientId: 'i56', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/7iCVvUtPy1r', title: '一人食|成都担担面详解（成都人做的） 成都人做成都担...' }
    ],
    calories: 540,
    category: '面类'
  },
  {
    id: '18',
    name: '腊肠煲仔饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/腊味煲仔饭.png',
    tastes: ['Salty'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i7', amount: 1 },
      { ingredientId: 'i70', amount: 1 },
      { ingredientId: 'i62', amount: 1 },
      { ingredientId: 'i5', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i14', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/7lPMzkVlh0z', title: '懒人煲仔饭，好吃又好做！一个电饭煲全搞定！' }
    ],
    calories: 850,
    category: '米饭'
  },
  {
    id: '19',
    name: '番茄鸡蛋面',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/番茄鸡蛋面.png',
    tastes: ['Sour'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i64', amount: 1 },
      { ingredientId: 'i4', amount: 2 },
      { ingredientId: 'i5', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i15', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/tmCyqg0KZI', title: '下班如何快速吃上饭！不是我吹呀，就这个番茄鸡蛋面，...' }
    ],
    calories: 480,
    category: '面类'
  },
  {
    id: '20',
    name: '牛肉拉面',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/牛肉拉面.png',
    tastes: ['Salty'],
    tags: ['面类'],
    ingredients: [
      { ingredientId: 'i60', amount: 1 },
      { ingredientId: 'i61', amount: 1 },
      { ingredientId: 'i62', amount: 1 },
      { ingredientId: 'i6', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i63', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i35', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/8DMU0DxXmfu', title: '嫩滑的生烫牛肉面' }
    ],
    calories: 620,
    category: '面类'
  },
  {
    id: '21',
    name: '芝士焗饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/芝士焗饭.png',
    tastes: ['Salty'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i7', amount: 1 },
      { ingredientId: 'i46', amount: 1 },
      { ingredientId: 'i34', amount: 1 },
      { ingredientId: 'i47', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i51', amount: 1 },
      { ingredientId: 'i45', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'http://xhslink.com/o/5hKilGdXoiO', title: '宿舍小锅｜番茄芝士烩饭🧀超长拉丝超满足‼️ 今日晚...' }
    ],
    calories: 780,
    category: '米饭'
  },
  {
    id: '22',
    name: '娃娃菜炒牛肉',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/娃娃菜炒牛肉.png',
    tastes: ['Salty'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i84', amount: 1 },
      { ingredientId: 'i61', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i44', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/67bdd0e8000000000603e16b?source=webshare&xhsshare=pc_web&xsec_token=ABLnIS2WHQsMu5YHEw8OLOuWd7rJwnMswIw9KLOLDSrzk=&xsec_source=pc_share', title: '减脂期吃它！我两周瘦了七斤！' }
    ],
    calories: 320,
    category: '炒菜'
  },
  {
    id: '23',
    name: '香煎鸡胸肉',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/香煎鸡胸肉.png',
    tastes: ['Salty'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i21', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i9', amount: 1 },
      { ingredientId: 'i45', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/667559d3000000001d01b58b?source=webshare&xhsshare=pc_web&xsec_token=ABWZfKHD_agK5AvzGUOKfYF-XKpQX6KBkAkIsI037WMXw=&xsec_source=pc_share', title: '鸡胸肉这样做又嫩又香！百吃不厌！' }
    ],
    calories: 280,
    category: '炒菜'
  },
  {
    id: '24',
    name: '清炒蚝油生菜',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/清炒蚝油生菜.png',
    tastes: ['Light'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i78', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i44', amount: 1 },
      { ingredientId: 'i9', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/67e3b8e4000000001e0031dd?source=webshare&xhsshare=pc_web&xsec_token=AB8f9uoMAnpMYkDGYNSLlVpgshhZAu9ahHOJ05swNdyHE=&xsec_source=pc_share', title: '清淡好吃的家常菜蚝油生菜' }
    ],
    calories: 120,
    category: '炒菜'
  },
  {
    id: '25',
    name: '虾仁豆腐蒸蛋',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/虾仁豆腐蒸蛋.png',
    tastes: ['Light'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i85', amount: 1 },
      { ingredientId: 'i27', amount: 1 },
      { ingredientId: 'i5', amount: 2 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i89', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/6371f221000000002203a5b4?source=webshare&xhsshare=pc_web&xsec_token=AByEXpaRCdET6YsX7U6GotfHehgsU5hb9kh7hayBF7OfQ=&xsec_source=pc_share', title: '花儿家的小牡丹' }
    ],
    calories: 220,
    category: '炒菜'
  },
  {
    id: '26',
    name: '黑椒西兰花牛肉',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/黑椒西兰花牛肉.png',
    tastes: ['Salty'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i61', amount: 1 },
      { ingredientId: 'i8', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i45', amount: 1 },
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i44', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/67762570000000000b01683e?source=webshare&xhsshare=pc_web&xsec_token=AB-u6XnN8f1Arex_8FjfyOCXRkRY7YEP5kNuClwEDIZaU=&xsec_source=pc_share', title: '年前瘦个5斤8斤很简单！黑椒西兰花牛肉！' }
    ],
    calories: 350,
    category: '炒菜'
  },
  {
    id: '27',
    name: '虾滑白菜粉丝',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/虾滑白菜粉丝.png',
    tastes: ['Light'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i86', amount: 1 },
      { ingredientId: 'i88', amount: 1 },
      { ingredientId: 'i87', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i35', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/5f65649c0000000001007b7b?source=webshare&xhsshare=pc_web&xsec_token=ABkthWpXhN9jv_1Uq5X0Uv2iMG86VJrtpQDrF6zL3Hrpc=&xsec_source=pc_share', title: '两两世界' }
    ],
    calories: 280,
    category: '炒菜'
  },
  {
    id: '28',
    name: '酸辣鸡胸肉',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/酸辣鸡胸肉.png',
    tastes: ['Spicy', 'Sour'],
    tags: ['炒菜'],
    ingredients: [
      { ingredientId: 'i21', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i25', amount: 1 },
      { ingredientId: 'i55', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/66bf6ecc0000000009016f63?source=webshare&xhsshare=pc_web&xsec_token=ABtXwYYDyxy3JPheF2VF7vq3Zu2NuboR2iFuhTBLD6Bjo=&xsec_source=pc_share', title: '讲真…这个真的巨掉秤又好吃！！😭' }
    ],
    calories: 260,
    category: '炒菜'
  },
  {
    id: '29',
    name: '口蘑鸡胸肉滑蛋饭',
    image: 'https://raw.githubusercontent.com/Jun-moon-1996/MENU/main/口蘑鸡胸肉滑蛋饭.png',
    tastes: ['Light', 'Salty'],
    tags: ['米饭'],
    ingredients: [
      { ingredientId: 'i21', amount: 1 },
      { ingredientId: 'i90', amount: 1 },
      { ingredientId: 'i5', amount: 2 },
      { ingredientId: 'i7', amount: 1 },
    ],
    seasonings: [
      { ingredientId: 'i13', amount: 1 },
      { ingredientId: 'i44', amount: 1 },
      { ingredientId: 'i45', amount: 1 },
      { ingredientId: 'i17', amount: 1 },
      { ingredientId: 'i67', amount: 1 },
    ],
    tutorials: [
      { type: 'video', platform: '小红书', url: 'https://www.xiaohongshu.com/discovery/item/66f9130f000000001902e044?source=webshare&xhsshare=pc_web&xsec_token=ABsG5UELPQTEih9YXK7gQMRMl-Vlns0GghkcWar5CuSQw=&xsec_source=pc_share', title: '口蘑鸡胸肉滑蛋饭 做法简单 低卡美味又掉秤' }
    ],
    calories: 420,
    category: '米饭'
  }
];
