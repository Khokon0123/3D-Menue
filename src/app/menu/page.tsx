import { Suspense } from "react";
import MenuPageClient from "./MenuPageClient";

export const metadata = {
  title: "Menu — Crust Bros",
  description: "Browse our full menu of NY-style pizzas, smash burgers, and sides.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--color-bg)" }} />}>
      <MenuPageClient />
    </Suspense>
  );
}
