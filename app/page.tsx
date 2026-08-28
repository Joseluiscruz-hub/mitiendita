import Image from "next/image";
import CheckoutCard from "@/components/checkout-card";

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="topbar" aria-label="Principal">
        <a className="brand" href="/" aria-label="JL Automation">
          <span className="brand-mark">JL</span>
          <span>
            <strong>JL Automation</strong>
            <small>Business operations</small>
          </span>
        </a>
        <div className="topbar-actions" aria-label="Indicadores de confianza">
          <span>Checkout Pro</span>
          <span>Pago protegido</span>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="copy">
            <span className="eyebrow">SOLUCIONES CORPORATIVAS</span>
            <h1 id="hero-title">Automatización de reportes</h1>
            <p>
              Implementación profesional para transformar reportes manuales en flujos
              digitales confiables, con entrega documentada y acompañamiento técnico.
            </p>
          </div>

          <div className="proof-grid" aria-label="Resumen del servicio">
            <div className="proof-item">
              <span className="proof-kicker">Entrega</span>
              <strong>Digital</strong>
            </div>
            <div className="proof-item">
              <span className="proof-kicker">Soporte</span>
              <strong>Incluido</strong>
            </div>
            <div className="proof-item">
              <span className="proof-kicker">Operación</span>
              <strong>Segura</strong>
            </div>
          </div>

          <figure className="dashboard-preview">
            <Image
              src="/assets/automation-dashboard.png"
              alt="Vista previa abstracta de un tablero corporativo de reportes automatizados"
              width={1800}
              height={960}
              priority
            />
          </figure>
        </div>

        <aside className="checkout-panel" aria-label="Resumen de compra">
          <CheckoutCard />
        </aside>
      </section>

      <section className="process-band" aria-label="Alcance del paquete">
        <div className="process-item">
          <span>01</span>
          <div>
            <h2>Diagnóstico operativo</h2>
            <p>Revisión del reporte base, frecuencia, responsables y datos de entrada.</p>
          </div>
        </div>
        <div className="process-item">
          <span>02</span>
          <div>
            <h2>Configuración automatizada</h2>
            <p>Preparación del flujo digital para reducir captura manual y reprocesos.</p>
          </div>
        </div>
        <div className="process-item">
          <span>03</span>
          <div>
            <h2>Entrega y acompañamiento</h2>
            <p>Validación del resultado, documentación breve y soporte de implementación.</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>JL Automation</span>
        <span>Integración Checkout Pro · México</span>
      </footer>
    </main>
  );
}
