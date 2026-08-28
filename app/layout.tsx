import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "JL Automation | Automatizacion de reportes",
  description: "Checkout corporativo para el paquete profesional de automatizacion de reportes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
