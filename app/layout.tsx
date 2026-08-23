import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "JL Automation Store | Checkout Pro",
  description: "Integración demostrativa de Checkout Pro para certificación.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
