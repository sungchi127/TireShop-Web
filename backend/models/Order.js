const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '姓名為必填欄位']
  },
  phone: {
    type: String,
    required: [true, '聯絡電話為必填欄位']
  },
  email: {
    type: String,
    // 郵件不是必填，但如果是，可以加上 validate
  },
  tireBrandSeries: {
    type: String,
    // 根據表單，這不是必填
  },
  tireSpecs: {
    type: String,
    // 根據表單，這不是必填
  },
  quantity: {
    type: Number,
    required: [true, '數量為必填欄位'],
    min: [1, '數量至少為1']
  },
  carMake: {
    type: String,
    required: [true, '車輛廠牌為必填欄位']
  },
  carModel: {
    type: String,
    required: [true, '車輛型號為必填欄位']
  },
  carYear: {
    type: String, // 或者 Number，但通常年份用 String 處理較有彈性
    // 根據表單，這是選填
  },
  needsInstallation: {
    type: String, // 'yes' or 'no'
    default: 'no'
  },
  appointmentDate: {
    type: Date,
    // 只有在 needsInstallation 為 'yes' 時才相關
  },
  appointmentTime: {
    type: String,
    // 只有在 needsInstallation 為 'yes' 時才相關
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true // 自動加入 createdAt 和 updatedAt
});

module.exports = mongoose.model('Order', OrderSchema); 