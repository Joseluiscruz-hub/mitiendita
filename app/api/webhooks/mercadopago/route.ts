import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";
import { validateMercadoPagoSignature } from "@/lib/webhook-signature";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ received: true });
}

export async function POST(request: Request) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!secret || !accessToken) return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });

  const url = new URL(request.url);
  const body = (await request.json().catch(() => null)) as { type?: string; data?: { id?: string | number } } | null;
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id") ?? String(body?.data?.id ?? "");
  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  if (signature && requestId) {
    const isValid = validateMercadoPagoSignature({
      signature,
      requestId,
      dataId,
      secret,
    });
    if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if ((url.searchParams.get("type") ?? body?.type) === "payment" && dataId) {
    try {
      const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
      const payment = await new Payment(client).get({ id: dataId });
      // En producción: persistir payment.id, status y external_reference de forma idempotente.
      console.info("Verified Mercado Pago payment", {
        id: payment.id,
        status: payment.status,
        externalReference: payment.external_reference,
      });
    } catch (error) {
      console.error("Payment verification failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json({ error: "Payment lookup failed" }, { status: 502 });
    }
  }

  return NextResponse.json({ received: true });
}
