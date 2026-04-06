const fs = require('fs');

const data = fs.readFileSync('src/data.ts', 'utf8');

const categories = {
  '蔬菜豆制品': ['豆腐', '番茄', '西兰花', '土豆', '青椒', '茄子', '黄瓜', '嫩豆腐', '胡萝卜', '青豆', '洋葱', '玉米粒', '青菜', '生菜'],
  '肉蛋水产': ['猪肉末', '鸡蛋', '鸡胸肉', '鸡腿肉', '火腿', '鸡肉', '牛肉', '培根', '牛肉片', '腊肠', '金枪鱼'],
  '主食面点': ['大米', '鲜面条', '红薯粉', '拉面', '面条', '猪肉白菜饺子', '猪肉韭菜饺子', '牛肉洋葱饺子', '鸡肉玉米饺子', '三鲜饺子', '吐司面包'],
  '调味品': ['豆瓣酱', '小葱', '大蒜', '生抽', '老抽', '白糖', '米醋', '盐', '玉米淀粉', '白醋', '干辣椒', '香醋', '花椒粉', '辣椒粉', '白胡椒粉', '咖喱块', '蚝油', '黑胡椒', '番茄酱', '辣椒油', '芝麻酱', '牛肉汤料', '食用油', '蛋黄酱', '黑胡椒酱'],
  '其他': ['花生米', '花生碎', '马苏里拉芝士', '榨菜', '芝士片', '牛油果']
};

function getCategory(name) {
  for (const [cat, items] of Object.entries(categories)) {
    if (items.includes(name)) return cat;
  }
  return '其他';
}

const updatedData = data.replace(/{ id: 'i\d+', name: '([^']+)',[^}]+}/g, (match, name) => {
  const cat = getCategory(name);
  return match.replace(" }", `, category: '${cat}' }`);
});

fs.writeFileSync('src/data.ts', updatedData);
console.log('Done');
