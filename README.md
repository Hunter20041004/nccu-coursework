# microbit-anti-theft-radio

雙向 micro:bit 防盜警報器，符合以下作業要求：

- 使用 micro:bit 內建加速度感測器
- 使用鱷魚夾觸發 P0 / GND
- 使用 Radio 廣播讓兩台 micro:bit 雙向溝通

## 兩台 micro:bit 的角色

兩台板子都使用同一份程式。

- 開機後顯示 `?`
- 按 **A**：設定成防盜端 A
- 按 **B**：設定成控制端 B

## 互動流程

1. 搖動 A
2. A 偵測到 Shake，顯示警報圖示
3. A 透過 Radio 傳送 `ALERT`
4. B 收到後顯示警告
5. B 的 P0 與 GND 各接一條鱷魚夾
6. 讓兩條鱷魚夾金屬端碰在一起
7. B 傳送 `STOP`
8. A 收到後停止警報並顯示勾勾
9. A 回傳 `OK`
10. B 收到後也顯示勾勾

Radio group 固定為 **23**，兩台板子會使用相同頻道。

## 鱷魚夾接法

控制端 B：

```
P0  ───── 鱷魚夾 1 ─────●

GND ───── 鱷魚夾 2 ─────●
```

平常兩端分開，需要解除警報時讓兩端金屬部分互相碰觸。

## 在另一台電腦使用

1. 打開本 GitHub repository。
2. 前往 https://makecode.microbit.org/
3. 選擇 **Import / 匯入**。
4. 選擇 **Import URL / 匯入網址**。
5. 貼上：
   `https://github.com/Hunter20041004/microbit-anti-theft-radio`
6. 開啟專案後，以 USB 連接第一台 micro:bit。
7. 按 **Download / 下載**。
8. 若瀏覽器支援 WebUSB，可直接 Pair / Connect 後下載；否則把下載好的 `.hex` 檔拖到 `MICROBIT` 磁碟。
9. 第一台開機後按 **A**。
10. 第二台也下載同一份程式，開機後按 **B**。
11. 在 B 的 P0 與 GND 接上兩條鱷魚夾。
12. 搖 A，確認 B 收到警報。
13. 讓 B 的兩條鱷魚夾碰在一起，確認 A、B 都出現勾勾。

## 作業文字說明範例

本組設計「雙向防盜警報器」。第一個 micro:bit 作為防盜端，利用內建加速度感測器偵測物品是否被移動；當偵測到搖晃時，會顯示警告圖示並透過 Radio 傳送 ALERT 給第二個 micro:bit。第二個 micro:bit 作為控制端，收到警報後顯示警告。控制端的 P0 與 GND 各接一條鱷魚夾，讓兩條鱷魚夾碰觸時會觸發 STOP 訊息回傳第一台。第一台收到 STOP 後停止警報並回傳 OK，第二台收到 OK 後也顯示完成圖示，以此完成雙向溝通。
