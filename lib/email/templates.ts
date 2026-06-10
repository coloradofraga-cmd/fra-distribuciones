import { formatPrice } from "@/lib/supabase/types";

interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
}

interface ClientEmailProps {
  name: string;
  orderIdShort: string;
  total: number;
}

interface AdminEmailProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  orderIdShort: string;
  total: number;
  items: OrderItem[];
}

export function clientConfirmationEmail({ name, orderIdShort, total }: ClientEmailProps): string {
  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #fff8f5;">
      <div style="background: #00362e; border-radius: 16px; padding: 28px 24px; text-align: center; margin-bottom: 24px;">
        <div style="font-size: 40px; margin-bottom: 8px;">✅</div>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0;">¡Pedido recibido!</h1>
      </div>

      <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e8e0db;">
        <p style="color: #1a1a1a; font-size: 16px; margin: 0 0 16px;">Hola <strong>${name}</strong> 👋</p>
        <p style="color: #555; font-size: 15px; margin: 0 0 20px;">
          Recibimos tu pedido <strong>#${orderIdShort}</strong> por un total de
          <strong style="color: #00362e;">${formatPrice(total)}</strong>.
        </p>
        <div style="background: #f0faf5; border-radius: 12px; padding: 16px; border-left: 4px solid #00A86B; margin-bottom: 20px;">
          <p style="color: #1a1a1a; font-size: 14px; margin: 0;">
            📦 Nos comunicaremos pronto para coordinar la entrega.
          </p>
        </div>
        <p style="color: #888; font-size: 13px; margin: 0;">
          ¿Dudas? Respondé este email o escribinos directamente.
        </p>
      </div>

      <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">
        — Equipo FRA Distribuciones 🌿
      </p>
    </div>
  `;
}

export function adminNewOrderEmail({ name, email, phone, address, orderIdShort, total, items }: AdminEmailProps): string {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px 0; color: #333; font-size: 14px;">${item.name}</td>
        <td style="padding: 8px 0; color: #555; font-size: 14px; text-align: center;">×${item.quantity}</td>
        <td style="padding: 8px 0; color: #00362e; font-size: 14px; text-align: right; font-weight: 600;">${formatPrice(item.unit_price * item.quantity)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #fff8f5;">
      <div style="background: #00362e; border-radius: 16px; padding: 28px 24px; text-align: center; margin-bottom: 24px;">
        <div style="font-size: 40px; margin-bottom: 8px;">🛒</div>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Nuevo pedido #${orderIdShort}</h1>
      </div>

      <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e8e0db; margin-bottom: 16px;">
        <h2 style="color: #00362e; font-size: 15px; margin: 0 0 16px;">👤 Datos del cliente</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #888; font-size: 13px; width: 80px;">Nombre</td><td style="color: #1a1a1a; font-size: 14px; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 4px 0; color: #888; font-size: 13px;">Email</td><td style="color: #1a1a1a; font-size: 14px;">${email}</td></tr>
          <tr><td style="padding: 4px 0; color: #888; font-size: 13px;">Teléfono</td><td style="color: #1a1a1a; font-size: 14px;">${phone}</td></tr>
          <tr><td style="padding: 4px 0; color: #888; font-size: 13px;">Dirección</td><td style="color: #1a1a1a; font-size: 14px;">${address}</td></tr>
        </table>
      </div>

      <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e8e0db;">
        <h2 style="color: #00362e; font-size: 15px; margin: 0 0 16px;">📦 Productos</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemsHtml}
          <tr style="border-top: 2px solid #e8e0db;">
            <td colspan="2" style="padding: 12px 0 0; font-weight: 700; font-size: 15px; color: #1a1a1a;">Total</td>
            <td style="padding: 12px 0 0; text-align: right; font-weight: 800; font-size: 17px; color: #00362e;">${formatPrice(total)}</td>
          </tr>
        </table>
      </div>

      <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">
        FRA Distribuciones — Panel Admin 🌿
      </p>
    </div>
  `;
}
