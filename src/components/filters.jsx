import React from "react";
import { useFilters } from "../hooks/use-filters";

export const Filters = () => {
  const { 
    search, 
    category, 
    minPrice, 
    maxPrice, 
    setSearch, 
    setCategory, 
    setMinPrice, 
    setMaxPrice, 
    resetFilters 
  } = useFilters();

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  };

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...inputStyle, width: "200px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer", backgroundColor: "#fff" }}
      >
        <option value="">Все категории</option>
        <option value="Apple">Электроника</option>
        <option value="Кепка">Одежда</option>
        <option value="Flip-flops">Обувь</option>
      </select>

      <input
        type="number"
        placeholder="Цена от"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ ...inputStyle, width: "100px" }}
      />

      <input
        type="number"
        placeholder="Цена до"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ ...inputStyle, width: "100px" }}
      />

      {(search || category || minPrice || maxPrice) && (
        <button
          onClick={resetFilters}
          style={{
            padding: "8px 14px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}
        >
          Сбросить
        </button>
      )}
    </div>
  );
};