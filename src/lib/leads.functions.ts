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

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch("https://formsubmit.co/ajax/info@motorprime.co.za", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New Netstar quote lead: ${data.name} ${data.surname}`,
        _template: "table",
        _captcha: "false",
        Name: data.name,
        Surname: data.surname,
        "Cell Number": data.cell,
        Email: data.email || "Not provided",
        "Vehicle Make & Model": data.vehicle || "Not provided",
        Source: "Netstar quote landing page",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Lead email failed [${res.status}]: ${body}`);
      throw new Error("We could not send your request right now. Please call us instead.");
    }

    return { ok: true as const };
  });