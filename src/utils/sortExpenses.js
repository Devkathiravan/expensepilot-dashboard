export function sortExpenses(expenses = [], sortBy = "") {
  let sorted = [...expenses];

  if (!Array.isArray(sorted)) return [];

  if (sortBy === "amount") {
    sorted.sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));
  }

  if (sortBy === "date") {
    sorted.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }

  return sorted;
}
