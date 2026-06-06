import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import SearchBar from "../components/SearchBar";
import SummaryCards from "../components/SummaryCards";
import ExpenseChart from "../components/ExpenseChart";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { processExpenses } from "../utils/processExpenses";
import MonthlySummary from "../components/MonthlySummary";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("all");
  const [editExpense, setEditExpense] = useState(null);
  const [dateRange, setDateRange] = useState("all");

  const [toast, setToast] = useState({
    message: "",
    type: "",
  });

  // Load data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses"));
    if (data) setExpenses(data);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const processedExpenses = processExpenses({
    expenses,
    search,
    category,
    sortBy,
  });

  return (
    <div className="container">
      <h1>Expense Management System</h1>
      <p className="dashboard-subtitle">
        Track, analyze and manage your expenses efficiently
      </p>

      <SummaryCards expenses={expenses} />

      <ExpenseForm
        expenses={expenses}
        setExpenses={setExpenses}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
        setToast={setToast}
      />

      {/* FILTER ROW */}
      <div className="filter-row">
        <div className="filter-left">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="filter-right">
          <select
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      <ExpenseTable
        expenses={processedExpenses}
        setExpenses={setExpenses}
        setEditExpense={setEditExpense}
      />

      <ExpenseChart expenses={expenses} />

      <Toast message={toast.message} type={toast.type} />

      <Footer />
    </div>
  );
}
