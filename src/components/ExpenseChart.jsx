import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import ExportMenu from "./ExportMenu";
import MonthlySummary from "./MonthlySummary";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ExpenseChart({ expenses = [] }) {
  // 1. Group data
  const categoryData = Object.values(
    expenses.reduce((acc, expense) => {
      const category = expense.category || "Other";

      if (!acc[category]) {
        acc[category] = { name: category, value: 0 };
      }

      acc[category].value += Number(expense.amount || 0);

      return acc;
    }, {}),
  );

  // 2. Fallback data
  const fallbackData = [{ name: "No Data", value: 1 }];

  // 3. Empty check
  const isEmpty = categoryData.length === 0;

  // 4. FINAL chart data (THIS WAS MISSING / WRONG IN YOUR CODE)
  const chartData = isEmpty ? fallbackData : categoryData;

  return (
    <div className="expense-dashboard">
      <div className="chart-section">
        {/* LEFT - CHART */}
        <div className="chart-box">
          <div className="chart-header">
            <h2>Expense Breakdown</h2>
            <ExportMenu expenses={expenses} />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label={!isEmpty}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={isEmpty ? "#CBD5E1" : COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {isEmpty && (
            <p className="empty-text">
              No expenses yet — add your first expense
            </p>
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="summary-box">
          <MonthlySummary expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
