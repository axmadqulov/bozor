export function money(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

export const FREE_DELIVERY_FROM = 500000;
export const DELIVERY_FEE = 25000;
