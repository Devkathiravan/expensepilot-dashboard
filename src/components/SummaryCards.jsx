const SummaryCards = ({ expenses }) => {
  // ---------- DATE HELPER ----------
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  };

  const today = formatDate(new Date());

  // Start of current week (Monday)
  const getStartOfWeek = () => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    const monday = new Date(now.setDate(diff));
    return formatDate(monday);
  };

  const weekStart = getStartOfWeek();

  // ---------- TOTAL EXPENSE ----------
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );

  // ---------- STATUS COUNTS ----------
  const approved = expenses.filter(
    (expense) => expense.status === "Approved",
  ).length;

  const rejected = expenses.filter(
    (expense) => expense.status === "Rejected",
  ).length;

  const submitted = expenses.filter(
    (expense) => expense.status === "Submitted",
  ).length;

  // ---------- HIGHEST EXPENSE ----------
  const highest =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => Number(e.amount || 0)))
      : 0;

  // ---------- TODAY EXPENSE (FIXED) ----------
  const todayTotal = expenses
    .filter((e) => formatDate(e.date) === today)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  // ---------- THIS WEEK EXPENSE (FIXED) ----------
  const thisWeekTotal = expenses
    .filter((e) => formatDate(e.date) >= weekStart)
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="cards">
      <div className="card">
        <h3>Total Expenses</h3>
        <p>₹{totalAmount}</p>
      </div>

      <div className="card">
        <h3>Today's Expense</h3>
        <p>₹{todayTotal}</p>
      </div>

      <div className="card">
        <h3>This Week Expense</h3>
        <p>₹{thisWeekTotal}</p>
      </div>

      <div className="card">
        <h3>Highest Expense</h3>
        <p>₹{highest}</p>
      </div>

      <div className="card">
        <h3>Approved</h3>
        <p>{approved}</p>
      </div>

      <div className="card">
        <h3>Rejected</h3>
        <p>{rejected}</p>
      </div>

      <div className="card">
        <h3>Submitted</h3>
        <p>{submitted}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
