"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, CameraOff, Camera } from "lucide-react";
import { MenuItem } from "@/types";

interface ARCameraViewProps {
  item: MenuItem;
  selectedSize: string;
  onClose: () => void;
}

type CameraState = "loading" | "active" | "denied" | "unavailable";

function getDisplaySize(item: MenuItem, selectedSize: string, screenWidth: number): number {
  const PX_PER_INCH = 0.035 * screenWidth;
  const sizeObj = item.sizes?.find((s) => s.label === selectedSize);
  const inches = sizeObj?.widthInches ?? item.physicalWidthInches ?? 6;
  return Math.round(inches * PX_PER_INCH);
}

function getSizeBadge(item: MenuItem, selectedSize: string): string {
  const sizeObj = item.sizes?.find((s) => s.label === selectedSize);
  const inches = sizeObj?.widthInches ?? item.physicalWidthInches;
  const cm = inches ? Math.round(inches * 2.54) : null;
  const label = selectedSize || item.name;
  if (inches && cm) return `${label} • ${inches} in / ${cm} cm`;
  return label || item.name;
}

export default function ARCameraView({ item, selectedSize, onClose }: ARCameraViewProps) {
  const [mounted, setMounted] = useState(false);
  const [cameraState, setCameraState] = useState<CameraState>("loading");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [userScale, setUserScale] = useState(1.0);
  const [showHint, setShowHint] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(390);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  // Portal mount guard
  useEffect(() => {
    setMounted(true);
    setScreenWidth(window.innerWidth);
  }, []);

  // Screen width on resize
  useEffect(() => {
    function onResize() { setScreenWidth(window.innerWidth); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Body scroll lock + Escape key
  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = saved;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Camera initialisation
  useEffect(() => {
    let cancelled = false;
    setCameraState("loading");

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("unavailable");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        setCameraState("active");
      } catch (err) {
        if (cancelled) return;
        const name = (err as DOMException).name;
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          setCameraState("denied");
        } else {
          setCameraState("unavailable");
        }
      }
    }

    startCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [retryCount]);

  // Touch/mouse drag and pinch-to-scale
  useEffect(() => {
    if (cameraState !== "active") return;
    const el = overlayRef.current;
    if (!el) return;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastPinchDist.current = null;
      } else if (e.touches.length === 2) {
        isDragging.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist.current = Math.hypot(dx, dy);
      }
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging.current && lastTouch.current) {
        const dx = e.touches[0].clientX - lastTouch.current.x;
        const dy = e.touches[0].clientY - lastTouch.current.y;
        setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
        lastTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && lastPinchDist.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.hypot(dx, dy);
        const ratio = newDist / lastPinchDist.current;
        setUserScale((s) => Math.max(0.3, Math.min(3.0, s * ratio)));
        lastPinchDist.current = newDist;
      }
    }

    function onTouchEnd() {
      isDragging.current = false;
      lastTouch.current = null;
      lastPinchDist.current = null;
    }

    function onMouseDown(e: MouseEvent) {
      isDragging.current = true;
      lastTouch.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current) return;
      setPos((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
    }

    function onMouseUp() { isDragging.current = false; }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [cameraState]);

  // Hint auto-hide
  useEffect(() => {
    if (cameraState !== "active") return;
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, [cameraState]);

  if (!mounted) return null;

  const displaySize = getDisplaySize(item, selectedSize, screenWidth);
  const finalSize = displaySize * userScale;
  const sizeBadge = getSizeBadge(item, selectedSize);

  const content = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Loading */}
      {cameraState === "loading" && (
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.85)", color: "white", gap: 16,
          }}
        >
          <div
            style={{
              width: 48, height: 48, border: "3px solid rgba(255,255,255,0.2)",
              borderTopColor: "white", borderRadius: "50%",
              animation: "ar-spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontSize: 16, fontWeight: 600 }}>Starting camera…</p>
          <style>{`@keyframes ar-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Permission denied */}
      {cameraState === "denied" && (
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.9)", color: "white", gap: 20, padding: 32, textAlign: "center",
          }}
        >
          <CameraOff size={52} color="rgba(255,255,255,0.4)" />
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Camera Access Denied</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6, maxWidth: 300 }}>
              To use AR view, allow camera access in your browser settings, then tap Retry.
            </p>
          </div>
          <button
            onClick={() => { setCameraState("loading"); setRetryCount((c) => c + 1); }}
            style={{
              background: "var(--color-accent)", color: "white", border: "none",
              padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* No camera available */}
      {cameraState === "unavailable" && (
        <div
          style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.9)", color: "white", gap: 20, padding: 32, textAlign: "center",
          }}
        >
          <Camera size={52} color="rgba(255,255,255,0.4)" />
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Camera Not Available</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.6, maxWidth: 300 }}>
              For the best AR experience, open this page on your mobile device and point the camera at your table.
            </p>
          </div>
        </div>
      )}

      {/* AR overlay — drag/pinch area */}
      {cameraState === "active" && (
        <div
          ref={overlayRef}
          style={{
            position: "absolute", inset: 0,
            cursor: isDragging.current ? "grabbing" : "grab",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {/* Ground shadow oval */}
          <div
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y + finalSize * 0.42,
              transform: "translate(-50%, -50%)",
              width: finalSize * 0.85,
              height: finalSize * 0.22,
              background: "rgba(0,0,0,0.45)",
              borderRadius: "50%",
              filter: "blur(12px)",
              pointerEvents: "none",
            }}
          />

          {/* Food image */}
          <div
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              width: finalSize,
              height: finalSize,
              borderRadius: "50%",
              overflow: "hidden",
              filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.55))",
              pointerEvents: "none",
            }}
          >
            <div style={{ transform: "scaleY(0.88)", transformOrigin: "bottom center", width: "100%", height: "100%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Size badge — top centre */}
      {cameraState === "active" && (
        <div
          style={{
            position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
            color: "white", padding: "8px 18px", borderRadius: 100,
            fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", pointerEvents: "none",
          }}
        >
          {sizeBadge}
        </div>
      )}

      {/* Drag hint — bottom centre, auto-hides */}
      {cameraState === "active" && showHint && (
        <div
          style={{
            position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
            color: "white", padding: "8px 18px", borderRadius: 100,
            fontSize: 13, pointerEvents: "none", whiteSpace: "nowrap",
          }}
        >
          Drag to position · Pinch to resize
        </div>
      )}

      {/* Close button — top right, always visible */}
      <button
        onClick={onClose}
        aria-label="Close AR view"
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%",
          width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "white", zIndex: 10,
        }}
      >
        <X size={20} />
      </button>
    </div>
  );

  return createPortal(content, document.body);
}
