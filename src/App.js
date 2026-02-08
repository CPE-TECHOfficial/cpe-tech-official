import React, { useState, useEffect, useRef } from "react";
import {
  Wrench,
  Smartphone,
  Laptop,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Send,
  Settings,
  LogIn,
  LogOut,
  Heart,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  ArrowRight,
  LayoutGrid,
  FileText,
  ArrowLeft,
  Unlock,
  Cpu,
  ShieldCheck,
  Bell,
  Youtube,
  Banknote,
  Check,
  AlertTriangle,
  Star,
  Clock,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShoppingBag,
  Download,
  Calculator,
  Activity,
  Map,
  Edit,
  Globe,
  Share2,
  Key,
  Menu,
} from "lucide-react";

// ==========================================
// 1. البيانات والكونفيج (DATA)
// ==========================================

const CONTACT_INFO = {
  rawPhone: "213770281922",
  phoneDisplay: "0770 28 19 22",
  landline: "033 57 00 91",
  email: "support@cpe-tech.dz",
  address: "الجزائر - ولاية بسكرة - دائرة أورلال",
};

const INITIAL_SETTINGS = {
  heroImage:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fit=max&w=1920&q=80",
  showTicker: true,
  tickerText:
    "🔥 مرحبا بكم في CPE TECH فرع بسكرة • 🟢 المركز مفتوح الآن لاستقبال طلبات الصيانة • تخفيضات على أكسسوارات الهواتف",
};

const INITIAL_STORE_ITEMS = [
  {
    id: 1,
    name: "شاحن Anker 20W الأصلي",
    category: "شواحن",
    price: 3500,
    badge: "أصلي",
    location: "بسكرة - المركز",
    image:
      "https://images.unsplash.com/photo-1620023490075-d4c38258e2d4?w=500&q=80",
  },
  {
    id: 2,
    name: "سماعة AirPods Pro Copy",
    category: "سماعات",
    price: 4500,
    badge: "الأكثر طلباً",
    location: "أورلال",
    image:
      "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?w=500&q=80",
  },
  {
    id: 3,
    name: "كابل آيفون قماشي",
    category: "شواحن",
    price: 1200,
    badge: "ضمان سنة",
    location: "بسكرة",
    image:
      "https://images.unsplash.com/photo-1585856407008-011400477209?w=500&q=80",
  },
  {
    id: 4,
    name: "بكج حماية متكامل",
    category: "حماية",
    price: 2000,
    badge: "عرض خاص",
    location: "أورلال",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&q=80",
  },
];

const INITIAL_DOWNLOADS = [
  {
    id: 1,
    name: "Samsung USB Drivers v1.7",
    size: "35 MB",
    type: "Driver",
    url: "#",
  },
  {
    id: 2,
    name: "UnlockTool Setup 2025",
    size: "120 MB",
    type: "Tool",
    url: "#",
  },
  { id: 3, name: "3uTools Latest", size: "110 MB", type: "Tool", url: "#" },
];

const SERVICE_PRICES = [
  {
    category: "سوفت وير موبايل",
    items: [
      { name: "تخطي حساب جوجل (FRP)", price: "من 1500 د.ج" },
      { name: "تفليش كامل", price: "2000 د.ج" },
    ],
  },
  {
    category: "صيانة حاسوب",
    items: [
      { name: "فورمات + برامج", price: "1000 د.ج" },
      { name: "تنظيف كامل", price: "1500 د.ج" },
    ],
  },
];

// ==========================================
// 2. المكونات المساعدة (UI COMPONENTS)
// ==========================================

function useAnalytics() {
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem("cpe-likes");
    if (saved) setLikes(parseInt(saved));
  }, []);
  const toggleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem("cpe-likes", newLikes.toString());
  };
  return { likes, toggleLike };
}

function ImageWithFallback({ src, className, ...rest }) {
  const [err, setErr] = useState(false);
  return err ? (
    <div
      className={`bg-slate-800 flex items-center justify-center ${className}`}
    >
      <ImageIcon className="text-slate-600" />
    </div>
  ) : (
    <img
      src={src}
      onError={() => setErr(true)}
      className={className}
      {...rest}
      alt=""
    />
  );
}

function NewsTicker({ text, show }) {
  if (!show) return null;
  return (
    <div className="bg-gradient-to-r from-red-900 to-slate-900 text-white overflow-hidden py-2 relative z-50 border-b border-white/10">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="mx-4 font-bold flex items-center gap-2">
          <Bell size={14} className="animate-pulse text-red-400" /> {text}
        </span>
        <span className="mx-4 font-bold flex items-center gap-2">
          <Bell size={14} className="animate-pulse text-red-400" /> {text}
        </span>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } } .animate-marquee { animation: marquee 20s linear infinite; display: flex; width: max-content; }`}</style>
    </div>
  );
}

function BrandsMarquee() {
  const brands = [
    "SAMSUNG",
    "APPLE",
    "XIAOMI",
    "HUAWEI",
    "HONOR",
    "INFINIX",
    "REALME",
    "NOKIA",
  ];
  return (
    <div className="py-6 bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-16 items-center opacity-50 hover:opacity-100 transition-opacity duration-300">
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 font-mono tracking-widest"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`https://t.me/+${CONTACT_INFO.rawPhone}`}
        target="_blank"
        rel="noreferrer"
        className="bg-[#0088cc] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Send size={24} />
      </a>
      <a
        href={`https://wa.me/${CONTACT_INFO.rawPhone}`}
        target="_blank"
        rel="noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}

function SalesPopup() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const messages = [
      "تم طلب شاشة iPhone 13",
      "تم إصلاح لابتوب Dell",
      "محمد اشترى شاحن Anker",
    ];
    const interval = setInterval(() => {
      setMsg(messages[Math.floor(Math.random() * messages.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-20 left-4 bg-slate-800 border border-cyan-500/30 p-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-left flex items-center gap-3">
      <div className="bg-green-500/20 p-2 rounded-full">
        <Check size={16} className="text-green-400" />
      </div>
      <div>
        <p className="text-white text-sm font-bold">نشاط حديث</p>
        <p className="text-slate-300 text-xs">{msg}</p>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pos)));
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 group select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img
        src="https://images.unsplash.com/photo-1596558450255-7c0b8b9d5646?w=800&q=80"
        className="absolute inset-0 w-full h-full object-cover"
        alt="After"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
        <span className="bg-green-600/80 text-white px-3 py-1 rounded font-bold text-sm">
          بعد الصيانة
        </span>
      </div>
      <div
        className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src="https://images.unsplash.com/photo-1604144365730-10906232b724?w=800&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Before"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
          <span className="bg-red-600/80 text-white px-3 py-1 rounded font-bold text-sm">
            قبل (مكسور)
          </span>
        </div>
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none"
        style={{ left: `calc(${sliderPos}% - 16px)` }}
      >
        <div className="flex gap-0.5">
          <div className="w-0.5 h-3 bg-slate-400"></div>
          <div className="w-0.5 h-3 bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}

// 🟢 تم تحديث الخريطة هنا
function LocationMap() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 mt-6 grayscale hover:grayscale-0 transition-all">
      <iframe
        width="100%"
        height="100%"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=Ourlal%2C%20Biskra%2C%20Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        title="Map"
      ></iframe>
    </div>
  );
}

function CostEstimator() {
  const [device, setDevice] = useState("iphone");
  const [issue, setIssue] = useState("screen");
  const getPrice = () => {
    if (device === "iphone" && issue === "screen") return "15,000 - 30,000 د.ج";
    if (device === "iphone" && issue === "battery") return "5,000 - 10,000 د.ج";
    if (device === "android" && issue === "screen") return "8,000 - 20,000 د.ج";
    if (issue === "software") return "1,500 - 4,000 د.ج";
    return "يرجى الفحص";
  };
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 mt-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Calculator className="text-yellow-400" /> حاسبة التكلفة التقديرية
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          onChange={(e) => setDevice(e.target.value)}
          className="bg-slate-900 text-white p-3 rounded-lg border border-white/10"
        >
          <option value="iphone">آيفون (iPhone)</option>
          <option value="android">أندرويد (Samsung/Huawei)</option>
        </select>
        <select
          onChange={(e) => setIssue(e.target.value)}
          className="bg-slate-900 text-white p-3 rounded-lg border border-white/10"
        >
          <option value="screen">كسر شاشة</option>
          <option value="battery">ضعف بطارية</option>
          <option value="software">سوفت وير</option>
        </select>
        <div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-lg flex items-center justify-center">
          <span className="text-blue-300 font-bold">{getPrice()}</span>
        </div>
      </div>
    </div>
  );
}

function QuickAccessGrid({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigate("store")}
          className="h-40 rounded-2xl relative overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Store"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="text-purple-400" /> المتجر
            </h3>
          </div>
        </div>
        <div
          onClick={() => onNavigate("tracking")}
          className="h-40 rounded-2xl relative overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Tracking"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-400" /> تتبع الطلب
            </h3>
          </div>
        </div>
        <div
          onClick={() => onNavigate("downloads")}
          className="h-40 rounded-2xl relative overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Works"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Download className="text-orange-400" /> التحميلات
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. لوحة التحكم (Admin Panel)
// ==========================================

function AdminPanel({ isOpen, onClose, data, handlers }) {
  const [activeTab, setActiveTab] = useState("store");
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "عام",
    location: "",
    image: "",
  });
  const [newDownload, setNewDownload] = useState({
    name: "",
    size: "",
    type: "Tool",
    url: "#",
  });
  const [adminUser, setAdminUser] = useState(data.adminCreds.user);
  const [adminPass, setAdminPass] = useState("");
  const [socialPost, setSocialPost] = useState("");

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return alert("يرجى ملء الاسم والسعر");
    handlers.addStoreItem({
      ...newItem,
      id: Date.now(),
      price: parseInt(newItem.price),
    });
    setNewItem({
      name: "",
      price: "",
      category: "عام",
      location: "",
      image: "",
    });
    alert("تم إضافة المنتج للمتجر!");
  };

  const handleAddDownload = () => {
    if (!newDownload.name) return alert("يرجى كتابة اسم الملف");
    handlers.addDownload({ ...newDownload, id: Date.now() });
    setNewDownload({ name: "", size: "", type: "Tool", url: "#" });
    alert("تم إضافة الملف!");
  };

  const handleUpdateCreds = () => {
    if (adminPass.length < 4) return alert("كلمة المرور قصيرة جداً");
    handlers.updateCreds(adminUser, adminPass);
    alert("تم تحديث بيانات الدخول بنجاح");
  };

  const handleSocialPublish = () => {
    if (!socialPost) return;
    alert("سيتم إرسال هذا المنشور إلى API فيسبوك وتيليجرام (محاكاة)");
    setSocialPost("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-slate-900 w-full max-w-5xl rounded-2xl border border-white/20 h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="text-cyan-400" /> لوحة الإدارة
          </h2>
          <button
            onClick={onClose}
            className="bg-red-500/20 text-red-400 p-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/4 bg-slate-950 border-l border-white/10 p-4 space-y-2 hidden md:block">
            <button
              onClick={() => setActiveTab("store")}
              className={`w-full text-right p-3 rounded-xl font-bold flex items-center gap-2 ${
                activeTab === "store"
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <ShoppingBag size={18} /> إدارة المتجر
            </button>
            <button
              onClick={() => setActiveTab("downloads")}
              className={`w-full text-right p-3 rounded-xl font-bold flex items-center gap-2 ${
                activeTab === "downloads"
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Download size={18} /> ملفات الصيانة
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`w-full text-right p-3 rounded-xl font-bold flex items-center gap-2 ${
                activeTab === "social"
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Share2 size={18} /> النشر التلقائي
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-right p-3 rounded-xl font-bold flex items-center gap-2 ${
                activeTab === "settings"
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <Key size={18} /> الإعدادات
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto bg-slate-900">
            {activeTab === "store" && (
              <div className="space-y-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Plus className="text-green-400" /> إضافة منتج
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="اسم المنتج"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      className="bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                    <input
                      type="number"
                      placeholder="السعر"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({ ...newItem, price: e.target.value })
                      }
                      className="bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                    <input
                      type="text"
                      placeholder="القسم"
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      className="bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                    <input
                      type="text"
                      placeholder="رابط الصورة"
                      value={newItem.image}
                      onChange={(e) =>
                        setNewItem({ ...newItem, image: e.target.value })
                      }
                      className="bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                    <input
                      type="text"
                      placeholder="الموقع"
                      value={newItem.location}
                      onChange={(e) =>
                        setNewItem({ ...newItem, location: e.target.value })
                      }
                      className="bg-black/30 text-white p-3 rounded-lg border border-white/10 md:col-span-2"
                    />
                  </div>
                  <button
                    onClick={handleAddItem}
                    className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg font-bold"
                  >
                    نشر
                  </button>
                </div>
                <div className="space-y-4">
                  {data.storeItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-slate-800 p-4 rounded-lg border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          className="w-12 h-12 rounded object-cover"
                          alt=""
                        />
                        <p className="text-white font-bold">{item.name}</p>
                      </div>
                      <button
                        onClick={() => handlers.deleteStoreItem(item.id)}
                        className="text-red-400 hover:bg-red-500/10 p-2 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "downloads" && (
              <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    إضافة ملف
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="اسم البرنامج"
                      value={newDownload.name}
                      onChange={(e) =>
                        setNewDownload({ ...newDownload, name: e.target.value })
                      }
                      className="flex-1 bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                    <input
                      type="text"
                      placeholder="الحجم"
                      value={newDownload.size}
                      onChange={(e) =>
                        setNewDownload({ ...newDownload, size: e.target.value })
                      }
                      className="w-24 bg-black/30 text-white p-3 rounded-lg border border-white/10"
                    />
                  </div>
                  <button
                    onClick={handleAddDownload}
                    className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg font-bold"
                  >
                    إضافة
                  </button>
                </div>
                <div className="space-y-2">
                  {data.downloads.map((d) => (
                    <div
                      key={d.id}
                      className="flex justify-between p-3 bg-slate-800 rounded border border-white/5 items-center"
                    >
                      <span className="text-white">{d.name}</span>
                      <button
                        onClick={() => handlers.deleteDownload(d.id)}
                        className="text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "social" && (
              <div className="flex flex-col h-full justify-center items-center text-center space-y-6">
                <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 w-full max-w-lg">
                  <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    النشر المتزامن
                  </h3>
                  <textarea
                    value={socialPost}
                    onChange={(e) => setSocialPost(e.target.value)}
                    placeholder="اكتب المنشور..."
                    className="w-full h-32 bg-black/30 text-white p-4 rounded-xl border border-white/10 mb-4 focus:border-blue-500 outline-none"
                  ></textarea>
                  <button
                    onClick={handleSocialPublish}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition"
                  >
                    نشر الآن 🚀
                  </button>
                </div>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    بيانات الدخول
                  </h3>
                  <input
                    type="text"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    className="w-full bg-black/30 text-white p-3 rounded-lg border border-white/10 mb-4"
                  />
                  <input
                    type="password"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full bg-black/30 text-white p-3 rounded-lg border border-white/10 mb-4"
                  />
                  <button
                    onClick={handleUpdateCreds}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. الأقسام الفرعية (VIEWS)
// ==========================================

function StoreView({ items, onBack }) {
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...new Set(items.map((i) => i.category))];
  const filtered =
    filter === "all" ? items : items.filter((i) => i.category === filter);
  return (
    <div className="min-h-screen bg-[#0a0f1c] pb-20 animate-in fade-in">
      <div className="bg-slate-900 border-b border-white/10 px-6 py-6 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold"
          >
            <ArrowRight size={18} /> الرئيسية
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-purple-400" /> المتجر
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {cat === "all" ? "الكل" : cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all group flex flex-col"
            >
              <div className="aspect-square relative overflow-hidden bg-white">
                <ImageWithFallback
                  src={item.image}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                {item.badge && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-white text-lg line-clamp-2">
                  {item.name}
                </h3>
                {item.location && (
                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                    <MapPin size={12} /> {item.location}
                  </p>
                )}
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="font-bold text-xl text-purple-400">
                    {item.price.toLocaleString()} د.ج
                  </span>
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${CONTACT_INFO.rawPhone}?text=أريد شراء ${item.name}`,
                        "_blank"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DownloadsView({ items, onBack }) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] pb-20 animate-in fade-in">
      <div className="bg-slate-900 border-b border-white/10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
          >
            <ArrowRight size={18} /> الرئيسية
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Download className="text-orange-400" /> منطقة الفنيين
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 mt-8 space-y-4">
        {items.map((file) => (
          <div
            key={file.id}
            className="bg-slate-800 p-4 rounded-xl border border-white/5 flex justify-between items-center hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <FileText className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">{file.name}</h3>
                <p className="text-slate-400 text-sm">
                  {file.type} • {file.size}
                </p>
              </div>
            </div>
            <a
              href={file.url}
              className="bg-white/10 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
            >
              تحميل
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoftwareView({ onBack, onContact }) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] animate-in slide-in-from-bottom-5 duration-500 pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-12 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-white mb-6 font-bold bg-white/5 w-fit px-4 py-2 rounded-lg"
          >
            <ArrowRight size={18} /> الرئيسية
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            قسم السوفت وير
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-green-400 w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">تخطي جوجل (FRP)</h2>
          </div>
          <button
            onClick={onContact}
            className="mt-8 w-full bg-white/5 hover:bg-green-600 hover:text-white text-slate-300 py-3 rounded-xl transition-all font-bold border border-white/10"
          >
            طلب الخدمة
          </button>
        </div>
        <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <Unlock className="text-blue-400 w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">فك شفرات</h2>
          </div>
          <button
            onClick={onContact}
            className="mt-8 w-full bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 py-3 rounded-xl transition-all font-bold border border-white/10"
          >
            استفسار
          </button>
        </div>
      </div>
    </div>
  );
}

function HardwareView({ onBack, onContact }) {
  return (
    <div className="min-h-screen bg-[#0f0f10] animate-in slide-in-from-bottom-5 duration-500 pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 px-6 py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-400 hover:text-white mb-6 font-bold bg-white/5 w-fit px-4 py-2 rounded-lg"
          >
            <ArrowRight size={18} /> الرئيسية
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            صيانة الهاردوير
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 space-y-12">
        <div className="bg-slate-900 rounded-2xl p-6 border border-white/5 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            شاهد الفرق في الجودة
          </h3>
          <BeforeAfter />
        </div>
      </div>
    </div>
  );
}

function PricingView({ onBack, onContact }) {
  return (
    <div className="min-h-screen bg-slate-950 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 border-b border-white/10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
          >
            <ArrowRight size={18} /> رجوع
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Banknote className="text-green-400" /> الأسعار التقريبية
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <CostEstimator />
        <div className="space-y-8 mt-12">
          {SERVICE_PRICES.map((section, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="bg-slate-800 px-6 py-4 font-bold text-white text-xl border-b border-white/10">
                {section.category}
              </div>
              <div className="divide-y divide-white/5">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-green-400 font-mono font-bold">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onContact}
          className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg"
        >
          طلب تسعير خاص
        </button>
      </div>
    </div>
  );
}

function TrackingModal({ isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  if (!isOpen) return null;
  const checkOrder = () => {
    if (code === "1234")
      setResult({
        status: "ready",
        msg: "✅ الجهاز جاهز للاستلام",
        device: "iPhone 13 Pro",
      });
    else setResult({ status: "error", msg: "رقم الوصل غير صحيح ❌" });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          تتبع حالة الجهاز
        </h2>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="رقم الوصل"
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-center"
          />
          <button
            onClick={checkOrder}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            فحص
          </button>
        </div>
        {result && (
          <div className="p-4 bg-slate-800 rounded text-center text-white">
            <p className="font-bold">{result.msg}</p>
            {result.device && (
              <p className="text-sm text-slate-400">{result.device}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-white/20 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          حجز موعد صيانة
        </h2>
        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="نوع الجهاز"
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
          />
          <input
            type="text"
            placeholder="وصف العطل"
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
          />
          <input
            type="date"
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
            إرسال الحجز
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. التطبيق الرئيسي (APP)
// ==========================================

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const [storeItems, setStoreItems] = useState(INITIAL_STORE_ITEMS);
  const [downloads, setDownloads] = useState(INITIAL_DOWNLOADS);
  const [adminCreds, setAdminCreds] = useState({
    user: "admin",
    pass: "cpetech2025",
  });

  const { likes, toggleLike } = useAnalytics();

  useEffect(() => {
    const savedStore = localStorage.getItem("cpe-store");
    if (savedStore) setStoreItems(JSON.parse(savedStore));
    const savedCreds = localStorage.getItem("cpe-creds");
    if (savedCreds) setAdminCreds(JSON.parse(savedCreds));
  }, []);

  const adminHandlers = {
    addStoreItem: (item) => {
      const updated = [item, ...storeItems];
      setStoreItems(updated);
      localStorage.setItem("cpe-store", JSON.stringify(updated));
    },
    deleteStoreItem: (id) => {
      const updated = storeItems.filter((i) => i.id !== id);
      setStoreItems(updated);
      localStorage.setItem("cpe-store", JSON.stringify(updated));
    },
    addDownload: (item) => {
      setDownloads([item, ...downloads]);
    },
    deleteDownload: (id) => {
      setDownloads(downloads.filter((d) => d.id !== id));
    },
    updateCreds: (user, pass) => {
      const newCreds = { user, pass };
      setAdminCreds(newCreds);
      localStorage.setItem("cpe-creds", JSON.stringify(newCreds));
    },
  };

  const handleLogin = (u, p) => {
    if (u === adminCreds.user && p === adminCreds.pass) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setShowAdminPanel(true);
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  if (currentView === "store")
    return (
      <StoreView items={storeItems} onBack={() => setCurrentView("home")} />
    );
  if (currentView === "downloads")
    return (
      <DownloadsView items={downloads} onBack={() => setCurrentView("home")} />
    );
  if (currentView === "software")
    return (
      <SoftwareView
        onBack={() => setCurrentView("home")}
        onContact={() => alert("تواصل معنا على واتساب")}
      />
    );
  if (currentView === "hardware")
    return (
      <HardwareView
        onBack={() => setCurrentView("home")}
        onContact={() => alert("تواصل معنا على واتساب")}
      />
    );
  if (currentView === "pricing")
    return (
      <PricingView
        onBack={() => setCurrentView("home")}
        onContact={() => alert("تواصل معنا على واتساب")}
      />
    );
  if (currentView === "tracking")
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <button
          onClick={() => setCurrentView("home")}
          className="text-white mb-4"
        >
          رجوع
        </button>
        <TrackingModal isOpen={true} onClose={() => setCurrentView("home")} />
      </div>
    );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 font-sans text-right"
      dir="rtl"
    >
      <NewsTicker
        text={INITIAL_SETTINGS.tickerText}
        show={INITIAL_SETTINGS.showTicker}
      />
      <SalesPopup />
      <FloatingChat />

      <header className="px-6 py-4 sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView("home")}
          >
            <Wrench className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white">
              CPE<span className="text-cyan-400">TECH</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView("store")}
              className="hidden md:flex items-center gap-2 text-purple-400 font-bold px-3 py-2 bg-purple-500/10 rounded-lg hover:bg-purple-500/20"
            >
              <ShoppingBag size={18} /> المتجر
            </button>
            <button
              onClick={() => setCurrentView("pricing")}
              className="hidden md:flex items-center gap-2 text-green-400 font-bold px-3 py-2 bg-green-500/10 rounded-lg hover:bg-green-500/20"
            >
              <Banknote size={18} /> الأسعار
            </button>
            {isLoggedIn ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="bg-cyan-600 text-white p-2 rounded-lg"
                >
                  <Settings size={20} />
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-600 text-white p-2 rounded-lg"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-slate-400 hover:text-white p-2"
              >
                <LogIn size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center bg-black overflow-hidden">
        <img
          src={INITIAL_SETTINGS.heroImage}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Hero"
        />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            المركز الأول للحلول التقنية
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            صيانة هاردوير احترافية • برمجة وتخطي • متجر إلكتروني متكامل • أدوات
            حصرية للفنيين
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" /> حجز موعد
            </button>
            <button
              onClick={() => setCurrentView("downloads")}
              className="bg-slate-700/80 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-600 transition flex items-center gap-2"
            >
              <Download className="w-5 h-5" /> منطقة الفنيين
            </button>
          </div>
        </div>
      </section>

      <QuickAccessGrid onNavigate={setCurrentView} />
      <BrandsMarquee />

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => setCurrentView("hardware")}
            className="cursor-pointer bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/50 hover:shadow-2xl transition group"
          >
            <Cpu className="w-12 h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-bold text-white mb-2">
              قسم الهاردوير
            </h3>
            <p className="text-slate-400 mb-4">
              صيانة بوردات، تبديل شاشات، إصلاح دوائر الشحن والباور بأحدث
              الأجهزة.
            </p>
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              التفاصيل <ArrowLeft size={16} />
            </span>
          </div>
          <div
            onClick={() => setCurrentView("software")}
            className="cursor-pointer bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-blue-500/50 hover:shadow-2xl transition group"
          >
            <Unlock className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-bold text-white mb-2">
              قسم السوفت وير
            </h3>
            <p className="text-slate-400 mb-4">
              فك تشفير الشبكات، تخطي حسابات جوجل (FRP)، حلول برمجية متقدمة.
            </p>
            <span className="text-blue-400 font-bold flex items-center gap-2">
              التفاصيل <ArrowLeft size={16} />
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-black/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            آراء العملاء
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
              <div className="flex text-yellow-400 mb-2">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-slate-300 text-sm">
                "أفضل مركز تعاملت معه في بسكرة، شغل نظيف جداً."
              </p>
              <p className="text-white font-bold text-xs mt-4">- محمد إسلام</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
              <div className="flex text-yellow-400 mb-2">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-slate-300 text-sm">
                "خدمة سريعة وأسعارهم مناسبة مقارنة بالسوق."
              </p>
              <p className="text-white font-bold text-xs mt-4">- أمين</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
              <div className="flex text-yellow-400 mb-2">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} />
              </div>
              <p className="text-slate-300 text-sm">
                "المتجر يحتوي على منتجات أصلية، اشتريت شاحن وكان ممتاز."
              </p>
              <p className="text-white font-bold text-xs mt-4">- عبدالرحمن</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              CPE<span className="text-cyan-400">TECH</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              الوجهة الأولى في بسكرة لصيانة الأجهزة الذكية والحواسيب. نقدم
              حلولاً تقنية متكاملة بضمان حقيقي.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />{" "}
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" />{" "}
                {CONTACT_INFO.landline}
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-cyan-400" />{" "}
                {CONTACT_INFO.phoneDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" />{" "}
                {CONTACT_INFO.email}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">الموقع</h3>
            <LocationMap />
          </div>
        </div>
        <div className="text-center text-slate-600 text-sm mt-8 border-t border-white/5 pt-4">
          © 2025 CPE-TECH. جميع الحقوق محفوظة.
        </div>
      </footer>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm border border-white/10 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              دخول الإدارة
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(e.target.u.value, e.target.p.value);
              }}
            >
              <input
                name="u"
                type="text"
                placeholder="اسم المستخدم"
                className="w-full mb-3 p-3 rounded bg-black/30 text-white border border-white/10"
              />
              <input
                name="p"
                type="password"
                placeholder="كلمة المرور"
                className="w-full mb-6 p-3 rounded bg-black/30 text-white border border-white/10"
              />
              <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-500">
                دخول
              </button>
            </form>
          </div>
        </div>
      )}

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        data={{ storeItems, downloads, adminCreds }}
        handlers={adminHandlers}
      />
      <TrackingModal
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
      />
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}
