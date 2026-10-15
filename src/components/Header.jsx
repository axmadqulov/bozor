import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useShop } from "../store/ShopContext";

export default function Header() {
  const { count, wish, openDrawer } = useShop();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function search(e) {
    e.preventDefault();
    navigate(q.trim() ? `/catalog?q=${encodeURIComponent(q.trim())}` : "/catalog");
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Bozor</Link>

        <nav className="header-nav" aria-label="Asosiy menyu">
          <NavLink to="/catalog">Katalog</NavLink>
        </nav>

        <form className="header-search" onSubmit={search} role="search">
          <Search size={16} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mahsulot qidirish" aria-label="Mahsulot qidirish" />
        </form>

        <div className="header-actions">
          <Link to="/wishlist" className="icon-btn" aria-label={`Sevimlilar: ${wish.length} ta`}>
            <Heart size={20} />
            {wish.length > 0 && <span className="badge">{wish.length}</span>}
          </Link>
          <button className="icon-btn" onClick={openDrawer} aria-label={`Savat: ${count} ta mahsulot`}>
            <ShoppingBag size={20} />
            {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
