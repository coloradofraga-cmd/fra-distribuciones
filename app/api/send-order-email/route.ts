import { Resend } from "resend";
import { NextResponse } from "next/server";
import { clientConfirmationEmail, adminNewOrderEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { orderId, orderIdShort, total, name, address, phone, userEmail, items } = await req.json();

    await Promise.all([
      resend.emails.send({
        from: "FRA Distribuciones <onboarding@resend.dev>",
        to: userEmail,
        subject: `✅ Tu pedido #${orderIdShort} fue recibido`,
        html: clientConfirmationEmail({ name, orderIdShort, total }),
      }),
      resend.emails.send({
        from: "FRA Distribuciones <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL!,
        subject: `🛒 Nuevo pedido #${orderIdShort} — ${name}`,
        html: adminNewOrderEmail({ name, email: userEmail, phone, address, orderIdShort, total, items }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
