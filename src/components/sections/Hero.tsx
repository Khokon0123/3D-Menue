"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: "var(--color-dark)",
      }}
    >
      {/* Parallax background image */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: "url(/images/radhuni.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(26,18,8,0.95) 40%, rgba(26,18,8,0.5) 100%)",
        }}
      />

      {/* Warm glow */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 500,
          height: 500,
          background: "var(--color-accent)",
          borderRadius: "50%",
          opacity: 0.07,
          filter: "blur(80px)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "96px 48px 64px", width: "100%" }}>
        <div style={{ maxWidth: 640 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(232,98,26,0.15)",
              border: "1px solid rgba(232,98,26,0.3)",
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 24,
            }}
          >
            <Star size={12} fill="var(--color-accent)" color="var(--color-accent)" />
            <span style={{ color: "var(--color-accent)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
              New York Since 2018
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Pizza & Burgers
            <br />
            <span style={{ color: "var(--color-accent)" }}>Done Right.</span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            Hand-tossed NY pies and smash burgers built with premium ingredients.
            No shortcuts. No compromises. Just food worth coming back for.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--color-accent)",
                color: "white",
                padding: "14px 28px",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 4,
                textDecoration: "none",
                transition: "background 200ms, transform 200ms",
              }}
              className="hover:bg-[var(--color-accent-hover)] active:scale-[0.98]"
            >
              Order Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/#story"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                padding: "14px 28px",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 4,
                textDecoration: "none",
                transition: "border-color 200ms, color 200ms",
              }}
              className="hover:border-white hover:text-white"
            >
              Our Story
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
            {[
              { value: "4.9★", label: "Google Rating" },
              { value: "12K+", label: "Orders Served" },
              { value: "6 Yrs", label: "In Business" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "white" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to bottom, transparent, var(--color-bg))",
        }}
      />
    </section>
  );
}
