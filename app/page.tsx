import CheckoutCard from "@/components/checkout-card";

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <span className="brand">JL<span>•</span>Automation</span>
        <span className="secure">Pago protegido por Mercado Pago</span>
      </nav>

      <section className="hero">
        <div className="copy">
          <span className="eyebrow">SOLUCIONES PARA EMPRESAS</span>
          <h1>Automatiza tu operación, no tu estrés.</h1>
          <p>Paquete demostrativo de automatización de reportes con entrega digital y soporte de implementación.</p>
          <div className="features">
            <span>✓ Integración segura</span>
            <span>✓ Entrega digital</span>
            <span>✓ Soporte incluido</span>
          </div>
        </div>
        <CheckoutCard />
      </section>

      <footer>Integración demostrativa para certificación Checkout Pro · México</footer>
    </main>
  );
}
