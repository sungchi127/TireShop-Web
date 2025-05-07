const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// 中介軟體 (Middleware)
app.use(express.json()); // 用於解析 JSON 格式的請求主體
app.use(express.urlencoded({ extended: true })); // 用於解析 URL 編碼的請求主體

// 基本路由
app.get('/', (req, res) => {
  res.send('廣翊輪胎行 後端 API');
});

// TODO: 在這裡加入您的 API 路由

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`後端伺服器正在監聽 port ${PORT}`);
}); 