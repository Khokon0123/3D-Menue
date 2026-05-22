"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Camera } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import ARCameraView from "./ARCameraView";

interface ItemModalProps {
  item: MenuItem;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.label ?? "");
  const [quantity, setQuantity] = useState(1);
  const [showAR, setShowAR] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const currentPrice = item.sizes
    ? item.sizes.find((s) => s.label === selectedSize)?.price ?? item.price
    : item.price;

  const total = (currentPrice * quantity).toFixed(2);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addItem({
      id: `${item.id}-${selectedSize}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: currentPrice,
      quantity,
      size: selectedSize || undefined,
      image: item.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="item-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26,18,8,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="item-modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            background: "var(--color-bg)",
            borderRadius: 8,
            width: "100%",
            maxWidth: 880,
            maxHeight: "90vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", flex: 1, overflow: "hidden" }} className="flex-col md:flex-row">
            {/* Left — image */}
            <div
              style={{
                position: "relative",
                flex: "0 0 45%",
                minHeight: 320,
                background: "var(--color-dark)",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,8,0.5) 0%, transparent 60%)" }} />

              {/* AR View button */}
              <button
                onClick={() => setShowAR(true)}
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(26,18,8,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "background 200ms",
                }}
              >
                <Camera size={14} /> View in Your Space
              </button>
            </div>

            {/* Right — details */}
            <div style={{ flex: 1, padding: "32px 28px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
              {/* Close button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "var(--color-bg-warm)",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Category + Badge */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-muted)" }}>
                  {item.category}
                </span>
                {item.badge && (
                  <span style={{ background: "var(--color-accent-light)", color: "var(--color-accent)", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, letterSpacing: "0.04em" }}>
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Name + Price */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-dark)", lineHeight: 1.1, marginBottom: 8 }}>
                  {item.name}
                </h2>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--color-accent)" }}>
                  ${currentPrice.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: "var(--color-muted)", fontSize: 15, lineHeight: 1.7 }}>
                {item.description}
              </p>

              {/* Size selector */}
              {item.sizes && item.sizes.length > 0 && (
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: "var(--color-dark)" }}>
                    Size
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {item.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size.label)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 4,
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 200ms",
                          border: "1px solid",
                          borderColor: selectedSize === size.label ? "var(--color-accent)" : "var(--color-border)",
                          background: selectedSize === size.label ? "var(--color-accent-light)" : "transparent",
                          color: selectedSize === size.label ? "var(--color-accent)" : "var(--color-muted)",
                        }}
                      >
                        {size.label}
                        <span style={{ display: "block", fontSize: 12, marginTop: 2, fontWeight: 700 }}>
                          ${size.price.toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: "var(--color-dark)" }}>
                  Quantity
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid var(--color-border)", borderRadius: 4, width: "fit-content" }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex" }}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ padding: "0 16px", fontWeight: 700, fontSize: 16, minWidth: 40, textAlign: "center", color: "var(--color-dark)" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ padding: "10px 14px", background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex" }}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  marginTop: "auto",
                  background: addedToCart ? "#22c55e" : "var(--color-accent)",
                  color: "white",
                  border: "none",
                  padding: "16px 24px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background 200ms, transform 200ms",
                  width: "100%",
                }}
                className="active:scale-[0.98]"
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <ShoppingBag size={18} />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </span>
                <span>${total}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* AR camera overlay */}
      {showAR && (
        <ARCameraView
          key="ar-camera-view"
          item={item}
          selectedSize={selectedSize}
          onClose={() => setShowAR(false)}
        />
      )}
    </AnimatePresence>
  );
}
