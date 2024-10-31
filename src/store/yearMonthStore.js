import { create } from 'zustand';

const useYearMonthStore = create((set) => ({
  year: 2024,
  month: 10,
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setYearMonth: (year, month) => set({ year, month }),
}));

export default useYearMonthStore;
