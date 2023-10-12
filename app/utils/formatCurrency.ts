// Formats number to norwegian standard

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('no-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}
