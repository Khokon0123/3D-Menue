import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export default function OurStory() {
  return (
    <section id="story" style={{ background: "var(--color-dark)", padding: "var(--section-padding) 0", position: "relative", overflow: "hidden" }}>
      {/* Warm glow */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "var(--color-accent)", borderRadius: "50%", opacity: 0.05, filter: "blur(80px)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Text */}
        <ScrollReveal direction="left">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, color: "white", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Born in Brooklyn,
            <br />Raised on Craft.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
            It started with a 48-hour fermented dough recipe and a secondhand pizza oven. In 2018, two brothers from Brooklyn decided the city deserved better — pizza made with actual care, and burgers that didn't cut corners.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
            Every item on our menu is a decision: the right flour, the right technique, the right ingredients. We believe fast food doesn't have to mean forgettable food.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { value: "48h", label: "Dough Ferment" },
              { value: "100%", label: "Fresh Ingredients" },
              { value: "0", label: "Shortcuts Taken" },
            ].map((stat) => (
              <div key={stat.label} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--color-accent)" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Image */}
        <ScrollReveal direction="right">
          <div style={{ position: "relative", borderRadius: 4, overflow: "hidden", aspectRatio: "4/5" }}>
            <Image
              src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80"
              alt="Pizza being made in our kitchen"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,8,0.6) 0%, transparent 50%)" }} />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                background: "rgba(26,18,8,0.7)",
                backdropFilter: "blur(10px)",
                borderRadius: 4,
                padding: "16px 20px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p style={{ color: "white", fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: 16, lineHeight: 1.5 }}>
                "We don't make pizza fast. We make fast pizza taste slow-cooked."
              </p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 8 }}>
                — Marcus & Leo, Founders
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
