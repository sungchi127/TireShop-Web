# 輪胎館 - 線上訂購與管理系統

這是一個專為輪胎館設計的線上輪胎訂購與後台管理系統。前端使用 Next.js (React) 建立，提供使用者友好的介面；後端則由 Node.js (Express.js) 和 MongoDB 構成，負責處理業務邏輯與資料儲存。  
連結:https://tire-shop-web.vercel.app/  
(因無時間維護，因此只有前端功能)

## 主要功能

### 前端 (使用者介面)
- **首頁**: 網站入口，展示品牌形象。
- **輪胎尋找頁面 (Find Tires)**: (初步結構，待完善搜尋邏輯)
- **輪胎訂購表單 (Tire Order)**: 
    - 顧客可以填寫個人資料、車輛資訊、欲訂購的輪胎品牌/系列/規格、數量。
    - 可選擇是否需要安裝服務，若需要則可選擇期望的預約日期與時段。
    - 表單提交後，訂單資料會傳送至後端。
- **輪胎系列展示 (Tire Series)**: 展示不同系列的輪胎產品及其特色。
- **輪胎知識 (Tire Knowledge)**: 提供輪胎相關的知識文章。
- **維修價目表 (Repair Services)**: 展示店內維修服務項目與價格。
- **關於我們 (About Us)**: 介紹店家資訊、聯絡方式與地圖位置。
- **管理員登入頁面 (`/admin/login`)**: 供管理員登入後台系統。
- **頁腳訪客計數**: 顯示本日、本月及總訪客數量。

### 後端 (伺服器端)
- **訪客計數 API (`/api/visits`, `/api/visits/count`)**:
    - `POST /api/visits`: 記錄新的網站訪問，並更新總訪客數、本日訪客數、本月訪客數。
    - `GET /api/visits/count`: 獲取目前的總訪客數、本日訪客數、本月訪客數。
- **訂單處理 API (`/api/orders`)**:
    - `POST /api/orders`: 接收並儲存來自前端的輪胎訂購請求。
    - `GET /api/orders`: (受保護路由) 獲取所有訂單列表，按提交時間倒序排列。
    - `PATCH /api/orders/:id`: (受保護路由) 更新特定訂單的狀態 (例如：pending, confirmed, completed 等)。
- **管理員認證 API (`/api/auth`)**:
    - `POST /api/auth/login`: 處理管理員登入請求。驗證成功後，回傳 JWT 並將其設定為 HttpOnly Cookie。
- **資料模型 (Mongoose Schemas)**:
    - `VisitCounter`: 儲存訪客計數相關數據。
    - `Order`: 儲存訂單詳細資料。
    - `Admin`: 儲存管理員帳號資訊 (用戶名、哈希加密後的密碼)。
- **認證中介軟體 (`protect`)**: 保護特定 API 路由，確保只有已登入的管理員才能存取。

## 專案結構

```
bridgestone-tire-shop/
├── frontend/         # Next.js 前端應用程式
│   ├── components/   # React 元件 (Navbar, Layout 等)
│   ├── pages/        # Next.js 頁面
│   │   ├── admin/    # 管理員相關頁面 (login, orders)
│   │   └── ...       # 其他使用者頁面
│   ├── public/       # 靜態資源 (圖片等)
│   ├── styles/       # CSS 模組和全域樣式
│   ├── .env.local    # (建議) 前端環境變數
│   └── package.json
├── backend/          # Node.js/Express.js 後端應用程式
│   ├── models/       # Mongoose 資料模型 (Order, Admin, VisitCounter)
│   ├── .env          # 後端環境變數 (必須)
│   └── server.js     # Express 伺服器主檔案
│   └── package.json
└── README.md         # 本檔案
└── package.json      # 根目錄 package.json (用於 concurrently)
```

## 技術棧

- **前端**:
    - Next.js (React 框架)
    - JavaScript
    - CSS Modules
- **後端**:
    - Node.js
    - Express.js
    - MongoDB (使用 Mongoose ODM)
    - JSON Web Tokens (JWT) 用於認證
    - bcrypt.js 用於密碼哈希
    - cookie-parser 用於處理 Cookie
    - cors 用於處理跨域請求
    - dotenv 用於環境變數管理
- **開發工具**:
    - concurrently (用於同時運行前後端開發伺服器)
    - Git & GitHub (版本控制)






