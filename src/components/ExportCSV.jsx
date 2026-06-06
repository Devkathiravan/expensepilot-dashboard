import { useState } from "react";

export default function ExportCSV({ expenses }) {
  const [loading, setLoading] = useState(false);

  const exportCSV = () => {
    if (!expenses || expenses.length === 0) return;

    setLoading(true);

    const header = ["Date", "Category", "Amount", "Status", "Description"];

    const rows = expenses.map((e) => [
      e.date || "-",
      e.category || "-",
      e.amount || 0,
      e.status || "Draft",
      e.description ? `"${e.description}"` : "-",
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setTimeout(() => setLoading(false), 600);
  };

  return (
    <button
      className={`export-btn ${loading ? "loading" : ""}`}
      onClick={exportCSV}
      disabled={loading}
    >
      {loading ? "Downloading..." : "Export CSV ⬇️"}
    </button>
  );
}
