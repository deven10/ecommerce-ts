export function formatCurrency(price: number) {
  const result = new Intl.NumberFormat(undefined, {
    currency: "INR",
    style: "currency",
  }).format(price);
  return result;
}
