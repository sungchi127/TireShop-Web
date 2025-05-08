require('dotenv').config(); // 載入 .env 檔案中的環境變數
const express = require('express');
const mongoose = require('mongoose'); // 引入 mongoose
const cors = require('cors'); // 引入 cors
const VisitCounter = require('./models/VisitCounter'); // 引入 VisitCounter 模型
const Order = require('./models/Order'); // <--- 引入 Order 模型
const Admin = require('./models/Admin'); // <--- 引入 Admin 模型
const jwt = require('jsonwebtoken'); // <--- 引入 jsonwebtoken
const cookieParser = require('cookie-parser'); // <--- 引入 cookie-parser

const app = express();
// 使用 process.env.PORT，如果 .env 中沒有定義，則預設為 3001
const PORT = process.env.PORT || 3001; 
const JWT_SECRET = process.env.JWT_SECRET; // <--- 從 .env 讀取 JWT secret

if (!JWT_SECRET) {
  console.error('錯誤：未在 .env 檔案中找到 JWT_SECRET');
  // process.exit(1); // 在生產環境中建議啟用
}

// --- 資料庫連接 ---
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('錯誤：未在 .env 檔案中找到 MONGODB_URI');
  process.exit(1); // 停止應用程式如果沒有連接字串
}

mongoose.connect(mongoURI)
  .then(() => console.log('成功連接到 MongoDB Atlas'))
  .catch(err => console.error('MongoDB 連接錯誤:', err));

// 監聽資料庫連接事件
mongoose.connection.on('error', err => {
  console.error(`MongoDB 連接後發生錯誤: ${err.message}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 連接已斷開');
});
// --- 資料庫連接結束 ---

// --- 中介軟體 (Middleware) ---
const allowedOrigins = [];
if (process.env.CORS_ORIGIN_CLIENT_URL_PRIMARY) {
  allowedOrigins.push(process.env.CORS_ORIGIN_CLIENT_URL_PRIMARY);
}
if (process.env.CORS_ORIGIN_CLIENT_URL_SECONDARY) {
  allowedOrigins.push(process.env.CORS_ORIGIN_CLIENT_URL_SECONDARY);
}

app.use(cors({
  credentials: true, // 允許跨域請求攜帶 cookie
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求 (例如 Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <--- 使用 cookie-parser
// --- 中介軟體結束 ---

// --- Auth Middleware ---
const protect = async (req, res, next) => {
  let token;

  // 從 cookie 中讀取 token
  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      // 驗證 token
      const decoded = jwt.verify(token, JWT_SECRET);

      // 將管理員資訊附加到請求上 (可選，但方便後續使用)
      // 注意：不要將整個 admin 物件附加，特別是密碼哈希
      const adminUser = await Admin.findById(decoded.id).select('-password'); 
      if (!adminUser) {
         // 如果 token 有效但用戶不存在 (例如已被刪除)
         return res.status(401).json({ message: '未授權，用戶不存在' });
      }
      req.admin = adminUser;
      
      next(); // 驗證通過，繼續下一個中介軟體或路由處理程序
    } catch (error) {
      console.error('Token 驗證失敗:', error.message);
      // 如果 token 無效或過期，清除 cookie (可選)
      // res.cookie('token', '', { httpOnly: true, expires: new Date(0) }); 
      return res.status(401).json({ message: '未授權，無效的 Token' });
    }
  } 

  if (!token) {
    res.status(401).json({ message: '未授權，沒有 Token' });
  }
};

// --- API 路由 --- 

// POST /api/visits - 增加訪問次數
app.post('/api/visits', async (req, res) => {
  try {
    const today = new Date();
    const currentDayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentMonthString = currentDayString.substring(0, 7); // YYYY-MM

    let counter = await VisitCounter.findOne({ identifier: 'global_visit_counter' });

    if (!counter) {
      // 如果計數器不存在，創建一個新的
      counter = new VisitCounter({
        identifier: 'global_visit_counter',
        count: 1,
        currentDayCount: 1,
        lastRecordedDay: currentDayString,
        currentMonthCount: 1,
        lastRecordedMonth: currentMonthString,
      });
    } else {
      // 總計數器增加
      counter.count += 1;

      // 更新本日計數
      if (counter.lastRecordedDay === currentDayString) {
        counter.currentDayCount += 1;
      } else {
        counter.currentDayCount = 1; // 新的一天，重設本日計數
        counter.lastRecordedDay = currentDayString;
      }

      // 更新本月計數
      if (counter.lastRecordedMonth === currentMonthString) {
        counter.currentMonthCount += 1;
      } else {
        counter.currentMonthCount = 1; // 新的月份，重設本月計數
        counter.lastRecordedMonth = currentMonthString;
      }
    }

    const updatedCounter = await counter.save();

    res.status(200).json({ 
      message: 'Visit counted successfully', 
      // 返回所有計數，方便前端直接使用或調試
      totalCount: updatedCounter.count, 
      todayCount: updatedCounter.currentDayCount,
      thisMonthCount: updatedCounter.currentMonthCount
    });
  } catch (error) {
    console.error('處理 /api/visits 請求時出錯:', error);
    res.status(500).json({ message: 'Server error while counting visit' });
  }
});

// (可選) GET /api/visits/count - 獲取當前訪問次數
app.get('/api/visits/count', async (req, res) => {
  try {
    const counter = await VisitCounter.findOne({ identifier: 'global_visit_counter' });

    if (counter) {
      const today = new Date();
      const currentDayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
      const currentMonthString = currentDayString.substring(0, 7); // YYYY-MM

      // 如果記錄的日期不是今天，則本日訪客為0 (因為還沒有今天的訪問記錄)
      const todayCount = counter.lastRecordedDay === currentDayString ? counter.currentDayCount : 0;
      // 如果記錄的月份不是本月，則本月訪客為0
      const thisMonthCount = counter.lastRecordedMonth === currentMonthString ? counter.currentMonthCount : 0;

      res.status(200).json({
        totalCount: counter.count,
        todayCount: todayCount, 
        thisMonthCount: thisMonthCount 
      });
    } else {
      // 如果計數器還沒被建立
      res.status(200).json({ 
        totalCount: 0,
        todayCount: 0,
        thisMonthCount: 0
      }); 
    }
  } catch (error) {
    console.error('處理 /api/visits/count 請求時出錯:', error);
    res.status(500).json({ message: 'Server error while fetching visit count' });
  }
});

// POST /api/orders - 提交新的輪胎訂單
app.post('/api/orders', async (req, res) => {
  try {
    // 從請求主體獲取訂單數據
    const orderData = req.body;

    // 創建新的 Order 文件實例
    const newOrder = new Order(orderData);

    // 保存到資料庫
    const savedOrder = await newOrder.save();

    // 回應成功訊息和保存的訂單數據
    res.status(201).json({
      message: '訂單已成功提交！',
      order: savedOrder
    });

  } catch (error) {
    console.error('處理 /api/orders 請求時出錯:', error);
    // Mongoose 驗證錯誤處理
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: '訂單資料驗證失敗',
        errors: messages 
      });
    }
    // 其他伺服器錯誤
    res.status(500).json({ message: '伺服器處理訂單時發生錯誤' });
  }
});

// GET /api/orders - 獲取所有訂單 (可加上篩選、分頁等)
app.get('/api/orders', protect, async (req, res) => {
  try {
    // 預設按創建時間倒序排列 (最新的在前面)
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('處理 GET /api/orders 請求時出錯:', error);
    res.status(500).json({ message: '獲取訂單時發生伺服器錯誤' });
  }
});

// PATCH /api/orders/:id - 更新特定訂單的狀態
app.patch('/api/orders/:id', protect, async (req, res) => {
  const { id } = req.params; // Get the order ID from the URL parameters
  const { status } = req.body; // Get the new status from the request body

  // 驗證 ID 是否有效 (可選但建議)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: '無效的訂單 ID' });
  }

  // 驗證狀態是否為允許的值 (如果模型中有 enum，這裡可以省略，或者作為額外檢查)
  const allowedStatuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled'];
  if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: '無效的訂單狀態值' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status }, 
      { new: true, runValidators: true } // new: true 返回更新後的文件, runValidators: true 確保更新也觸發模型驗證 (例如 enum)
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: '找不到該訂單' });
    }

    res.status(200).json({
      message: '訂單狀態已更新',
      order: updatedOrder
    });

  } catch (error) {
    console.error(`處理 PATCH /api/orders/${id} 請求時出錯:`, error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: '訂單狀態驗證失敗',
        errors: messages 
      });
    }
    res.status(500).json({ message: '更新訂單狀態時發生伺服器錯誤' });
  }
});

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '請提供用戶名和密碼' });
  }

  try {
    // 查找管理員用戶 (忽略大小寫)
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' }); // Generic message
    }

    // 比較密碼
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' }); // Generic message
    }

    // 密碼匹配，生成 JWT
    const payload = { 
        id: admin._id, 
        username: admin.username 
        // 您可以加入其他需要的 payload 資訊，但避免敏感資訊
    };
    
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // 例如：1天後過期

    // 將 Token 設置到 HttpOnly Cookie 中
    res.cookie('token', token, {
      httpOnly: true, // 防止客戶端 JS 訪問
      secure: process.env.NODE_ENV === 'production', // 在生產環境中只透過 HTTPS 傳輸
      maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
      sameSite: 'none' // 或者 'strict'，根據需求調整
    });

    res.status(200).json({ message: '登入成功', admin: { id: admin._id, username: admin.username } });

  } catch (error) {
    console.error('處理 /api/auth/login 請求時出錯:', error);
    res.status(500).json({ message: '登入時發生伺服器錯誤' });
  }
});

// (稍後會加入 /api/auth/logout 和 /api/auth/check 路由)

// --- API 路由結束 ---

// 基本路由 (可以移到 API 路由之後)
app.get('/', (req, res) => {
  res.send('廣翊輪胎行 後端 API - Base Route');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`後端伺服器正在監聽 port ${PORT}`);
}); 