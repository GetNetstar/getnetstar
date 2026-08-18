import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1).max(80),
  surname: z.string().min(1).max(80),
  cell: z.string().min(6).max(25),
  email: z.string().email().max(120).optional().or(z.literal("")),
  vehicle: z.string().max(120).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

const FALLBACK_MESSAGE =
  "We could not send your request right now. Please call 0860 12 24 36 or email info@motorprime.co.za.";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const fields: Record<string, string> = {
      _subject: `New Netstar quote lead: ${data.name} ${data.surname}`,
      _template: "table",
      _captcha: "false",
      Name: data.name,
      Surname: data.surname,
      "Cell Number": data.cell,
      Email: data.email || "Not provided",
      "Vehicle Make & Model": data.vehicle || "Not provided",
      Source: "Netstar quote landing page",
    };

    const baseHeaders = {
      // FormSubmit rejects requests without a web origin/referer.
      Origin: "https://getnetstar.lovable.app",
      Referer: "https://getnetstar.lovable.app/",
    };

    // 1) AJAX endpoint (JSON response). 2) Classic form-encoded endpoint as fallback.
    const attempt = async (mode: "ajax" | "form") => {
      if (mode === "ajax") {
        const res = await fetch("https://formsubmit.co/ajax/info@motorprime.co.za", {
          method: "POST",
          headers: { ...baseHeaders, "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(fields),
        });
        const text = await res.text();
        if (!res.ok) return { ok: false, info: `ajax ${res.status}: ${text.slice(0, 200)}` };
        const parsed = (() => {
          try {
            return JSON.parse(text) as { success?: string | boolean; message?: string };
          } catch {
            return {} as { success?: string | boolean; message?: string };
          }
        })();
        if (parsed.success === "false" || parsed.success === false) {
          return { ok: false, info: `ajax rejected: ${parsed.message ?? text.slice(0, 200)}` };
        }
        return { ok: true, info: "" };
      }

      const body = new URLSearchParams(fields).toString();
      const res = await fetch("https://formsubmit.co/info@motorprime.co.za", {
        method: "POST",
        headers: { ...baseHeaders, "Content-Type": "application/x-www-form-urlencoded" },
        body,
        redirect: "follow",
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, info: `form ${res.status}: ${text.slice(0, 200)}` };
      }
      return { ok: true, info: "" };
    };
    const plan: Array<{ mode: "ajax" | "form"; waitBefore: number }> = [
      { mode: "ajax", waitBefore: 0 },
      { mode: "form", waitBefore: 800 },
      { mode: "ajax", waitBefore: 2500 },
      { mode: "form", waitBefore: 4000 },
    ];

    let lastInfo = "unknown";
    for (const step of plan) {
      if (step.waitBefore) await sleep(step.waitBefore);
      try {
        const result = await attempt(step.mode);
        if (result.ok) return { ok: true as const };
        lastInfo = result.info;
      } catch (error) {
        lastInfo = `${step.mode} threw: ${(error as Error).message}`;
      }
      console.error(`Lead email attempt failed (${step.mode}): ${lastInfo}`);
    }

    console.error(`Lead email failed after retries: ${lastInfo}`);
    throw new Error(FALLBACK_MESSAGE);
  });