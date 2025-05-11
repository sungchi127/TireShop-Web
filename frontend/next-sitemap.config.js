/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.kuang-i.com', // 您的網站主要網址
  generateRobotsTxt: true, // (可選) 生成 robots.txt
  // 可選：排除特定頁面 (例如管理員頁面)
  exclude: ['/admin/*', '/admin/login'], 
  // 可選：如果您有其他不想包含的路徑，可以在此處添加
  // 例如，如果 tire-order 頁面不再使用，也可以排除：
  // exclude: ['/admin/*', '/admin/login', '/tire-order'], 
  
  // 如果您有動態頁面，可能需要額外的設定來生成它們的路徑
  // 例如：如果您有 /products/[id].js 這樣的頁面
  // transform: async (config, path) => {
  //   // path 是相對於 siteUrl 的路徑，例如 /products/123
  //   // 您可以在這裡設定每個路徑的優先級 (priority)、變更頻率 (changefreq) 等
  //   return {
  //     loc: path, // 頁面路徑
  //     changefreq: 'daily',
  //     priority: 0.7,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //   };
  // },
};
