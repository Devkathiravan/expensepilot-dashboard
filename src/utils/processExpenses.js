export function processExpenses({
  expenses,
  search = "",
  category = "all",
  sortBy = "",
}) {
  let data = [...expenses];

  // Search
  if (search) {
    data = data.filter((e) =>
      e.category.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Category Filter
  if (category !== "all") {
    data = data.filter((e) => e.category === category);
  }

  // Sort
  if (sortBy === "amount") {
    data.sort((a, b) => Number(b.amount) - Number(a.amount));
  }

  if (sortBy === "date") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return data;
}
