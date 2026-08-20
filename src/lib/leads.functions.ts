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

const SITE = "https://getnetstar.lovable.app";
const NETSTAR_LOGO = `${SITE}/__l5e/assets-v1/8a8cbf31-964c-41f1-b0f8-52cb1aeb9eb1/netstar-logo.png`;
const MOTORPRIME_LOGO = `${SITE}/__l5e/assets-v1/71232c56-8021-4b7a-9b5b-25db094ee4f1/motorprime-logo-white.png`;

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

    const tableRows = rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:12px 16px;border-bottom:1px solid #e6e8ec;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;width:42%">${esc(k)}</td><td style="padding:12px 16px;border-bottom:1px solid #e6e8ec;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0b1533;font-weight:bold">${esc(v)}</td></tr>`,
      )
      .join("");

    const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f4f5f7">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden">
  <tr><td style="background:#0b1533;padding:24px 28px" align="left">
    <img src="${NETSTAR_LOGO}" alt="Netstar" width="170" style="display:block;border:0;height:auto" />
  </td></tr>
  <tr><td style="height:5px;background:#8ac800"></td></tr>
  <tr><td style="padding:28px">
    <h1 style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#0b1533">New Netstar Quote Request</h1>
    <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b7280">${esc(data.name)} ${esc(data.surname)} requested a quote on getnetstar.co.za.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e8ec;border-radius:10px;border-collapse:separate">${tableRows}</table>
    <p style="margin:22px 0 0"><a href="tel:${esc(data.cell.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#8ac800;color:#0b1533;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:8px">Call ${esc(data.name)}</a></p>
  </td></tr>
  <tr><td style="background:#0b1533;padding:24px 28px" align="center">
    <img src="${MOTORPRIME_LOGO}" alt="Motor Prime" width="200" style="display:block;border:0;height:auto;margin:0 auto 10px" />
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ffffff;letter-spacing:.04em">An Approved Netstar Partner</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

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
        subject: `New Netstar Quote Request: ${data.name} ${data.surname}`,
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