const mongoose = require('mongoose');

// 定義 Schema
const VisitCounterSchema = new mongoose.Schema({
  // 我們可以用一個固定的識別符來找到唯一的計數文件
  identifier: {
    type: String,
    default: 'global_visit_counter', // 固定的值
    unique: true // 確保這個識別符是唯一的
  },
  count: {
    type: Number,       // 計數欄位，型別為數字
    default: 0          // 預設值為 0
  },
  currentDayCount: { // 本日訪客數
    type: Number,
    default: 0
  },
  lastRecordedDay: { // 記錄的日期，例如 "2023-10-27"
    type: String, 
    default: '' 
  },
  currentMonthCount: { // 本月訪客數
    type: Number,
    default: 0
  },
  lastRecordedMonth: { // 記錄的月份，例如 "2023-10"
    type: String,
    default: ''
  }
}, {
  // Mongoose 選項
  timestamps: true // 自動加入 createdAt 和 updatedAt 時間戳記 (可選)
});

// 建立並匯出 Model
// mongoose.model('模型名稱', Schema) -> 會對應到 MongoDB 中的複數集合名稱 (例如 'visitcounters')
module.exports = mongoose.model('VisitCounter', VisitCounterSchema); 