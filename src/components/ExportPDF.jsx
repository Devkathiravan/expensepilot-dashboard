import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportPDF({ expenses }) {
  const [loading, setLoading] = useState(false);

  const exportPDF = () => {
    if (!expenses || expenses.length === 0) return;

    setLoading(true);

    try {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text("Expense Report", 14, 15);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 22);

      const tableData = expenses.map((e) => [
        e.date || "-",
        e.category || "-",
        e.amount || 0,
        e.status || "-",
        e.description || "-",
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Date", "Category", "Amount", "Status", "Description"]],
        body: tableData,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [79, 70, 229] },
      });

      doc.save(`expense_report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
    }

    setTimeout(() => setLoading(false), 500);
  };

  return (
    <button className="export-btn" onClick={exportPDF} disabled={loading}>
      {loading ? "Generating PDF..." : "Export PDF 📄"}
    </button>
  );
}
