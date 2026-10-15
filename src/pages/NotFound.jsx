import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Sahifa topilmadi</h1>
      <p>Manzil noto'g'ri yoki mahsulot sotuvdan olingan.</p>
      <Link to="/catalog" className="btn btn-primary">Katalogga qaytish</Link>
    </div>
  );
}
