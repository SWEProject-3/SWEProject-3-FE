import { create } from 'zustand';

const useYearMonthStore = create((set) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  return {
    year: currentYear,
    month: currentMonth,
    setYear: (year) => set({ year }),
    setMonth: (month) => set({ month }),
    setYearMonth: (year, month) => set({ year, month }),
  };
});

export default useYearMonthStore;
