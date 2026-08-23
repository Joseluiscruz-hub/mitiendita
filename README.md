# Tienda de certificación — Mercado Pago Checkout Pro

Proyecto demostrativo con Next.js, TypeScript, SDK oficial de Node.js, MercadoPago.js, Wallet Brick, URLs de retorno y Webhook firmado.

## 1. Configuración local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completa `.env.local` con las credenciales de **prueba** de la aplicación del vendedor. No subas ese archivo a GitHub ni compartas el Access Token.

## 2. Prueba local

Abre `http://localhost:3000`. La creación de preferencias funciona localmente, pero Mercado Pago requiere una URL HTTPS pública para retornos y Webhooks. Despliega el proyecto antes de la prueba de certificación.

## 3. Despliegue en Vercel

1. Sube el proyecto a un repositorio privado de GitHub.
2. Impórtalo en Vercel.
3. Registra las cuatro variables de `.env.example` en Vercel.
4. Cambia `NEXT_PUBLIC_APP_URL` por la URL final, sin diagonal al final.
5. Vuelve a desplegar.

## 4. Webhook

En **Tus integraciones → Tu aplicación → Webhooks → Configurar notificaciones**:

- URL: `https://TU-DOMINIO/api/webhooks/mercadopago`
- Evento: **Pagos**
- Guarda la configuración y copia la clave secreta a `MERCADOPAGO_WEBHOOK_SECRET`.
- Vuelve a desplegar y usa **Simular** para comprobar que responde HTTP 200.

El endpoint valida `x-signature`, consulta el pago directamente en Mercado Pago y evita confiar en el contenido del Webhook. Para una tienda real, sustituye el registro de consola por almacenamiento idempotente en una base de datos.

## 5. Compra de prueba

1. Abre incógnito e inicia sesión con el **comprador de prueba**.
2. Abre la tienda desplegada y pulsa **Continuar al pago**.
3. Usa los datos de prueba indicados por Mercado Pago.
4. Comprueba el retorno y el evento en los registros del despliegue.

No uses la misma cuenta para vendedor y comprador. Un resultado visible en la URL no equivale a confirmación: el estado definitivo debe provenir del Webhook verificado.

## Checklist de certificación

- [ ] Aplicación creada con vendedor de prueba
- [ ] Credenciales de prueba configuradas
- [ ] Preferencia creada desde backend por cada pedido
- [ ] SDK MercadoPago.js inicializado con Public Key
- [ ] Wallet Brick renderizado con ID de preferencia
- [ ] URLs de éxito, pendiente y fallo configuradas
- [ ] Webhook HTTPS de Pagos configurado y firma validada
- [ ] Compra ejecutada con comprador de prueba
- [ ] Evidencias y datos solicitados enviados en la etapa final
