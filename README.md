# RE: MATERIALS｜重返未來：1999 非官方素材索引

以復古檔案館為概念的靜態素材查詢網站，提供繁體中文、簡體中文與英文搜尋，以及素材 ICON、合成配方、已知掉落關卡與四類取得建議。

**網站可直接部署至 GitHub Pages**，無須安裝 Node.js、伺服器或資料庫。

## 使用方式

直接開啟根目錄的 `index.html` 即可；也可以上傳至靜態網站空間。

- 搜尋素材名稱、配方材料或關卡編號，支援三種語言交叉搜尋。
- 用刷取／合成／銀行兌換／秘物匣子篩選素材；同一物品可有多種建議。
- 點選配方中的材料直接跳轉；右側詳細資訊及搜尋欄可跟隨頁面捲動。
- 右下角可回到頂端；點選頁首「關於網站」可連往作者 GitHub。
- 手機版採單欄排版，支援介面與搜尋功能。

## GitHub Pages 發布步驟

1. 在 GitHub 新增一個公開 repository（例如 `reverse1999-materials`）。
2. 將此 ZIP **解壓縮後的內容**上傳至 repository 根目錄（要讓 `index.html` 位於根目錄，不要多包一層資料夾）。
3. 開啟 repository 的 **Settings → Pages → Build and deployment**，選擇 **Deploy from a branch**。
4. 指定 `main` 分支與 `/ (root)` 資料夾，儲存。
5. 等待 GitHub Pages 部署完成後，網站通常會位於 `https://k2210000.github.io/<repository-name>/`。

此專案所有圖片都使用相對路徑，因此可部署在 repository 子路徑下。根目錄的 `.nojekyll` 避免 GitHub Pages 嘗試 Jekyll 處理。

> **發布狀態：**這份 ZIP 為待上傳的網站程式碼，並未自動建立 GitHub repository、上傳或開啟 Pages。請先檢查公開素材的使用權限及標示方式。

## 資料與來源

- 70 張素材 PNG：由網站整理者提供，位於 `assets/`，物品 ID 與檔名相互對應。
- 簡體中文名稱：網站整理者提供的 `icon.txt`，原始參考灰機 Wiki 物品列表。
- 繁體中文參考名稱：GameVika 的繁體道具資料；「齧咬盒」「木娑典」另經整理者依遊戲內字樣確認。
- 英文參考名稱：Gnomon 英文素材資料、GameVika 英文道具資料。
- 取得建議與掉落關卡：由網站整理者提供。已知掉落地點不等於最佳效率關卡。
- 合成配方：沿用先前整理的 38 組配方。

參考連結：

- [灰機 Wiki 物品列表](https://res1999.huijiwiki.com/wiki/物品列表)
- [GameVika（繁體中文）](https://gamevika.com/zh-tw/reverse1999/items)
- [GameVika（英文）](https://gamevika.com/en/reverse1999/items)
- [Gnomon](https://reverse1999-gnomon.pages.dev/materials)

此網站為非官方粉絲工具，不代表遊戲開發者或發行商立場；遊戲中的名稱及素材圖片權利屬各自權利人。第三方的整理資料不代表已全部獨立對照遊戲客戶端。

## 專案結構

```text
index.html     網站畫面、語言切換與關於網站按鈕
style.css      版面、配色、固定搜尋／詳情與彈出視窗
app.js         搜尋、篩選、合成關聯、彈出視窗與回頂互動
data.js        可供 file:// 模式使用的素材資料
materials.json 可編輯的資料主檔
assets/        70 張原始道具 ICON
favicon.svg    網站小圖示
.nojekyll      GitHub Pages 標記
```

`materials.json` 是資料主檔；若要更新內容，請同步更新 `data.js`，保持本機直接開啟網站時的資料一致。

## 版本紀錄

- **V7**：移除首頁的舊版核對聲明；新增右上角「關於網站」按鈕、可點擊空白處關閉的小視窗及作者的 GitHub 超連結（含 GitHub 圖示）；改善上架用網站標題、favicon、SEO 中繼資料及 Pages 部署說明。
- **V6**：固定左側搜尋欄與右側素材詳細資訊；新增回到頂部；確認「齧咬盒」「木娑典」。
- **V5**：70 張原始 ICON 與三語名稱對照資料。
- **V4**：加入取得方式和掉落關卡。
