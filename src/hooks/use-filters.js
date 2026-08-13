import { create } from "zustand";

export const useFilters = create((set) => ({
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  resetFilters: () => set({ search: "", category: "", minPrice: "", maxPrice: "" }),
}));