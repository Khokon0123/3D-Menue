import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

const cats = [
  {
    id: "pizza",
    label: "Pizzas",
    desc: "Hand-tossed NY style with San Marzano sauce",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    count: "4 items",
  },
  {
    id: "burger",
    label: "Burgers",
    desc: "Smashed to perfection on a 600° griddle",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    count: "3 items",
  },
  {
    id: "sides",
    label: "Sides",
    desc: "The perfect companion to any order",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
    count: "3 items",
  },
];

export default function Categories() {
  return (
    <section style={{ padding: "var(--section-padding) 0", background: "var(--color-bg-warm)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 }}>
              Browse the Menu
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Pick Your Category
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {cats.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 100}>
              <Link href={`/menu?category=${cat.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    cursor: "pointer",
                  }}
                  className="group"
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 500ms var(--ease-out)" }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,8,0.9) 30%, rgba(26,18,8,0.1) 100%)", transition: "opacity 300ms" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px" }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {cat.count}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 6 }}>
                      {cat.label}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>
                      {cat.desc}
                    </p>
                    <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6, color: "var(--color-accent)", fontWeight: 600, fontSize: 14 }}>
                      Explore →
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
