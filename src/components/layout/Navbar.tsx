"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/cart";

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 400ms, box-shadow 400ms",
        background: pastHero ? "rgba(250,250,248,0.97)" : "transparent",
        backdropFilter: pastHero ? "blur(12px)" : "none",
        boxShadow: pastHero ? "0 1px 0 var(--color-border)" : "none",
      }}
    >
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "var(--color-accent)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "white",
              fontSize: 16,
              transition: "transform 200ms",
            }}
            className="group-hover:scale-105"
          >
            CB
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 20,
              color: pastHero ? "var(--color-dark)" : "white",
              letterSpacing: "-0.02em",
              transition: "color 400ms",
            }}
          >
            Crust Bros
          </span>
        </Link>

        {/* Desktop nav - center */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, justifyContent: "center" }}>
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/#story", label: "Our Story" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pastHero ? "var(--color-muted)" : "rgba(255,255,255,0.8)",
                fontWeight: 500,
                fontSize: 15,
                transition: "color 400ms",
                textDecoration: "none",
              }}
              className="hover:text-[var(--color-text)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            style={{
              background: "var(--color-accent)",
              color: "white",
              padding: "8px 20px",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 4,
              textDecoration: "none",
              transition: "background 200ms, transform 200ms",
            }}
            className="hover:bg-[var(--color-accent-hover)] active:scale-[0.98]"
          >
            Order Now
          </Link>
        </div>

        {/* Cart + mobile menu - right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={openCart}
            style={{ position: "relative", padding: 8, borderRadius: 4, background: "transparent", border: "none", cursor: "pointer" }}
            aria-label={`Cart ${count > 0 ? `(${count} items)` : ""}`}
          >
            <ShoppingBag size={22} color={pastHero ? "var(--color-dark)" : "white"} style={{ transition: "color 400ms" }} />
            {count > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  background: "var(--color-accent)",
                  color: "white",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: 8, background: "transparent", border: "none", cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-bg)",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/#story", label: "Our Story" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "var(--color-text)",
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "1px solid var(--color-border)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              marginTop: 16,
              background: "var(--color-accent)",
              color: "white",
              padding: "12px 24px",
              fontWeight: 600,
              borderRadius: 4,
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
