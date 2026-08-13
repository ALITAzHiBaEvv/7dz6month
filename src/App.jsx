import React from "react";
import { Filters } from "./components/filters";
import { useProductStore } from "./store/products-store";

function App() {
  const { data: products = [], isLoading, isError } = useProductStore();

  const capImage = "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80";
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px", margin: "0 0 4px 0" }}>
              Geeks Shop
            </h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Каталог актуальных товаров
            </p>
          </div>
        </header>
        
        <div style={{ 
          background: "#ffffff", 
          padding: "20px", 
          borderRadius: "16px", 
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0", 
          marginBottom: "32px" 
        }}>
          <Filters />
        </div>

        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b", fontSize: "16px", fontWeight: "500" }}>
            Загрузка товаров...
          </div>
        )}

        {isError && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#ef4444", fontSize: "16px", fontWeight: "500" }}>
            Ошибка при загрузке данных
          </div>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <div style={{ 
            background: "#ffffff",
            borderRadius: "16px",
            padding: "60px 20px", 
            color: "#64748b", 
            textAlign: "center",
            border: "1px solid #e2e8f0"
          }}>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>Товары по вашему запросу не найдены.</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#94a3b8" }}>Попробуйте изменить параметры фильтрации</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "24px" }}>
          {products.map((item, index) => {
            const name = item.name || item.title || "";
            const isCap = name.toLowerCase().includes("кепка");
            const imageUrl = isCap ? capImage : (item.image || fallbackImage);

            return (
              <div 
                key={item._id || item.id || index} 
                style={{ 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "16px", 
                  padding: "20px", 
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  transition: "all 0.25s ease-in-out",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px -4px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div style={{ 
                  width: "100%", 
                  height: "200px", 
                  marginBottom: "16px", 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  background: "#f1f5f9", 
                  display: "flex", 
                  alignItems: "center", 
                  justify: "center",
                  padding: "12px"
                }}>
                  <img 
                    src={imageUrl} 
                    alt={name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                </div>

                <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 6px 0", color: "#0f172a", lineHeight: "1.3" }}>
                      {name}
                    </h3>
                    {item.description && (
                      <p style={{ 
                        fontSize: "13px", 
                        color: "#64748b", 
                        margin: "0 0 16px 0",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: "1.4"
                      }}>
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justify: "space-between", 
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid #f1f5f9"
                  }}>
                    <span style={{ fontWeight: "800", fontSize: "20px", color: "#10b981" }}>
                      {item.price.toLocaleString()} сом
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;