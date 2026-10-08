import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const heliAsset = { url: "/images/netstar-recovery-team.jpg" };
const sceneAsset = { url: "/images/motorprime-recovery.jpg" };
const logoAsset = { url: "/images/netstar-logo.png" };
const motorprimeAsset = { url: "/images/motorprime-logo.webp" };
const motorprimeWhiteAsset = { url: "/images/motorprime-logo-white.webp" };
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netstar Tracker from R129pm | GPS Tracker & Car Track SA" },
      {
        name: "description",
        content:
          "Get a Netstar tracker fitted from R129 per month. GPS tracker and car track packages with helicopter and ground stolen vehicle recovery, 24/7 in South Africa.",
      },
      { name: "keywords", content: "Netstar, tracker, GPS tracker, car track, vehicle tracking South Africa" },
      { property: "og:title", content: "Netstar Tracker from R129pm | GPS Tracker & Car Track" },
      {
        property: "og:description",
        content:
          "Netstar GPS tracker packages from R129pm. Air and ground recovery teams protecting South African drivers. Get your free car track quote.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getnetstar.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Netstar Tracker from R129pm | GPS Tracker & Car Track" },
      {
        name: "twitter:description",
        content:
          "Netstar GPS tracker packages from R129pm with 24/7 stolen vehicle recovery in South Africa.",
      },
    ],
    links: [{ rel: "canonical", href: "https://getnetstar.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://getnetstar.lovable.app/#organization",
              name: "Get Netstar - Approved Netstar Partner",
              alternateName: "Motor Prime Netstar Sales Partner",
              url: "https://getnetstar.lovable.app/",
              logo: "https://getnetstar.lovable.app/images/netstar-logo.png",
              description:
                "Approved Netstar partner supplying GPS tracker and car track fitment, stolen vehicle recovery and fleet tracking across South Africa.",
              sameAs: [
                "https://www.netstar.co.za/",
                "https://www.facebook.com/NetstarSA",
                "https://www.linkedin.com/company/netstar/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+27108222855",
                email: "info@getnetstar.co.za",
                contactType: "Sales",
                areaServed: "ZA",
                availableLanguage: ["English"],
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://getnetstar.lovable.app/#website",
              url: "https://getnetstar.lovable.app/",
              name: "Get Netstar",
              publisher: { "@id": "https://getnetstar.lovable.app/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://getnetstar.lovable.app/?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "AutoRepair",
              "@id": "https://getnetstar.lovable.app/#business",
              name: "Get Netstar - Approved Netstar Partner",
              description:
                "Netstar GPS tracker fitment, car track and stolen vehicle recovery packages from R89 per month in South Africa.",
              url: "https://getnetstar.lovable.app/",
              telephone: "+27108222855",
              email: "info@getnetstar.co.za",
              image: "https://getnetstar.lovable.app/images/motorprime-hero.jpg",
              areaServed: {
                "@type": "Country",
                name: "South Africa",
              },
              address: { "@type": "PostalAddress", addressCountry: "ZA" },
              priceRange: "R89 - R199 per month",
              brand: { "@type": "Brand", name: "Netstar" },
              isRelatedTo: { "@id": "https://getnetstar.lovable.app/#organization" },
            },
            {
              "@type": "Service",
              name: "Netstar GPS Tracker & Stolen Vehicle Recovery",
              serviceType: "Vehicle tracking and car track recovery",
              provider: { "@id": "https://getnetstar.lovable.app/#business" },
              areaServed: { "@type": "Country", name: "South Africa" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Netstar Tracker Packages",
                itemListElement: packages.map((p, i) => ({
                  "@type": "Offer",
                  position: i + 1,
                  name: `${p.name} vehicle tracker`,
                  description: p.blurb,
                  price: p.price.replace("R", ""),
                  priceCurrency: "ZAR",
                  url: "https://getnetstar.lovable.app/#quote",
                  availability: "https://schema.org/InStock",
                  seller: { "@id": "https://getnetstar.lovable.app/#business" },
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://getnetstar.lovable.app/#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://getnetstar.lovable.app/",
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": "https://getnetstar.lovable.app/#faq",
              mainEntity: faqs.map((f, i) => ({
                "@type": "Question",
                position: i + 1,
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const packages = [
  {
    name: "STAR tag",
    price: "R89",
    badge: "BASIC TRACKING",
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
    price: "R169",
    badge: "Most popular",
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
    price: "R199",
    badge: "EXTRA PROTECTION",
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
    highlight: true,
  },
];

const faqs = [
  {
    question: "What is a Netstar GPS tracker?",
    answer:
      "A Netstar GPS tracker is a vehicle tracking device that uses satellite and cellular technology to show your car's live location. If your vehicle is stolen, Netstar's 24/7 control room can dispatch helicopter and ground recovery teams to recover it.",
  },
  {
    question: "How much does a Netstar car track cost?",
    answer:
      "Netstar tracker packages start from R89 per month for the STAR tag. The NETSTAR Plus plan starts from R169 per month and the NETSTAR Early Warning plan from R199 per month, on a 36-month rental contract with free installation and no upfront payment.",
  },
  {
    question: "Does Netstar tracker work anywhere in South Africa?",
    answer:
      "Yes. Netstar's GPS tracker and recovery network covers South Africa nationwide, with helicopter response, ground units and approved fitment centres in major cities including Johannesburg, Pretoria, Cape Town, Durban, Port Elizabeth and Bloemfontein.",
  },
  {
    question: "What happens when my car is stolen?",
    answer:
      "Report the theft to Netstar's emergency call centre. The control room tracks your vehicle in real time, dispatches the nearest recovery unit and coordinates with police and private response teams until your car is recovered.",
  },
  {
    question: "Can I get a fitment certificate for insurance?",
    answer:
      "Yes. All Netstar tracker packages include an insurance-approved fitment certificate. This is required by most South African insurers when you fit a tracking device to your car.",
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
    <a href="#top" className="inline-flex flex-col leading-none">
      <img
        src={motorprimeAsset.url}
        alt="Motor Prime vehicle tracking logo"
        className="h-8 w-auto object-contain md:h-12"
      />
      <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-steel/80 md:mt-2 md:text-[13px] md:tracking-[0.26em]">
        An Authorised Netstar Broker
      </span>
    </a>
  );
}

function QuoteForm() {
  const [form, setForm] = useState({ name: "", surname: "", cell: "", email: "", vehicle: "" });
  const sendLead = useServerFn(submitLead);

  const mutation = useMutation({
    mutationFn: (data: typeof form) => sendLead({ data }),
    onSuccess: () => {
      toast.success("Thank you! A Motor Prime consultant will call you shortly.");
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
      className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
    >
      <div className="pointer-events-none absolute -mr-16 -mt-16 h-32 w-32 rounded-bl-full bg-gold/10" />
      <h2 className="font-display text-2xl font-bold text-card-foreground">Get your free quote</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tell us a bit about yourself and your vehicle. We call you back the same day.
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
        {mutation.isPending ? "Sending..." : "Request quote now"}
      </Button>
      {mutation.isSuccess && (
        <p role="status" className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-foreground">
          Thank you! A Motor Prime consultant will call you shortly.
        </p>
      )}
      {mutation.isError && (
        <p role="alert" className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
          {mutation.error?.message || "Something went wrong. Please call 010 822 2855."}
        </p>
      )}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        By clicking you agree to be contacted by Motor Prime regarding Netstar tracking products.
      </p>
    </form>
  );
}

function Index() {
  return (
    <main id="top" className="min-h-screen bg-background" aria-label="Motor Prime Netstar GPS tracker and car track recovery South Africa">
      <Toaster position="top-center" />

      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <div className="flex items-center gap-6">
            <div className="hidden text-right md:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Sales enquiry
              </p>
              <a href="tel:0108222855" className="text-lg font-bold text-foreground">
                010 822 2855
              </a>
            </div>
            <Button asChild className="rounded-full">
              <a href="#quote">Get a quote</a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-steel">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heliAsset.url}
            alt="Helicopter with searchlight tracking a car on a South African highway at dusk"
            width={1920}
            height={1088}
            className="h-full w-full object-cover object-[center_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/80 to-ink/40 md:bg-gradient-to-r md:from-ink/95 md:via-ink/85 md:to-ink/25" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
              <img
                src={logoAsset.url}
                alt="Netstar"
                width={160}
                height={60}
                className="h-5 w-auto"
              />
              <span className="h-3 w-px bg-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Official Partner
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Air And Ground Teams That{" "}
              <span className="text-gold">Bring Your Car Back</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-200 sm:text-xl">
              South Africa&apos;s most trusted vehicle tracking and recovery. Motor Prime brings you
              Netstar&apos;s 24/7 recovery services from just{" "}
              <span className="font-bold text-white">R89 per month.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="uppercase tracking-widest">
                <a href="#quote">Secure my vehicle</a>
              </Button>
              <div className="flex items-center gap-3 rounded-lg border border-white/20 px-6 py-4 font-medium text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Active recovery teams online
              </div>
            </div>
          </div>
          <div id="quote" className="scroll-mt-20">
            <QuoteForm />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p className={`font-display text-4xl font-bold ${i === 0 ? "text-gold" : "text-steel"}`}>
                {s.value}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img
              src={sceneAsset.url}
              alt="Helicopter and ground response team recovering a stolen vehicle in South Africa at dusk"
              width={1233}
              height={1233}
              loading="lazy"
              className="relative z-10 aspect-square w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 z-0 h-full w-full rounded-3xl border-4 border-gold" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Netstar GPS recovery in the air, on the ground,{" "}
              <span className="bg-ink px-2 text-gold">in minutes.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The moment your vehicle is reported stolen, our control room dispatches the closest
              response unit. Helicopters track from above while ground teams close in — the
              combination behind a 90%+ recovery rate.
            </p>
            <ul className="mt-8 space-y-5 font-bold">
              {[
                "Live tracking from the Netstar app",
                "Nationwide helicopter and ground response",
                "Tow-away, jamming and tamper alerts",
                "Insurance-approved fitment at your home or office",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-black text-ink">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Why choose a Netstar GPS tracker?</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Netstar is South Africa&apos;s most recognised vehicle tracking and recovery brand. A
            Netstar car track links your vehicle to a 24/7 control room, armed response and air
            support — giving you the best chance of recovery if your car is stolen or hijacked.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Proven recovery rate",
                body: "Netstar tracker technology and response teams recover more than 90% of stolen vehicles.",
              },
              {
                title: "Live car track app",
                body: "See your vehicle's location, trip history and driver behaviour on the MyNetstar app.",
              },
              {
                title: "Insurance approved",
                body: "Every GPS tracker package includes a fitment certificate accepted by South African insurers.",
              },
              {
                title: "Nationwide coverage",
                body: "Tracker support and fitment in Johannesburg, Pretoria, Cape Town, Durban and beyond.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-bold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Netstar tracker packages from R89 per month</h2>
          <p className="mt-2 text-muted-foreground">
            Sold by Motor Prime, an authorised Netstar broker. 36-month rental contract with free
            installation at a Netstar fitment centre — no upfront payment.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "overflow-hidden rounded-2xl border-2 border-gold bg-card shadow-[var(--shadow-brand)]"
                    : "overflow-hidden rounded-2xl border border-border bg-card"
                }
              >
                <div className="-mt-px flex items-center justify-between gap-3 bg-ink px-7 py-4">
                  <img
                    src={logoAsset.url}
                    alt="Netstar"
                    width={200}
                    height={80}
                    className="h-6 w-auto"
                  />
                  <span
                    className={
                      p.featured || p.highlight
                        ? "rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink"
                        : "rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                    }
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                  <p className="mt-5 font-display text-4xl font-extrabold">
                    <span className="mr-1 text-base font-medium opacity-70">from</span>
                    {p.price}
                    <span className="ml-1 text-base font-medium opacity-70">pm</span>
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="font-bold text-gold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-7 w-full">
                    <a href="#quote">Get this quote</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">What our clients say</h2>
        <p className="mt-2 text-muted-foreground">
          Trusted by South Africa&apos;s biggest fleets and families alike.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-7">
              <span className="font-display text-4xl font-bold leading-none text-gold">&ldquo;</span>
              <blockquote className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-bold">{t.name}</span>
                <span className="block text-sm text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="font-display text-3xl font-bold sm:text-4xl">
          Netstar tracker FAQs
        </h2>
        <p className="mt-2 text-muted-foreground">
          Common questions about GPS tracker fitment, car track pricing and stolen vehicle recovery.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-border bg-card p-6"
            >
              <summary className="cursor-pointer list-none font-semibold text-card-foreground">
                {f.question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold text-ink-foreground sm:text-4xl">
            Protect your vehicle today
          </h2>
          <p className="mt-3 text-ink-foreground/70">
            Fill in the form and a Motor Prime consultant will call you back with your tailored
            Netstar quote.
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href="#quote">Request my quote</a>
          </Button>
        </div>
      </section>

      <footer className="bg-ink py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-ink-foreground/15 px-5 pt-8 text-sm text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <img
              src={motorprimeWhiteAsset.url}
              alt="Motor Prime logo"
              className="h-9 w-auto object-contain"
            />
            <span className="text-xs uppercase tracking-[0.18em] text-ink-foreground/70">
              An Authorised Netstar Broker
            </span>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <a href="mailto:info@getnetstar.co.za" className="hover:text-ink-foreground">
              info@getnetstar.co.za
            </a>
            <a href="tel:0108222855" className="hover:text-ink-foreground">
              010 822 2855
            </a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/27651041770?text=Hi%2C%20I%20would%20like%20a%20Netstar%20tracker%20quote"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
