"use client";

import { menuItems } from "@/lib/menu-data";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

const featured = menuItems.filter((item) => item.popular).slice(0, 3);

export default function FeaturedItems() {
  return (
    <section style={{ padding: "var(--section-padding) 0", background: "var(--color-bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        {/* Header */}
        <ScrollReveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 }}>
                Fan Favorites
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Most Ordered
              </h2>
            </div>
            <Link
              href="/menu"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-accent)", fontWeight: 600, fontSize: 15, textDecoration: "none" }}
              className="hover:gap-3 transition-all"
            >
              View full menu <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featured.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <Link href={`/menu?item=${item.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    background: "white",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    transition: "transform 300ms var(--ease-out), box-shadow 300ms",
                  }}
                  className="group hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 400ms var(--ease-out)" }}
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
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 20px 24px" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-dark)", marginBottom: 6 }}>
                      {item.name}
                    </h3>
                    <p style={{ color: "var(--color-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-accent)" }}>
                        ${item.price.toFixed(2)}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 600 }}>
                        Order →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
