import { useEffect } from "react";

const useLocalStorage = (expenses) => {
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
};

export default useLocalStorage;
