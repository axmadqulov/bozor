import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useShop } from "../store/ShopContext";
import { money } from "../utils/format";

export default function ProductCard({ product }) {
  const { wish, dispatch, openDrawer } = useShop();
  const liked = wish.includes(product.id);

  return (
    <article className="pcard">
      <Link to={`/product/${product.id}`} className="pcard-visual" style={{ background: product.color }} aria-label={product.name}>
        <span className="pcard-emoji" aria-hidden>{product.emoji}</span>
        {product.isNew && <span className="chip">Yangi</span>}
      </Link>

      <button
        className={"wish-btn" + (liked ? " is-on" : "")}
        onClick={() => dispatch({ type: "TOGGLE_WISH", id: product.id })}
        aria-pressed={liked}
        aria-label={liked ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
      >
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
      </button>

      <div className="pcard-body">
        <Link to={`/product/${product.id}`} className="pcard-name">{product.name}</Link>
        <p className="rating"><Star size={14} fill="currentColor" aria-hidden /> {product.rating} <span className="muted">({product.reviews})</span></p>
        <div className="pcard-foot">
          <strong>{money(product.price)}</strong>
          <button
            className="btn btn-small"
            onClick={() => {
              dispatch({ type: "ADD", id: product.id });
              openDrawer();
            }}
          >
            Savatga
          </button>
        </div>
      </div>
    </article>
  );
}
