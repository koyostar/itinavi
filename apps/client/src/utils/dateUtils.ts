export function formatDateCell(params: any) {
  const raw = params.value;
  if (!raw) return "—";

  const date = new Date(raw);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
