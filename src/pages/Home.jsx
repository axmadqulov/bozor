import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/products";

export default function Home() {
  const fresh = PRODUCTS.filter((p) => p.isNew);
  const top = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Kerakli narsalar bir joyda</h1>
          <p>Elektronika, kiyim, uy-ro'zg'or va sport buyumlari. Buyurtma qiling — 500 000 so'mdan yuqori xaridda yetkazish bepul.</p>
          <Link to="/catalog" className="btn btn-primary">Katalogni ochish</Link>
        </div>
        <ul className="hero-tiles" aria-hidden>
          {["🎧", "👟", "☕", "🧥"].map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>Bo'limlar</h2>
        <ul className="cat-grid">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={`/catalog?cat=${c.id}`} className="cat-tile">
                <span>{c.label}</span>
                <small>{PRODUCTS.filter((p) => p.cat === c.id).length} ta mahsulot</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>Yangi kelganlar</h2>
        <div className="grid">{fresh.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="block">
        <h2>Eng ko'p sharhlanganlar</h2>
        <div className="grid">{top.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </>
  );
}
