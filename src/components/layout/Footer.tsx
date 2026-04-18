import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-dark)", color: "var(--color-white)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 48px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
            Crust Bros
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, maxWidth: 260 }}>
            New York-style pizza and smash burgers made with premium ingredients. No shortcuts, just craft.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            Navigate
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: "/", label: "Home" },
              { href: "/menu", label: "Menu" },
              { href: "/#story", label: "Our Story" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 15, transition: "color 200ms" }}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
            Find Us
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
              <MapPin size={16} style={{ marginTop: 2, flexShrink: 0, color: "var(--color-accent)" }} />
              <span>742 Broadway Ave, New York, NY 10003</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
              <Phone size={16} style={{ flexShrink: 0, color: "var(--color-accent)" }} />
              <span>(212) 555-0192</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
              <Clock size={16} style={{ marginTop: 2, flexShrink: 0, color: "var(--color-accent)" }} />
              <span>Mon–Thu 11am–11pm<br />Fri–Sat 11am–1am<br />Sun 12pm–10pm</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
        © {new Date().getFullYear()} Crust Bros. All rights reserved.
      </div>
    </footer>
  );
}
