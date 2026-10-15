import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../store/ShopContext";
import { money } from "../utils/format";

const PHONE = /^\+?998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Ismingizni kiriting";
  if (!PHONE.test(f.phone.trim())) e.phone = "Telefon raqamini +998 90 123 45 67 ko'rinishida kiriting";
  if (f.delivery === "courier" && f.address.trim().length < 6) e.address = "Yetkazish manzilini kiriting";
  return e;
}

export default function Checkout() {
  const { items, subtotal, total, dispatch } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", delivery: "courier", payment: "cash" });
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <div className="empty">
        <h1>Buyurtma berish</h1>
        <p>Savat bo'sh. Avval mahsulot qo'shing.</p>
        <Link to="/catalog" className="btn btn-primary">Katalogga o'tish</Link>
      </div>
    );
  }

  // Olib ketishda yetkazish puli yo'q
  const deliveryFee = form.delivery === "pickup" ? 0 : total - subtotal;
  const payable = subtotal + deliveryFee;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const order = {
      id: Date.now().toString(36).toUpperCase(),
      createdAt: Date.now(),
      customer: form,
      lines: items.map(({ product, qty }) => ({ id: product.id, name: product.name, qty, price: product.price })),
      subtotal,
      deliveryFee,
      total: payable,
    };
    try {
      const all = JSON.parse(localStorage.getItem("bozor:orders") || "[]");
      localStorage.setItem("bozor:orders", JSON.stringify([order, ...all]));
    } catch {
      /* buyurtma saqlanmasa ham davom etamiz */
    }
    dispatch({ type: "CLEAR" });
    navigate(`/success/${order.id}`);
  }

  return (
    <>
      <h1>Buyurtma berish</h1>
      <div className="checkout">
        <form onSubmit={submit} noValidate className="panel form">
          <label>
            Ism
            <input value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={Boolean(errors.name)} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Telefon
            <input value={form.phone} onChange={set("phone")} placeholder="+998 90 123 45 67" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </label>

          <fieldset>
            <legend>Olish usuli</legend>
            <label className="radio"><input type="radio" name="delivery" value="courier" checked={form.delivery === "courier"} onChange={set("delivery")} /> Kuryer yetkazadi</label>
            <label className="radio"><input type="radio" name="delivery" value="pickup" checked={form.delivery === "pickup"} onChange={set("delivery")} /> O'zim olib ketaman (bepul)</label>
          </fieldset>

          {form.delivery === "courier" && (
            <label>
              Manzil
              <textarea rows={2} value={form.address} onChange={set("address")} aria-invalid={Boolean(errors.address)} />
              {errors.address && <span className="error">{errors.address}</span>}
            </label>
          )}

          <fieldset>
            <legend>To'lov</legend>
            <label className="radio"><input type="radio" name="payment" value="cash" checked={form.payment === "cash"} onChange={set("payment")} /> Qabul qilganda naqd</label>
            <label className="radio"><input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={set("payment")} /> Qabul qilganda karta orqali</label>
          </fieldset>

          <button className="btn btn-primary" type="submit">Buyurtmani tasdiqlash · {money(payable)}</button>
        </form>

        <aside className="panel summary">
          <h2>Buyurtma tarkibi</h2>
          <ul>
            {items.map(({ product, qty }) => (
              <li key={product.id}>
                <span>{product.name} × {qty}</span>
                <span>{money(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="sum">
            <div><dt>Mahsulotlar</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Yetkazish</dt><dd>{deliveryFee ? money(deliveryFee) : "Bepul"}</dd></div>
            <div className="sum-total"><dt>Jami</dt><dd>{money(payable)}</dd></div>
          </dl>
        </aside>
      </div>
    </>
  );
}
