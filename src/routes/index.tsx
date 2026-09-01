import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heliAsset from "@/assets/netstar-heli-pad.jpg.asset.json";
import sceneAsset from "@/assets/netstar-recovery-scene.png.asset.json";
import logoAsset from "@/assets/netstar-logo.png.asset.json";
import motorprimeAsset from "@/assets/motorprime-logo-white.png.asset.json";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netstar Vehicle Tracking from R129pm | Get a Quote" },
      {
        name: "description",
        content:
          "Netstar vehicle tracking and stolen vehicle recovery in South Africa from R129 per month. Helicopter and ground recovery teams, 24/7. Request your free quote.",
      },
      { property: "og:title", content: "Netstar Vehicle Tracking from R129pm" },
      {
        property: "og:description",
        content:
          "Air and ground recovery teams protecting South African drivers. Get your free Netstar tracking quote in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const packages = [
  {
    name: "STAR tag",
    price: "R129",
    blurb: "Our most affordable option for hi-jacking and stolen vehicle recovery.",
    features: [
      "Stolen Vehicle Recovery Service",
      "Fitment Certificate For Insurance",
      "Wireless Unit With 3 Year Battery Life",
      "MyNetstar Account Management",
      "MyNetstar Licence Renewal Alerts",
      "MyNetstar Approximate Location",
    ],
  },
  {
    name: "NETSTAR Plus",
    price: "R199",
    blurb: "Our essential tracking and recovery option with added safety.",
    features: [
      "Stolen Vehicle Recovery Service",
      "Fitment Certificate For Insurance",
      "Signal Jamming Detection Alert",
      "Jamming Resist Technology",
      "Impact Detection For Safety",
      "Battery Disconnect Alert",
      "MyNetstar Test Certificate",
      "Logbook For SARS",
      "Personal Driver Behavior Rating",
      "Car Park Jamming Alert",
      "MyNetstar Live Tracking",
      "MyNetstar Trip Replays",
      "Geofencing",
      "Extras: Panic Button",
    ],
    featured: true,
  },
  {
    name: "NETSTAR Early Warning",
    price: "R239",
    blurb:
      "Our most comprehensive vehicle tracking and recovery option with all-round protection for you and your family.",
    features: [
      "Stolen Vehicle Recovery Service",
      "Fitment Certificate For Insurance",
      "Signal Jamming Detection Alert",
      "Jamming Resist Technology",
      "Impact Detection For Safety",
      "Battery Disconnect Alert",
      "MyNetstar Test Certificate",
      "Logbook For SARS",
      "Personal Driver Behavior Rating",
      "Car Park Jamming Alert",
      "MyNetstar Live Tracking",
      "MyNetstar Trip Replays",
      "Geofencing",
      "Panic Button",
      "Auto-arm Proximity Tag For Security",
      "Early Warning Theft Alert",
      "Tow-away Alert",
      "MyNetstar Auto-arm",
    ],
  },
];

const stats = [
  { value: "90%+", label: "Recovery rate" },
  { value: "24/7", label: "Emergency call centre" },
  { value: "2m+", label: "Clients served" },
  { value: "100+", label: "Fitment centres" },
];

const testimonials = [
  {
    quote:
      "Thank you for the outstanding recovery of our fleet vehicle on 13 August 2025. Their swift response, professionalism, and constant updates gave us peace of mind. We will not hesitate to recommend your company to anyone in need of reliable vehicle tracking and recovery services.",
    name: "Ryan Gibbons",
    role: "COO, Biddulphs",
  },
  {
    quote:
      "Netstar is more than just our tracking and technology partner. What their hardware and software technology allows us to do, it's incredible and it means we can focus more on moving people safely on a daily basis.",
    name: "Jack Sekwaila",
    role: "Executive Group Operations Manager, PUTCO",
  },
  {
    quote:
      "The partnership between Netstar and Toyota South Africa is a testament to our shared commitment to conserving wildlife and protecting the environment. Toyota South Africa is proud to partner with Netstar's technology and the project is yielding stellar results as we strive to eradicate rhino poaching.",
    name: "John Thomson",
    role: "Vice President Services, Toyota South Africa",
  },
  {
    quote:
      "We really needed to partner with a technology company. We know that technology changes very quickly and we need to stay abreast. We felt that Netstar was in a growing phase, and they had some new innovation that was to follow. We are getting the benefits of it now.",
    name: "Julian Visagie",
    role: "CEO, Hertz South Africa",
  },
];

function Logo() {
  return (
    <a href="#top" className="inline-block leading-none">
      <img
        src={logoAsset.url}
        alt="Netstar vehicle tracking and recovery logo"
        width={300}
        height={120}
        className="h-11 w-auto"
      />
    </a>
  );
}

function QuoteForm() {
  const [form, setForm] = useState({ name: "", surname: "", cell: "", email: "", vehicle: "" });
  const sendLead = useServerFn(submitLead);

  const mutation = useMutation({
    mutationFn: (data: typeof form) => sendLead({ data }),
    onSuccess: () => {
      toast.success("Thank you! A Netstar consultant will call you shortly.");
      setForm({ name: "", surname: "", cell: "", email: "", vehicle: "" });
    },
    onError: (error: Error) => toast.error(error.message || "Something went wrong. Please try again."),
  });

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-brand)] sm:p-8"
    >
      <h2 className="text-2xl font-bold text-card-foreground">Get your free quote</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Packages from R129 per month. We call you back the same day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required value={form.name} onChange={set("name")} placeholder="Thabo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            required
            value={form.surname}
            onChange={set("surname")}
            placeholder="Mokoena"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cell">Cell number</Label>
          <Input
            id="cell"
            type="tel"
            required
            value={form.cell}
            onChange={set("cell")}
            placeholder="082 123 4567"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.co.za"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="vehicle">Car make and model (optional)</Label>
          <Input
            id="vehicle"
            value={form.vehicle}
            onChange={set("vehicle")}
            placeholder="Toyota Hilux 2.4 GD-6"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full text-base" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending..." : "Request my quote"}
      </Button>
      {mutation.isSuccess && (
        <p role="status" className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
          Thank you! A Netstar consultant will call you shortly.
        </p>
      )}
      {mutation.isError && (
        <p role="alert" className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
          {mutation.error?.message || "Something went wrong. Please call 087 821 6175."}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        By submitting you agree to be contacted about Netstar tracking products.
      </p>
    </form>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Toaster position="top-center" />

      <header className="bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-navy-foreground/80 sm:inline">
              Sales 087 821 6175
            </span>
            <Button asChild variant="secondary" className="bg-lime text-lime-foreground hover:bg-lime/90">
              <a href="#quote">Get a quote</a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-navy">
        <img
          src={heliAsset.url}
          alt="Netstar branded recovery helicopter on a landing pad in South Africa"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime">
              Vehicle tracking &amp; recovery
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl lg:text-6xl">
              Air and ground teams that bring your car <span className="text-lime">back</span>.
            </h1>
            <p className="mt-5 text-lg text-navy-foreground/80">
              South Africa&apos;s first vehicle tracking and recovery company. Helicopter units,
              armed response and a 24/7 control room — from R129 per month.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-lime text-lime-foreground hover:bg-lime/90">
                <a href="#quote">Get my quote from R129pm</a>
              </Button>
              <a href="tel:0878216175" className="text-sm font-semibold text-navy-foreground underline-offset-4 hover:underline">
                Or call 087 821 6175
              </a>
            </div>
          </div>
          <div id="quote" className="scroll-mt-20">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={sceneAsset.url}
            alt="Netstar helicopter and ground recovery team in action recovering a stolen vehicle in South Africa"
            width={1600}
            height={1008}
            loading="lazy"
            className="w-full rounded-2xl object-cover"
          />
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Recovery in the air, on the ground, in minutes
            </h2>
            <p className="mt-4 text-muted-foreground">
              The moment your vehicle is reported stolen, our control room dispatches the closest
              response unit. Helicopters track from above while ground teams close in on the ground —
              the combination behind a 90%+ recovery rate.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Live tracking from the Netstar app",
                "Nationwide helicopter and ground response",
                "Tow-away, jamming and tamper alerts",
                "Insurance-approved fitment at your home or office",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Packages from R129 per month</h2>
          <p className="mt-2 text-muted-foreground">Month-to-month options. No hidden fitment fees.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "brand-gradient rounded-2xl p-7 text-primary-foreground shadow-[var(--shadow-brand)]"
                    : "rounded-2xl border border-border bg-card p-7"
                }
              >
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className={p.featured ? "mt-1 text-sm text-primary-foreground/80" : "mt-1 text-sm text-muted-foreground"}>
                  {p.blurb}
                </p>
                <p className="mt-5 text-4xl font-extrabold">
                  {p.price}
                  <span className="ml-1 text-base font-medium opacity-70">pm</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className={p.featured ? "text-lime" : "text-primary"}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={
                    p.featured
                      ? "mt-7 w-full bg-lime text-lime-foreground hover:bg-lime/90"
                      : "mt-7 w-full"
                  }
                >
                  <a href="#quote">Get this quote</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-extrabold text-navy-foreground sm:text-4xl">
            Protect your vehicle today
          </h2>
          <p className="mt-3 text-navy-foreground/80">
            Fill in the form and a consultant will call you back with your tailored quote.
          </p>
          <Button asChild size="lg" className="mt-7 bg-lime text-lime-foreground hover:bg-lime/90">
            <a href="#quote">Request my quote</a>
          </Button>
        </div>
      </section>

      <footer className="bg-navy py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-navy-foreground/15 px-5 pt-8 text-sm text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-col items-start gap-1">
              <span className="font-medium text-navy-foreground/80">An Approved Netstar Partner</span>
              <img
                src={motorprimeAsset.url}
                alt="Motor Prime logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </div>
          <a href="mailto:info@getnetstar.co.za" className="hover:text-navy-foreground">
            info@getnetstar.co.za
          </a>
        </div>
      </footer>
    </div>
  );
}
