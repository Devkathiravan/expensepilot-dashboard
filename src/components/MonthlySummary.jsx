export default function MonthlySummary({ expenses }) {
  const totals = {};

  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + Number(e.amount);
  });

  return (
    <div className="monthly-summary">
      <h3>📊 Monthly Summary</h3>

      {Object.entries(totals).map(([category, amount]) => (
        <div className="summary-item" key={category}>
          <span className="summary-category">{category}</span>

          <span className="summary-amount">₹{amount.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
