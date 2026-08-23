import { createHmac, timingSafeEqual } from "node:crypto";

export function validateMercadoPagoSignature({
  signature,
  requestId,
  dataId,
  secret,
}: {
  signature: string | null;
  requestId: string | null;
  dataId: string | null;
  secret: string;
}) {
  if (!signature || !requestId || !dataId) return false;

  const parts = Object.fromEntries(
    signature.split(",").map((part) => part.trim().split("=")).filter(([key, value]) => key && value),
  );
  const ts = parts.ts;
  const receivedHash = parts.v1;
  if (!ts || !receivedHash || !/^[a-f0-9]{64}$/i.test(receivedHash)) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const expectedHash = createHmac("sha256", secret).update(manifest).digest("hex");
  return timingSafeEqual(Buffer.from(expectedHash, "hex"), Buffer.from(receivedHash, "hex"));
}
