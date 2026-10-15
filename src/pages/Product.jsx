import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { byId, CATEGORIES, PRODUCTS } from "../data/products";
import { useShop } from "../store/ShopContext";
import QtyControl from "../components/QtyControl";
import ProductCard from "../components/ProductCard";
import NotFound from "./NotFound";
import { money } from "../utils/format";

export default function Product() {
  const { id } = useParams();
  const product = byId(id);
  const { wish, dispatch, openDrawer } = useShop();
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const liked = wish.includes(product.id);
  const cat = CATEGORIES.find((c) => c.id === product.cat);
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  return (
    <>
      <nav className="crumbs" aria-label="Yo'l">
        <Link to="/catalog">Katalog</Link> / <Link to={`/catalog?cat=${cat.id}`}>{cat.label}</Link> / {product.name}
      </nav>

      <div className="detail">
        <div className="detail-visual" style={{ background: product.color }} aria-hidden>
          <span>{product.emoji}</span>
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="rating"><Star size={16} fill="currentColor" aria-hidden /> {product.rating} <span className="muted">· {product.reviews} ta sharh</span></p>
          <p className="price">{money(product.price)}</p>
          <p>{product.desc}</p>
          <p className={product.stock <= 8 ? "stock is-low" : "stock"}>
            {product.stock <= 8 ? `Omborda ${product.stock} ta qoldi` : "Omborda bor"}
          </p>

          <div className="buy-row">
            <QtyControl value={qty} max={product.stock} onChange={(n) => setQty(Math.max(1, n))} />
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: "ADD", id: product.id, qty });
                openDrawer();
              }}
            >
              Savatga qo'shish
            </button>
            <button
              className={"btn" + (liked ? " is-on" : "")}
              aria-pressed={liked}
              onClick={() => dispatch({ type: "TOGGLE_WISH", id: product.id })}
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} /> {liked ? "Sevimlilarda" : "Sevimlilarga"}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="block">
          <h2>O'xshash mahsulotlar</h2>
          <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </>
  );
}
