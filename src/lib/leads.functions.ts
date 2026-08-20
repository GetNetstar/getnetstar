import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(80),
  surname: z.string().trim().min(1).max(80),
  cell: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(120).or(z.literal("")),
  vehicle: z.string().trim().max(120),
});

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    if (!lovableKey || !resendKey) {
      throw new Error("Email service is not configured.");
    }

    const rows: Array<[string, string]> = [
      ["Name", data.name],
      ["Surname", data.surname],
      ["Cell number", data.cell],
      ["Email", data.email || "Not provided"],
      ["Vehicle make & model", data.vehicle || "Not provided"],
      ["Source", "getnetstar.co.za quote form"],
    ];

    const html = `<h2>New Netstar quote lead</h2><table cellpadding="6" style="border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="border:1px solid #ddd"><strong>${esc(k)}</strong></td><td style="border:1px solid #ddd">${esc(v)}</td></tr>`,
      )
      .join("")}</table>`;

    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Netstar Quotes <leads@getnetstar.co.za>",
        to: ["info@motorprime.co.za"],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `New Netstar quote lead: ${data.name} ${data.surname}`,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend send failed [${response.status}]: ${body}`);
      throw new Error(
        "We could not send your request right now. Please call 0860 12 24 36 or email info@motorprime.co.za.",
      );
    }

    return { ok: true as const };
  });