import { create } from "zustand";
import { persist } from "zustand/middleware";

// the type of the income
export type DailyIncome = {
  id: string;
  date: string;
  month: string;
  octopusIncome: number | null;
  alipayIncome: number | null;
  wechatIncome: number | null;
  otherIncome: number | null;
  otherIncomeRmk: string;
  totalIncome: number | null;
};

// the type of the income store
type IncomeStore = {
  incomes: DailyIncome[];
  initForMonth: (year: string, month: string) => void;
  updateIncome: (income: DailyIncome) => void;
  deleteIncome: (date: string) => void;
};

// the initial state of the income store
const initialState = {
  incomes: [
    { id: "2023-11-01", date: "2023-11-01", month: "11", octopusIncome: 3031, alipayIncome: 357, wechatIncome: 101, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3489 },
    { id: "2023-11-02", date: "2023-11-02", month: "11", octopusIncome: 2928, alipayIncome: 308, wechatIncome: 206, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3442 },
    { id: "2023-11-03", date: "2023-11-03", month: "11", octopusIncome: 3063, alipayIncome: 407, wechatIncome: 143, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3613 },
    { id: "2023-11-04", date: "2023-11-04", month: "11", octopusIncome: 2842, alipayIncome: 320, wechatIncome: 101, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3263 },
    { id: "2023-11-05", date: "2023-11-05", month: "11", octopusIncome: 2171, alipayIncome: 210, wechatIncome: 43, otherIncome: 0, otherIncomeRmk: "", totalIncome: 2424 },
    { id: "2023-11-06", date: "2023-11-06", month: "11", octopusIncome: 3272, alipayIncome: 242, wechatIncome: 153, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3667 },
    { id: "2023-11-07", date: "2023-11-07", month: "11", octopusIncome: 3465, alipayIncome: 473, wechatIncome: 127, otherIncome: 0, otherIncomeRmk: "", totalIncome: 4065 },
    { id: "2023-11-08", date: "2023-11-08", month: "11", octopusIncome: 3413, alipayIncome: 424, wechatIncome: 16, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3853 },
    { id: "2023-11-09", date: "2023-11-09", month: "11", octopusIncome: 3392, alipayIncome: 252, wechatIncome: 66, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3710 },
    { id: "2023-11-10", date: "2023-11-10", month: "11", octopusIncome: 3181, alipayIncome: 246, wechatIncome: 54, otherIncome: 0, otherIncomeRmk: "", totalIncome: 3481 },
    { id: "2023-11-11", date: "2023-11-11", month: "11", octopusIncome: 3494, alipayIncome: 676, wechatIncome: 109, otherIncome: 0, otherIncomeRmk: "", totalIncome: 4279 },
    { id: "2023-11-12", date: "2023-11-12", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-13", date: "2023-11-13", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-14", date: "2023-11-14", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-15", date: "2023-11-15", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-16", date: "2023-11-16", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-17", date: "2023-11-17", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-18", date: "2023-11-18", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-19", date: "2023-11-19", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-20", date: "2023-11-20", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-21", date: "2023-11-21", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-22", date: "2023-11-22", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-23", date: "2023-11-23", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-24", date: "2023-11-24", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-25", date: "2023-11-25", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-26", date: "2023-11-26", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-27", date: "2023-11-27", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-28", date: "2023-11-28", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-29", date: "2023-11-29", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2023-11-30", date: "2023-11-30", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-01", date: "2024-11-01", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-02", date: "2024-11-02", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-03", date: "2024-11-03", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-04", date: "2024-11-04", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-05", date: "2024-11-05", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-06", date: "2024-11-06", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-07", date: "2024-11-07", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-08", date: "2024-11-08", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-09", date: "2024-11-09", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-10", date: "2024-11-10", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-11", date: "2024-11-11", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-12", date: "2024-11-12", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-13", date: "2024-11-13", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-14", date: "2024-11-14", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-15", date: "2024-11-15", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-16", date: "2024-11-16", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-17", date: "2024-11-17", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-18", date: "2024-11-18", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-19", date: "2024-11-19", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-20", date: "2024-11-20", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-21", date: "2024-11-21", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-22", date: "2024-11-22", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-23", date: "2024-11-23", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-24", date: "2024-11-24", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-25", date: "2024-11-25", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-26", date: "2024-11-26", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-27", date: "2024-11-27", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-28", date: "2024-11-28", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-29", date: "2024-11-29", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
    { id: "2024-11-30", date: "2024-11-30", month: "11", octopusIncome: 0, alipayIncome: 0, wechatIncome: 0, otherIncome: 0, otherIncomeRmk: "", totalIncome: 0 },
  ],
};

export const useIncomeStore = create<IncomeStore, [["zustand/persist", IncomeStore]]>(
  persist(
    (set) => ({
      ...initialState,
      initForMonth: (year: string, month: string) => {
        // create all the days for the month
        const days = new Date(parseInt(year), parseInt(month), 0).getDate();
        const incomes: DailyIncome[] = [];
        console.log(`init for year ${year} and month ${month}`);
        for (let i = 1; i <= days; i++) {
          incomes.push({
            id: `${year}-${month}-${i.toString().padStart(2, "0")}`,
            date: `${year}-${month}-${i.toString().padStart(2, "0")}`,
            month: month,
            octopusIncome: null,
            alipayIncome: null,
            wechatIncome: null,
            otherIncome: null,
            otherIncomeRmk: "",
            totalIncome: 0,
          });
        }
        set((state) => ({
          incomes: [...state.incomes, ...incomes],
        }));
      },
      updateIncome: (income: DailyIncome) => {
        console.log(`update income ${JSON.stringify(income)}`);
        set((state) => ({
          incomes: state.incomes.map((innerIncome) => (innerIncome.date === income.date ? income : innerIncome)),
        }));
      },
      deleteIncome: (date: string) =>
        set((state) => ({
          incomes: state.incomes.filter((income) => income.date !== date),
        })),
    }),
    {
      name: "income-storage",
    }
  )
);
