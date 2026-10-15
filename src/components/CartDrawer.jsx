import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { useShop } from "../store/ShopContext";
import QtyControl from "./QtyControl";
import { FREE_DELIVERY_FROM, money } from "../utils/format";

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, items, subtotal, delivery, total, dispatch } = useShop();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const left = Math.max(0, FREE_DELIVERY_FROM - subtotal);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && closeDrawer()}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Savat">
        <header className="drawer-head">
          <h2>Savat</h2>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Yopish"><X size={20} /></button>
        </header>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Savat bo'sh.</p>
            <Link to="/catalog" className="btn btn-primary" onClick={closeDrawer}>Katalogga o'tish</Link>
          </div>
        ) : (
          <>
            {left > 0 ? (
              <p className="free-note">Bepul yetkazish uchun yana {money(left)} qo'shing</p>
            ) : (
              <p className="free-note is-ok">Yetkazish bepul</p>
            )}

            <ul className="drawer-list">
              {items.map(({ product, qty }) => (
                <li key={product.id}>
                  <span className="mini" style={{ background: product.color }} aria-hidden>{product.emoji}</span>
                  <div className="grow">
                    <Link to={`/product/${product.id}`} onClick={closeDrawer}>{product.name}</Link>
                    <p className="muted">{money(product.price)}</p>
                    <QtyControl value={qty} max={product.stock} onChange={(n) => dispatch({ type: "SET_QTY", id: product.id, qty: n })} />
                  </div>
                  <button className="icon-btn" onClick={() => dispatch({ type: "REMOVE", id: product.id })} aria-label={`${product.name} ni olib tashlash`}>
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="drawer-foot">
              <dl className="sum">
                <div><dt>Mahsulotlar</dt><dd>{money(subtotal)}</dd></div>
                <div><dt>Yetkazish</dt><dd>{delivery ? money(delivery) : "Bepul"}</dd></div>
                <div className="sum-total"><dt>Jami</dt><dd>{money(total)}</dd></div>
              </dl>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>Buyurtma berish</Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
