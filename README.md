# Bozor

React'da yozilgan onlayn do'kon (frontend): katalog, qidiruv va filtrlar, mahsulot sahifasi, savat, sevimlilar va buyurtma berish.

## Imkoniyatlar

- **Katalog** — bo'lim, narx chegarasi va saralash; filtrlar URL'da saqlanadi (havolani ulashish mumkin)
- **Qidiruv** — sarlavhadagi qidiruv maydoni orqali
- **Mahsulot sahifasi** — miqdor tanlash, ombordagi zaxira, o'xshash mahsulotlar
- **Savat** (yon panel) — miqdorni o'zgartirish, 500 000 so'mdan yuqori xaridda bepul yetkazish hisobi
- **Sevimlilar** — yurak belgisi bilan saqlanadi
- **Buyurtma berish** — forma tekshiruvi (telefon formati, manzil), olib ketish/kuryer, buyurtma `localStorage`ga yoziladi
- Savat va sevimlilar sahifa yangilanganda saqlanib qoladi; yorug' va qorong'i rejim; mobilga moslashgan

## Texnologiyalar

React 18 · Vite · React Router (HashRouter) · Context + useReducer · lucide-react

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build: `npm run build` (natija `dist/` papkasida).

## GitHub Pages'ga joylash

1. `npm run build`
2. `npx gh-pages -d dist`
3. Repo Settings → Pages bo'limida `gh-pages` branchini tanlang

## Papkalar

```
src/
  components/   Header, ProductCard, CartDrawer, QtyControl
  pages/        Home, Catalog, Product, Wishlist, Checkout, Success, NotFound
  store/        ShopContext (savat + sevimlilar, localStorage)
  data/         products.js (namunaviy mahsulotlar)
  utils/        format.js (narx formati, yetkazish qoidalari)
```

## Keyingi qadamlar (g'oyalar)

- Haqiqiy backend va to'lov tizimi (Payme, Click) ulash
- Mahsulot rasmlari va sharhlar
- Buyurtmalar tarixi sahifasi
# bozor
