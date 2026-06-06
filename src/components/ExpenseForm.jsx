import { useState, useEffect, useRef } from "react";

export default function ExpenseForm({
  expenses,
  setExpenses,
  editExpense,
  setEditExpense,
  setToast,
}) {
  const fileInputRef = useRef(null);
  const dateRef = useRef(null);
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    receipt: null,
    status: "Draft",
  });

  useEffect(() => {
    if (editExpense) {
      setForm(editExpense);
    }
  }, [editExpense]);

  const showToast = (message, type) => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        message: "",
        type: "",
      });
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        receipt: {
          name: file.name,
          data: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  const submit = () => {
    // Required field validation
    if (!form.date || !form.category || !form.amount) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    // Numeric validation
    if (isNaN(form.amount)) {
      showToast("Amount must be numeric", "error");
      return;
    }

    // Update Expense
    if (editExpense) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editExpense.id ? form : expense,
      );

      setExpenses(updatedExpenses);

      setEditExpense(null);

      showToast("Expense Updated Successfully", "success");
    }

    // Add Expense
    else {
      setExpenses([
        ...expenses,
        {
          ...form,
          id: Date.now(),
        },
      ]);

      showToast("Expense Added Successfully", "success");
    }

    // Reset Form
    setForm({
      date: "",
      category: "",
      amount: "",
      description: "",
      receipt: null,
      status: "Draft",
    });

    // Clear File Input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="card">
      <h2>{editExpense ? "Update Expense" : "Add Expense"}</h2>

      <input
        ref={dateRef}
        type="date"
        value={form.date}
        onClick={() => dateRef.current?.showPicker()}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>

        <option value="Travel">Travel</option>

        <option value="Food">Food</option>

        <option value="Medical">Medical</option>

        <option value="Office">Office</option>
      </select>

      <input
        type="number"
        inputMode="decimal"
        min="0"
        step="1"
        placeholder="Enter Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} />

      {form.receipt && <p className="receipt-name">📎 {form.receipt.name}</p>}

      {/* image preview code - can be enabled if needed in future */}
      {/* {form.receipt && (
        <img
          src={form.receipt.data}
          alt="Receipt"
          className="receipt-preview"
        />
      )} */}

      <button className="submit-btn" onClick={submit}>
        {editExpense ? "Update Expense" : "Submit Expense"}
      </button>
    </div>
  );
}
