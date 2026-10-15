import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { money } from "../utils/format";

export default function Success() {
  const { orderId } = useParams();
  let order = null;
  try {
    order = JSON.parse(localStorage.getItem("bozor:orders") || "[]").find((o) => o.id === orderId);
  } catch {
    /* o'qib bo'lmadi */
  }

  return (
    <div className="success">
      <CheckCircle2 size={48} aria-hidden />
      <h1>Buyurtma qabul qilindi</h1>
      <p>Buyurtma raqami: <strong>{orderId}</strong></p>
      {order ? (
        <p className="muted">
          {order.customer.name}, {money(order.total)} miqdoridagi buyurtmangiz bo'yicha {order.customer.phone} raqamiga qo'ng'iroq qilamiz.
        </p>
      ) : (
        <p className="muted">Buyurtma ma'lumotlari bu brauzerda topilmadi.</p>
      )}
      <Link to="/catalog" className="btn btn-primary">Xaridni davom ettirish</Link>
    </div>
  );
}
