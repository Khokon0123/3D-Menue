"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { menuItems, categories } from "@/lib/menu-data";
import { MenuItem } from "@/types";
import ItemModal from "@/components/ui/ItemModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ShoppingBag } from "lucide-react";

export default function MenuPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);

    const itemId = searchParams.get("item");
    if (itemId) {
      const item = menuItems.find((m) => m.id === itemId);
      if (item) setSelectedItem(item);
    }
  }, [searchParams]);

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    router.push(`/menu?item=${item.id}`, { scroll: false });
  };

  const handleCloseItem = () => {
    setSelectedItem(null);
    router.push("/menu", { scroll: false });
  };

  return (
    <>
      {/* Page Header */}
      <div
        style={{
          background: "var(--color-dark)",
          paddingTop: 120,
          paddingBottom: 64,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>
            What We Serve
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Our Menu
          </h1>
        </div>
      </div>

      <section style={{ padding: "var(--section-padding) 0", background: "var(--color-bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 48,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px solid",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 200ms",
                  background: activeCategory === cat.id ? "var(--color-accent)" : "transparent",
                  borderColor: activeCategory === cat.id ? "var(--color-accent)" : "var(--color-border)",
                  color: activeCategory === cat.id ? "white" : "var(--color-muted)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 60}>
                <button
                  onClick={() => handleOpenItem(item)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                      transition: "transform 300ms, box-shadow 300ms",
                    }}
                    className="group hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover", transition: "transform 400ms" }}
                        className="group-hover:scale-105"
                      />
                      {item.badge && (
                        <span
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: "var(--color-accent)",
                            color: "white",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 100,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {/* Hover overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(26,18,8,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 300ms",
                        }}
                        className="group-hover:opacity-100"
                      >
                        <span style={{ color: "white", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                          <ShoppingBag size={16} /> Quick View
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: "18px 20px 22px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-muted)", marginBottom: 6 }}>
                        {item.category}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "var(--color-dark)", marginBottom: 6 }}>
                        {item.name}
                      </h3>
                      <p style={{ color: "var(--color-muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.description}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-accent)" }}>
                          from ${item.price.toFixed(2)}
                        </span>
                        <span
                          style={{
                            background: "var(--color-accent)",
                            color: "white",
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "6px 12px",
                            borderRadius: 4,
                          }}
                        >
                          Add +
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseItem} />
      )}
    </>
  );
}
