import { Minus, Plus } from "lucide-react";

export default function QtyControl({ value, max, onChange }) {
  return (
    <div className="qty" role="group" aria-label="Miqdor">
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Kamaytirish"><Minus size={14} /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Ko'paytirish"><Plus size={14} /></button>
    </div>
  );
}
