"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type MercadoPagoInstance = {
  bricks: () => {
    create: (type: "wallet", container: string, settings: { initialization: { preferenceId: string } }) => Promise<{ unmount: () => void }>;
  };
};

declare global {
  interface Window {
    MercadoPago?: new (publicKey: string, options?: { locale?: string }) => MercadoPagoInstance;
  }
}

export default function CheckoutCard() {
  const [preferenceId, setPreferenceId] = useState<string>();
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);

  async function prepareCheckout() {
    setLoading(true);
    setError(undefined);
    controller.current?.abort();
    controller.current = new AbortController();

    try {
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
        signal: controller.current.signal,
      });
      const data = (await response.json()) as { preferenceId?: string; error?: string };
      if (!response.ok || !data.preferenceId) throw new Error(data.error ?? "No se pudo iniciar el pago");
      setPreferenceId(data.preferenceId);
    } catch (cause) {
      if ((cause as Error).name !== "AbortError") setError((cause as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => () => controller.current?.abort(), []);

  useEffect(() => {
    if (!preferenceId || !sdkReady || !window.MercadoPago) return;
    const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
    if (!publicKey) {
      setError("Falta NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY");
      return;
    }

    let active = true;
    let brick: { unmount: () => void } | undefined;
    const mp = new window.MercadoPago(publicKey, { locale: "es-MX" });
    mp.bricks().create("wallet", "walletBrick_container", { initialization: { preferenceId } })
      .then((instance) => { if (active) brick = instance; else instance.unmount(); })
      .catch(() => setError("No se pudo mostrar el botón de Mercado Pago"));

    return () => { active = false; brick?.unmount(); };
  }, [preferenceId, sdkReady]);

  return (
    <article className="checkout-card">
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive" onLoad={() => setSdkReady(true)} />
      <div className="product-icon">⚡</div>
      <p className="label">PAQUETE PROFESIONAL</p>
      <h2>Automatización de reportes</h2>
      <p className="description">Configuración inicial, reporte automatizado y acompañamiento técnico.</p>
      <div className="price"><small>MXN</small> $10.00</div>
      {!preferenceId && (
        <button className="prepare" onClick={prepareCheckout} disabled={loading}>
          {loading ? "Preparando pago…" : "Continuar al pago"}
        </button>
      )}
      <div id="walletBrick_container" aria-live="polite" />
      {error && <p className="error" role="alert">{error}</p>}
      <p className="fineprint">Serás redirigido a Mercado Pago para completar la operación.</p>
    </article>
  );
}
