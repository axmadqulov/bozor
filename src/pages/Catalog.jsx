import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { money } from "../utils/format";

const SORTS = [
  { id: "new", label: "Yangilari avval" },
  { id: "cheap", label: "Arzonlari avval" },
  { id: "pricey", label: "Qimmatlari avval" },
  { id: "rating", label: "Reyting bo'yicha" },
];

const MAX_PRICE = 1200000;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const cat = params.get("cat") || "all";
  const sort = params.get("sort") || "new";
  const max = Number(params.get("max")) || MAX_PRICE;

  function set(key, value, empty) {
    const next = new URLSearchParams(params);
    if (value === empty) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        (cat === "all" || p.cat === cat) &&
        p.price <= max &&
        (!term || p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term))
    );
    const sorters = {
      new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id,
      cheap: (a, b) => a.price - b.price,
      pricey: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return filtered.sort(sorters[sort] || sorters.new);
  }, [q, cat, sort, max]);

  return (
    <div className="catalog">
      <aside className="filters" aria-label="Filtrlar">
        <h2>Filtrlar</h2>

        <fieldset>
          <legend>Bo'lim</legend>
          {[{ id: "all", label: "Hammasi" }, ...CATEGORIES].map((c) => (
            <label key={c.id} className="radio">
              <input type="radio" name="cat" checked={cat === c.id} onChange={() => set("cat", c.id, "all")} />
              {c.label}
            </label>
          ))}
        </fieldset>

        <label className="range">
          Narx: {money(max)} gacha
          <input type="range" min="50000" max={MAX_PRICE} step="10000" value={max} onChange={(e) => set("max", e.target.value, String(MAX_PRICE))} />
        </label>

        {(q || cat !== "all" || max !== MAX_PRICE) && (
          <button className="btn" onClick={() => setParams({}, { replace: true })}>Filtrlarni tozalash</button>
        )}
      </aside>

      <section>
        <div className="catalog-top">
          <h1>{q ? `“${q}” bo'yicha natijalar` : "Katalog"} <span className="muted">· {list.length}</span></h1>
          <label className="sort">
            Saralash
            <select value={sort} onChange={(e) => set("sort", e.target.value, "new")}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>

        {list.length === 0 ? (
          <p className="empty">Hech narsa topilmadi. Narx chegarasini oshiring yoki qidiruv so'zini o'zgartiring.</p>
        ) : (
          <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>
    </div>
  );
}
