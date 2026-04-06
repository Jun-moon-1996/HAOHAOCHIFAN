const fs = require('fs');

const data = fs.readFileSync('src/data.ts', 'utf8');

// 1. Extract INGREDIENTS array
const ingredientsMatch = data.match(/export const INGREDIENTS: Ingredient\[\] = \[([\s\S]*?)\];/);
if (!ingredientsMatch) {
  console.error('Could not find INGREDIENTS array');
  process.exit(1);
}

const ingredientsStr = ingredientsMatch[1];
const ingredientLines = ingredientsStr.split('\n').filter(line => line.trim().startsWith('{'));

// 2. Parse ingredients and find duplicates
const uniqueIngredients = new Map();
const idMapping = {}; // oldId -> newId

ingredientLines.forEach(line => {
  const idMatch = line.match(/id: '([^']+)'/);
  const nameMatch = line.match(/name: '([^']+)'/);
  
  if (idMatch && nameMatch) {
    const id = idMatch[1];
    const name = nameMatch[1];
    
    if (!uniqueIngredients.has(name)) {
      uniqueIngredients.set(name, { id, line });
      idMapping[id] = id;
    } else {
      // Duplicate found, map old id to the kept id
      idMapping[id] = uniqueIngredients.get(name).id;
    }
  }
});

// 3. Rebuild INGREDIENTS array
const newIngredientsLines = Array.from(uniqueIngredients.values()).map(item => item.line);
const newIngredientsStr = newIngredientsLines.join('\n');

let updatedData = data.replace(
  /export const INGREDIENTS: Ingredient\[\] = \[([\s\S]*?)\];/,
  `export const INGREDIENTS: Ingredient[] = [\n${newIngredientsStr}\n];`
);

// 4. Update DISHES array with new IDs
for (const [oldId, newId] of Object.entries(idMapping)) {
  if (oldId !== newId) {
    const regex = new RegExp(`ingredientId: '${oldId}'`, 'g');
    updatedData = updatedData.replace(regex, `ingredientId: '${newId}'`);
  }
}

fs.writeFileSync('src/data.ts', updatedData);
console.log('Duplicates removed and references updated.');
