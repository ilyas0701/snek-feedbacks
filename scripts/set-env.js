const fs = require('fs');
const dotenv = require('dotenv');

// Загружаем переменные из .env
dotenv.config();

// Формируем содержимое environment.ts
const envConfig = `export const environment = {
  production: false,
  API_KEY: '${process.env.API_KEY}',
  API_TOKEN: '${process.env.API_TOKEN}',
  BOARD_ID: '${process.env.BOARD_ID}',
  LIST_ID: '${process.env.LIST_ID}'
};`;

// Убедимся, что папка environments существует
const envDir = './src/environments';
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Записываем в environment.ts
fs.writeFileSync(`${envDir}/environment.ts`, envConfig, { encoding: 'utf8' });
console.log('✅ Environment file created successfully!');