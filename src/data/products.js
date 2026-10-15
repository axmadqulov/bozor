export const CATEGORIES = [
  { id: "elektronika", label: "Elektronika" },
  { id: "kiyim", label: "Kiyim" },
  { id: "uy", label: "Uy-ro'zg'or" },
  { id: "sport", label: "Sport" },
];

const p = (id, name, cat, price, rating, reviews, emoji, color, desc, stock, isNew = false) => ({
  id, name, cat, price, rating, reviews, emoji, color, desc, stock, isNew,
});

export const PRODUCTS = [
  p(1, "Simsiz quloqchin", "elektronika", 389000, 4.6, 214, "🎧", "#ffd9df", "Shovqinni kamaytirish, 30 soatlik batareya va ixcham g'ilof.", 14, true),
  p(2, "Aqlli soat", "elektronika", 799000, 4.4, 98, "⌚", "#d9e4ff", "Yurak urishi, uyqu va qadam hisoblagich. Suvdan himoyalangan.", 6),
  p(3, "Portativ kolonka", "elektronika", 259000, 4.7, 340, "🔊", "#fff0c2", "Cho'ntakka sig'adigan, 12 soat ishlaydi, chang va suvga chidamli.", 21),
  p(4, "Mexanik klaviatura", "elektronika", 549000, 4.8, 157, "⌨️", "#dff5e6", "Tez almashtiriladigan tugmalar va orqadan yorug'lik.", 9, true),
  p(5, "Paxtali ko'ylak", "kiyim", 149000, 4.3, 77, "👕", "#e8defa", "Yumshoq, 100% paxta, yozgi mavsum uchun.", 40),
  p(6, "Qishki kurtka", "kiyim", 699000, 4.5, 122, "🧥", "#d9e4ff", "Issiq astar va shamoldan himoya. -15° gacha.", 11),
  p(7, "Jinsi shim", "kiyim", 289000, 4.2, 163, "👖", "#cfe3f1", "To'g'ri kesim, cho'ziluvchan mato.", 25),
  p(8, "Charm sumka", "kiyim", 459000, 4.6, 64, "👜", "#ffe3cf", "Haqiqiy charm, noutbuk uchun alohida bo'lim.", 8, true),
  p(9, "Elektr choynak", "uy", 179000, 4.5, 281, "🫖", "#dff5e6", "1.7 litr, o'chirish avtomatikasi, zanglamaydigan po'lat.", 30),
  p(10, "Kofe aparati", "uy", 1190000, 4.7, 89, "☕", "#ffe3cf", "Espresso va kapuchino, 15 bar bosim.", 5),
  p(11, "Yostiq to'plami", "uy", 129000, 4.1, 52, "🛏️", "#e8defa", "Ikkita yostiq, ortopedik ko'pik.", 18),
  p(12, "Stol chirog'i", "uy", 99000, 4.4, 136, "💡", "#fff0c2", "Yorqinlik sozlanadi, USB bilan quvvatlanadi.", 33),
  p(13, "Yoga gilami", "sport", 119000, 4.6, 205, "🧘", "#dff5e6", "Sirpanmaydigan, 6 mm qalinlik.", 27),
  p(14, "Gantellar (2×5 kg)", "sport", 219000, 4.5, 94, "🏋️", "#ffd9df", "Kauchuk qoplama, polni buzmaydi.", 12),
  p(15, "Yugurish krossovkalari", "sport", 429000, 4.7, 310, "👟", "#d9e4ff", "Yengil, havo o'tkazuvchan to'r, yumshoq tagcharm.", 16, true),
  p(16, "Sport shishasi", "sport", 59000, 4.3, 412, "🥤", "#cfe3f1", "750 ml, issiqni 12 soat saqlaydi.", 60),
];

export const byId = (id) => PRODUCTS.find((x) => x.id === Number(id));
