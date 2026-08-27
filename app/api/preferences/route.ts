import { randomUUID } from "node:crypto";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
    if (!accessToken || !appUrl) {
      return NextResponse.json({ error: "Configuración incompleta del servidor" }, { status: 500 });
    }

    const body = (await request.json().catch(() => ({}))) as { quantity?: unknown };
    const quantity = Number(body.quantity ?? 1);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: "Cantidad inválida" }, { status: 400 });
    }

    const orderId = `ORDER-${Date.now()}-${randomUUID().slice(0, 8)}`;
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
    const preference = await new Preference(client).create({
      body: {
        items: [{
          id: "AUTO-REPORT-001",
          title: "Automatización de reportes",
          description: "Paquete demostrativo de automatización profesional",
          category_id: "services",
          currency_id: "MXN",
          quantity,
          unit_price: 10,
        }],
        external_reference: orderId,
        integration_data: {
          integrator_id: process.env.MERCADOPAGO_INTEGRATOR_ID,
        },
        back_urls: {
          success: `${appUrl}/resultado?status=approved`,
          pending: `${appUrl}/resultado?status=pending`,
          failure: `${appUrl}/resultado?status=failure`,
        },
        auto_return: "approved",
        statement_descriptor: "JL AUTOMATION",
        metadata: { order_id: orderId, integration: "checkout-pro-certification" },
      } as any,
      requestOptions: { idempotencyKey: randomUUID() },
    });

    return NextResponse.json({ preferenceId: preference.id, orderId });
  } catch (error) {
    console.error("Preference creation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Mercado Pago no pudo crear la preferencia" }, { status: 502 });
  }
}
