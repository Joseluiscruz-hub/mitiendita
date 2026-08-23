# Tienda de certificación — Mercado Pago Checkout Pro

Proyecto demostrativo con Next.js, TypeScript, SDK oficial de Node.js, MercadoPago.js, Wallet Brick, URLs de retorno y Webhook firmado.

## 1. Configuración local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Completa `.env.local` con las credenciales del entorno que vayas a usar. Para pruebas locales puedes usar credenciales de prueba; para Vercel debes cargar las variables de producción en el panel del proyecto. No subas ese archivo a GitHub ni guardes tokens en el repo.

## 2. Prueba local

Abre `http://localhost:3000`. La creación de preferencias funciona localmente, pero Mercado Pago requiere una URL HTTPS pública para retornos y Webhooks. Despliega el proyecto antes de la prueba de certificación.

## 3. Despliegue en Vercel

1. Importa este repositorio en Vercel.
2. Agrega en **Project Settings → Environment Variables** las claves de `.env.example`.
3. Define `NEXT_PUBLIC_APP_URL` con la URL pública final de Vercel, sin diagonal al final.
4. Carga las variables de producción en **Production** y, si haces pruebas previas, también en **Preview**.
5. Despliega de nuevo para que el build tome esas variables.

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

## 6. Variables de entorno

Mantén estos nombres en `.env.local` y en Vercel:

- `MERCADOPAGO_ACCESS_TOKEN`
- `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
- `MERCADOPAGO_INTEGRATOR_ID`
- `NEXT_PUBLIC_APP_URL`
- `MERCADOPAGO_WEBHOOK_SECRET`

No guardes `VERCEL_TOKEN` dentro del proyecto; úsalo solo en la sesión de terminal cuando despliegues desde la CLI.

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
