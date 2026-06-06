export const validateExpense = (form) => {
  const errors = {};

  if (!form.date) {
    errors.date = "Date is required";
  }

  if (!form.category) {
    errors.category = "Category is required";
  }

  if (!form.amount) {
    errors.amount = "Amount is required";
  }

  if (form.amount && isNaN(form.amount)) {
    errors.amount = "Amount must be numeric";
  }

  return errors;
};
