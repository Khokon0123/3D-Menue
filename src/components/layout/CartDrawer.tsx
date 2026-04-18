"use client";

import { useCart } from "@/store/cart";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCart();
  const cartTotal = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(26,18,8,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 80,
            }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background: "var(--color-bg)",
              zIndex: 90,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
            }}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShoppingBag size={20} color="var(--color-accent)" />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
                  Your Order
                </span>
                {items.length > 0 && (
                  <span
                    style={{
                      background: "var(--color-accent)",
                      color: "white",
                      borderRadius: 100,
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                style={{ background: "var(--color-bg-warm)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                aria-label="Close cart"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <ShoppingBag size={48} color="var(--color-border)" style={{ margin: "0 auto 16px" }} />
                  <p style={{ color: "var(--color-muted)", fontSize: 16, marginBottom: 20 }}>
                    Your cart is empty
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    style={{
                      display: "inline-block",
                      background: "var(--color-accent)",
                      color: "white",
                      padding: "10px 24px",
                      borderRadius: 4,
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: "12px",
                        background: "white",
                        borderRadius: 4,
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0, borderRadius: 4, overflow: "hidden" }}>
                        <Image src={item.image} alt={item.name} fill sizes="64px" style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "var(--color-dark)", marginBottom: 2 }}>
                          {item.name}
                        </p>
                        {item.size && (
                          <p style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 6 }}>
                            {item.size}
                          </p>
                        )}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          {/* Quantity controls */}
                          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid var(--color-border)", borderRadius: 4 }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ padding: "4px 8px", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex" }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ padding: "0 8px", fontSize: 13, fontWeight: 700 }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ padding: "4px 8px", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex" }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--color-accent)" }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", padding: 4 }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>Total</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--color-accent)" }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  style={{
                    width: "100%",
                    background: "var(--color-accent)",
                    color: "white",
                    border: "none",
                    padding: "16px",
                    borderRadius: 4,
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "background 200ms",
                  }}
                  className="hover:bg-[var(--color-accent-hover)]"
                >
                  Checkout — ${cartTotal.toFixed(2)}
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-muted)", marginTop: 10 }}>
                  Demo only — no real payment processed
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
