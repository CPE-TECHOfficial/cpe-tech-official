// src/data.js

export const CONTACT_INFO = {
  rawPhone: "964770281922",
  phoneDisplay: "0770 281 9222",
  email: "support@cpe-tech.com",
  address: "العراق - واسط - الكوت - شارع المحافظة",
};

export const INITIAL_SETTINGS = {
  heroImage:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=max&w=1920&q=80",
  showTicker: true,
  tickerText:
    "🔥 عروض خاصة: خصم 20% على باقات الحماية المتكاملة! • 🟢 المركز مفتوح الآن لاستقبال طلباتكم.",
};

export const INITIAL_WORKS = [
  {
    id: 1,
    title: "iPhone 13 Pro Max",
    description: "تم تغيير الزجاج الخلفي بالليزر (Laser Machine) ليعود وكالة.",
    imageUrl:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?fit=max&w=1080&q=80",
  },
  {
    id: 2,
    title: "iPad Pro 12.9",
    description: "إصلاح عطل الشحن (IC U2) وتشغيل الجهاز بنجاح.",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?fit=max&w=1080&q=80",
  },
  {
    id: 3,
    title: "Samsung S23 Ultra",
    description: "تخطي حساب جوجل (FRP) أندرويد 14 حماية شهر 2.",
    imageUrl:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?fit=max&w=1080&q=80",
  },
];

export const INITIAL_STORE_ITEMS = [
  {
    id: 1,
    name: "شاحن Anker 20W الأصلي",
    category: "شواحن",
    price: 25000,
    badge: "أصلي",
    location: "الكوت - المركز",
    image: "https://images.unsplash.com/photo-1620023490075-d4c38258e2d4?w=500&q=80",
  },
  {
    id: 2,
    name: "سماعة AirPods Pro Copy",
    category: "سماعات",
    price: 35000,
    badge: "الأكثر طلباً",
    location: "بغداد - الكرادة",
    image: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?w=500&q=80",
  },
  {
    id: 3,
    name: "كابل آيفون قماشي",
    category: "شواحن",
    price: 15000,
    badge: "ضمان سنة",
    location: "الكوت - الهورة",
    image: "https://images.unsplash.com/photo-1585856407008-011400477209?w=500&q=80",
  },
];

export const INITIAL_DOWNLOADS = [
  { id: 1, name: "Samsung USB Drivers v1.7", size: "35 MB", type: "Driver", url: "#" },
  { id: 2, name: "UnlockTool Setup 2025", size: "120 MB", type: "Tool", url: "#" },
  { id: 3, name: "3uTools Latest", size: "110 MB", type: "Tool", url: "#" },
];

export const SERVICE_PRICES = [
  {
    category: "سوفت وير موبايل",
    items: [
      { name: "تخطي حساب جوجل (FRP)", price: "من 10,000 د.ع" },
      { name: "تفليش كامل", price: "15,000 د.ع" },
    ],
  },
  {
    category: "صيانة حاسوب",
    items: [
      { name: "فورمات + برامج", price: "10,000 د.ع" },
      { name: "تنظيف كامل", price: "15,000 د.ع" },
    ],
  },
];