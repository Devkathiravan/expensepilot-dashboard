import StatusBadge from "./StatusBadge";

const ExpenseTable = ({ expenses, setExpenses, setEditExpense }) => {
  const deleteExpense = (id) => {
    const result = window.confirm("Delete expense?");

    if (result) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        📋 No expenses found
        <p>Add your first expense to get started.</p>
      </div>
    );
  }

  const updateStatus = (id, status) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              status,
            }
          : expense,
      ),
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Receipt</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>

              <td>{expense.category}</td>

              <td className="amount">₹{expense.amount}</td>

              <td>
                {expense.receipt ? (
                  <a
                    href={expense.receipt.data}
                    download={expense.receipt.name}
                    className="download-link"
                  >
                    📎 Download
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td>
                <StatusBadge status={expense.status} />
              </td>

              <td>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditExpense(expense)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>

                  <select
                    value={expense.status}
                    onChange={(e) => updateStatus(expense.id, e.target.value)}
                  >
                    <option>Draft</option>
                    <option>Submitted</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
