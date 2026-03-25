# React Coffee Shop - 咖啡商城管理系統 (react-week7)

> ☕ 此專案為求職作品展示，展現 React 開發技能與全端 API 整合能力。專案資料夾為 `react-week7`。

## 🚀 專案簡介

這是一個基於 React + Vite 開發的咖啡商城管理系統，包含完整的前台購物功能與後台管理介面。前台提供產品瀏覽、購物車、結帳流程；後台提供產品管理、訂單管理等功能。專案採用現代化的前端開發技術棧，展現了 React Router、Redux Toolkit 狀態管理、API 整合、組件化開發、響應式設計等技能。

## 🛠 技術棧

### 核心技術

- **React 19.2.0** - 前端框架
- **Vite 7.2.4** - 建構工具與開發伺服器
- **React Router DOM 7.13.0** - 路由管理
- **Redux Toolkit 2.11.2** - 狀態管理
- **Axios 1.13.2** - HTTP 請求庫
- **React Hook Form 7.71.1** - 表單驗證
- **Bootstrap 5.3.8** - UI 框架
- **Sass 1.97.2** - CSS 預處理器

### 開發工具

- **ESLint** - 程式碼檢查
- **Bootstrap Icons** - 圖標庫
- **gh-pages** - GitHub Pages 部署工具

## 📁 專案結構

```
react-week7/
├── public/
├── src/
│   ├── App.jsx              # 應用程式主組件
│   ├── main.jsx             # 應用程式入口
│   ├── router.jsx           # 路由配置
│   ├── assets/
│   │   └── scss/           # 樣式檔案
│   │       ├── AdminProductTable.scss
│   │       ├── Checkout.scss
│   │       ├── Home.scss
│   │       ├── SingleProductModal.scss
│   │       └── all.scss
│   ├── components/         # 共用組件
│   │   ├── MessageToast.jsx       # 訊息提示組件
│   │   ├── Pagination.jsx         # 分頁組件
│   │   ├── ProductModal.jsx       # 產品編輯 Modal
│   │   └── SingleProductModal.jsx # 產品詳情 Modal
│   ├── layout/             # 版型組件
│   │   ├── AdminLayout.jsx        # 後台版型
│   │   └── FrontendLayout.jsx     # 前台版型
│   ├── slice/              # Redux Slice
│   │   └── messageSlice.js        # 訊息狀態管理
│   ├── stroe/              # Redux Store
│   │   └── stroe.js
│   └── views/              # 頁面組件
│       ├── Login.jsx              # 登入頁
│       ├── admin/                 # 後台頁面
│       │   ├── AdminProductTable.jsx  # 產品管理
│       │   └── AdminOrders.jsx        # 訂單管理
│       └── front/                 # 前台頁面
│           ├── Home.jsx           # 首頁
│           ├── Products.jsx       # 產品列表
│           ├── SingleProduct.jsx  # 產品詳情
│           ├── Cart.jsx           # 購物車
│           ├── Checkout.jsx       # 結帳頁
│           └── NotFound.jsx       # 404 頁面
├── index.html
├── package.json
├── vite.config.js          # Vite 配置
└── eslint.config.js        # ESLint 配置
```

## 🌟 主要功能

### 前台功能 (客戶端)

- 🏠 **首頁** - 品牌形象展示
- 📦 **產品列表** - 瀏覽所有咖啡產品，支援分頁
- 🔍 **產品詳情** - 查看產品詳細資訊
- 🛒 **購物車** - 加入/移除商品、調整數量
- 💳 **結帳流程** - 使用 React Hook Form 進行表單驗證

### 後台功能 (管理員)

- 🔐 **身份驗證** - 使用 Cookie 進行 Token 管理
- 📊 **產品管理**
  - 新增/編輯/刪除產品
  - 產品圖片上傳
  - 多圖片管理
  - 庫存管理
  - 啟用/停用產品
  - 分頁瀏覽
- 📋 **訂單管理** - 查看和管理客戶訂單

### 技術特色

- 📱 響應式設計，支援各種裝置
- 🔄 Redux Toolkit 進行全域狀態管理
- 💬 Toast 訊息提示系統（自動消失）
- 🎯 React Hook Form 表單驗證
- 🔒 路由守衛與權限控管
- ⚡ 高效能的 Vite 建構工具
- 🎨 使用 Sass 模組化樣式管理
- 🚀 支援 GitHub Pages 部署

## 🚀 開發流程記錄

### 1. 專案初始化

```bash
# 建立 Vite React 專案 (本專案名稱：react-week7)
npm create vite@latest react-week7 -- --template react
cd react-week7
npm install
```

### 2. 依賴套件安裝

```bash
# 安裝核心套件
npm install react-router-dom @reduxjs/toolkit react-redux
npm install axios bootstrap bootstrap-icons
npm install react-hook-form js-cookie
npm install react-loader-spinner react-spinners

# 安裝開發套件
npm install -D sass gh-pages
```

### 3. 環境變數設定

在專案根目錄建立 `.env` 檔案：

```env
VITE_API_BASE=你的API基礎路徑
VITE_API_PATH=你的API路徑
```

### 4. 開發階段

```bash
# 啟動開發伺服器
npm run dev

# 程式碼檢查
npm run lint
```

### 5. 部署至 GitHub Pages

```bash
# 建構並部署
npm run deploy
```

## 📦 專案指令

| 指令              | 說明                                   |
| ----------------- | -------------------------------------- |
| `npm run dev`     | 啟動開發伺服器 (http://localhost:5173) |
| `npm run build`   | 建構生產版本                           |
| `npm run preview` | 預覽生產版本                           |
| `npm run lint`    | 執行 ESLint 檢查                       |
| `npm run deploy`  | 建構並部署至 GitHub Pages              |

## 🔧 環境需求

- Node.js 16+
- npm 或 yarn

## 🎯 學習重點

本專案展現了以下 React 開發技能：

1. **React Router** - 多層級路由、巢狀路由、路由守衛
2. **Redux Toolkit** - 全域狀態管理、Slice、Async Thunk
3. **API 整合** - Axios 請求攔截、錯誤處理、Token 管理
4. **表單處理** - React Hook Form 驗證、檔案上傳
5. **組件設計** - 共用組件、Layout 組件、Props 傳遞
6. **Bootstrap Modal** - 程式化控制 Modal 顯示/隱藏
7. **Sass** - 模組化樣式、變數管理
8. **部署** - GitHub Pages 自動化部署

## 📝 開發注意事項

### 狀態管理

- 使用 Redux Toolkit 管理全域狀態（訊息提示）
- 使用 useState 管理本地組件狀態
- 使用 useRef 管理 Bootstrap Modal 實例

### API 串接

- 使用 Axios 進行 HTTP 請求
- Token 儲存於 Cookie 中
- 請求前檢查 Token 有效性
- 統一錯誤處理與訊息顯示

### 路由設計

- 前台路由：`/`、`/product`、`/cart`、`/checkout`
- 後台路由：`/admin/admin-products`、`/admin/admin-orders`
- 使用 HashRouter 以支援 GitHub Pages

### 樣式管理

- 使用 Sass 預處理器
- Bootstrap 5 作為 UI 框架基礎
- 組件級別的 SCSS 檔案

## 🐛 已知問題與解決

### Modal 狀態殘留問題

**問題**：編輯產品時，若新產品某些欄位為空，會顯示上一次編輯的資料。

**原因**：`openModal` 函數使用函數式更新時，參數名與常量名稱衝突，導致合併了舊狀態。

**解決方案**：直接設置狀態，確保每次都從初始模板開始：

```jsx
const openModal = (type, product) => {
  setModalType(type);
  setTemplateProduct({
    ...INITAL_TEMPLATE_DATA,
    ...product,
  });
  productModalRef.current.show();
};
```

## 📚 參考資源

- [React 官方文件](https://react.dev/)
- [Vite 官方文件](https://vitejs.dev/)
- [Redux Toolkit 官方文件](https://redux-toolkit.js.org/)
- [React Router 官方文件](https://reactrouter.com/)
- [Bootstrap 5 官方文件](https://getbootstrap.com/)

## 👨‍💻 作者

此專案為個人學習與求職作品展示。

## 📄 授權

此專案僅供學習與展示使用。
