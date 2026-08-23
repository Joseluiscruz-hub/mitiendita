type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const messages = {
  approved: { icon: "✓", title: "Pago aprobado", detail: "Mercado Pago procesó la operación correctamente." },
  pending: { icon: "…", title: "Pago pendiente", detail: "La operación está en revisión o espera confirmación." },
  failure: { icon: "!", title: "Pago no completado", detail: "Puedes volver e intentarlo con otro medio de pago." },
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const status = typeof params.status === "string" && params.status in messages ? params.status as keyof typeof messages : "failure";
  const message = messages[status];
  return (
    <main className="result-shell">
      <section className={`result ${status}`}>
        <span className="result-icon">{message.icon}</span>
        <p className="label">RESULTADO DEL CHECKOUT</p>
        <h1>{message.title}</h1>
        <p>{message.detail}</p>
        <a href="/">Volver a la tienda</a>
        <small>El estado definitivo se confirma en el servidor mediante Webhook.</small>
      </section>
    </main>
  );
}
