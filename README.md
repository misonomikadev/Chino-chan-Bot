## 1. Những thứ cần có:
- 1 tài khoản [Facebook](https://www.facebook.com/) để làm bot. Nếu bạn chỉ muốn để test thì dùng [Facebook Whitehat Account](https://www.facebook.com/whitehat/accounts/) để tránh bị ban account nhé.
- Nếu bạn chưa tải Node.JS thì bạn có thể tải nó [ở đây](https://www.nodejs.org/).
## 2. Cách tạo:

- Clone source code hoặc tải về từ GitHub:
```sh
git clone https://github.com/Tungchaphet/Chino-chan-Bot.git
cd Chino-chan-Bot
```
- Tải các thư viện npm cần thiết:
```
npm i
```
- Đặt token OpenAI của bạn vào file **config.js**. Bạn có thể vào [đây](https://platform.openai.com/account/api-keys) để tạo API Key nhé.
```js
// ./config/config.js
const config = {
    prefix: '/', // Bạn có thể thay prefix ở đây nhé.
    openaikey: '', // Đưa token OpenAI của bạn vô đây
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    ratelimit: new Map(),
    commands: new Map(),
    aliases: new Map()
}

module.exports = config
```
- Copy và paste json cookies tài khoản của bạn vô file **fbstate.json** nằm trong folder **config**. Lấy cookies tài khoản bằng cách sử dụng chrome extension [c3c-fbstate](https://github.com/c3cbot/c3c-fbstate).

- Chạy bot:
```
npm start
```

Và khi terminal của bạn xuất hiện ***username* đã online.** thì bạn đã thành công rồi đấy, chúc bạn may mắn :3

## 3. Những lệnh của bot:
- Prefix mặc định của bot là: **/**. Bạn có thể thay prefix bạn muốn trong **config.js**.
- **/ask [message]**: Để nói chuyện với bot (ChatGPT). Ví dụ: */ask ChatGPT là cái gì?*
- **/roll [number]**: Ra số ngẫu nhiên với số tối đa là *[number]*. Ví dụ: */roll 300*
- **/ping**: Kiểm tra độ trễ của bot. Độ trễ có thể sai do đồng hồ máy bạn.
- **/uptime**: Xem thời gian chạy của bot.
