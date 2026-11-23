# RE: MATERIALS｜重返未來：1999 非官方素材索引

以復古檔案館為概念的靜態素材查詢網站，提供繁體中文、簡體中文與英文搜尋，以及素材 ICON、合成配方、已知掉落關卡與四類取得建議。

## 使用方式

- 搜尋素材名稱、配方材料或關卡編號，支援三種語言交叉搜尋。
- 用刷取／合成／銀行兌換／秘物匣子篩選素材；同一物品可有多種建議。
- 點選配方中的材料直接跳轉；右側詳細資訊及搜尋欄可跟隨頁面捲動。
- 手機版採單欄排版，支援介面與搜尋功能。

## 資料與來源

- 簡體中文名稱：原始參考灰機 Wiki 物品列表。
- 英文參考名稱：Gnomon 英文素材資料、GameVika 英文道具資料。
- 取得建議與掉落關卡：參考[Bilibili](https://www.bilibili.com/video/BV1AERFBCEKQ/?share_source=copy_web&vd_source=4ec628f0c5ddb1a3e1d96440acbfe7ba)。

參考連結：

- [灰機 Wiki 物品列表](https://res1999.huijiwiki.com/wiki/物品列表)
- [GameVika（繁體中文）](https://gamevika.com/zh-tw/reverse1999/items)
- [GameVika（英文）](https://gamevika.com/en/reverse1999/items)
- [Gnomon](https://reverse1999-gnomon.pages.dev/materials)

此網站為非官方工具，不代表遊戲開發者或發行商立場；遊戲中的名稱及素材圖片權利屬各自權利人。第三方的整理資料不代表已全部獨立對照遊戲客戶端。

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

- **2026/11/26**：更新資訊
