import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { byId } from "../data/products";
import { DELIVERY_FEE, FREE_DELIVERY_FROM } from "../utils/format";

const KEY = "bozor:v1";
const Ctx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* buzilgan ma'lumot */
  }
  return { cart: {}, wish: [] };
}

function reducer(s, a) {
  switch (a.type) {
    case "ADD": {
      const max = byId(a.id)?.stock ?? 1;
      const qty = Math.min(max, (s.cart[a.id] || 0) + (a.qty || 1));
      return { ...s, cart: { ...s.cart, [a.id]: qty } };
    }
    case "SET_QTY": {
      const max = byId(a.id)?.stock ?? 1;
      const qty = Math.min(max, a.qty);
      const cart = { ...s.cart };
      if (qty <= 0) delete cart[a.id];
      else cart[a.id] = qty;
      return { ...s, cart };
    }
    case "REMOVE": {
      const cart = { ...s.cart };
      delete cart[a.id];
      return { ...s, cart };
    }
    case "CLEAR":
      return { ...s, cart: {} };
    case "TOGGLE_WISH":
      return {
        ...s,
        wish: s.wish.includes(a.id) ? s.wish.filter((x) => x !== a.id) : [...s.wish, a.id],
      };
    default:
      return s;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, load);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* xotira to'lgan */
    }
  }, [state]);

  const value = useMemo(() => {
    const items = Object.entries(state.cart)
      .map(([id, qty]) => ({ product: byId(id), qty }))
      .filter((i) => i.product);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    return {
      items, count, subtotal, delivery, total: subtotal + delivery,
      wish: state.wish,
      dispatch,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [state, drawerOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop faqat ShopProvider ichida ishlaydi");
  return ctx;
}
