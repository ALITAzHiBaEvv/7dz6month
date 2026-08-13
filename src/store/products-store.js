import { useQuery } from "@tanstack/react-query";
import { $mainApi } from "../api/http";
import { useFilters } from "../hooks/use-filters";

export const useProductStore = () => {
  const { search, category, minPrice, maxPrice } = useFilters();

  return useQuery({
    queryKey: ["products", search, category, minPrice, maxPrice],
    queryFn: async () => {
      const resp = await $mainApi.get("/products");
      let products = resp.data?.data || resp.data?.products || [];

      if (!Array.isArray(products)) {
        return [];
      }

      if (search) {
        const q = search.toLowerCase().trim();
        products = products.filter((item) =>
          (item.name || item.title || "").toLowerCase().includes(q)
        );
      }

      if (category) {
        const cat = category.toLowerCase().trim();
        products = products.filter((item) => {
          const itemCat = String(item.category || "").toLowerCase();
          const itemName = String(item.name || item.title || "").toLowerCase();
          return itemCat.includes(cat) || itemName.includes(cat);
        });
      }

      if (minPrice !== "" && !isNaN(minPrice)) {
        products = products.filter((item) => Number(item.price) >= Number(minPrice));
      }

      if (maxPrice !== "" && !isNaN(maxPrice)) {
        products = products.filter((item) => Number(item.price) <= Number(maxPrice));
      }

      return products;
    },
  });
};