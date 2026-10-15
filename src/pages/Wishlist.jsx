import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { useShop } from "../store/ShopContext";

export default function Wishlist() {
  const { wish } = useShop();
  const list = PRODUCTS.filter((p) => wish.includes(p.id));

  return (
    <>
      <h1>Sevimlilar</h1>
      {list.length === 0 ? (
        <p className="empty">
          Hozircha bo'sh. Mahsulot kartasidagi yurak belgisini bossangiz, shu yerda saqlanadi. <Link to="/catalog" className="link">Katalogga o'tish</Link>
        </p>
      ) : (
        <div className="grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </>
  );
}
