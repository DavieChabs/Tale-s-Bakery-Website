import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CakeSlice,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Wheat,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewsSection } from "@/components/ReviewsSection";

import muffins from "@/assets/bakery/img_p1_1.jpg";
import cupcakes from "@/assets/bakery/img_p1_2.jpg";
import cookies from "@/assets/bakery/img_p1_3.jpg";
import barbieCake from "@/assets/bakery/img_p1_4.jpg";
import scones from "@/assets/bakery/img_p2_1.jpg";
import cakeTable from "@/assets/bakery/img_p2_2.jpg";
import pinkCake from "@/assets/bakery/img_p2_3.jpg";
import chelseaCake from "@/assets/bakery/img_p2_4.jpg";
import celebrationCakes from "@/assets/bakery/img_p3_1.jpg";
import heroCake from "@/assets/bakery/hero-cake.jpg";
import doughnutBox from "@/assets/bakery/img_p3_3.jpg";
import doughnuts from "@/assets/bakery/img_p3_4.jpg";
import galleryCelebration from "@/assets/bakery/gallery-celebration.jpg";
import galleryDoughnuts from "@/assets/bakery/gallery-doughnuts.jpg";
import galleryScones from "@/assets/bakery/gallery-scones.jpg";
import galleryChelsea from "@/assets/bakery/gallery-chelsea.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tale's Bakery | Fresh Bakes in Glaudina" },
      { name: "description", content: "Handcrafted cakes, pastries, cookies and fresh bakes from Tale's Bakery in Glaudina, Harare." },
      { property: "og:title", content: "Tale's Bakery | Made With Heart" },
      { property: "og:description", content: "Celebrate life's sweetest moments with handcrafted bakes from Tale's Bakery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BakeryPage,
});

const navLinks = ["About", "Menu", "Gallery", "Reviews", "Contact"];

const products = [
  { name: "Celebration Cakes", note: "Made to your theme", price: "From $25", image: celebrationCakes },
  { name: "Cupcakes", note: "Soft, colourful & joyful", price: "From $12 / dozen", image: cupcakes },
  { name: "Fresh Scones", note: "Golden, tender crumb", price: "From $5 / dozen", image: scones },
  { name: "Butter Cookies", note: "Perfect for sharing", price: "From $8 / box", image: cookies },
  { name: "Glazed Doughnuts", note: "Light and freshly glazed", price: "From $10 / dozen", image: doughnuts },
  { name: "Custom Orders", note: "Tell us your sweet idea", price: "Request a quote", image: barbieCake },
];

const gallery = [
  { src: galleryCelebration, alt: "Two pink celebration cakes by Tale's Bakery", title: "Celebration, made personal", category: "Custom cakes", className: "sm:col-span-2 lg:col-span-7 lg:row-span-2", position: "object-center" },
  { src: galleryDoughnuts, alt: "Box of chocolate and sprinkle doughnuts", title: "A dozen reasons to smile", category: "Doughnuts", className: "lg:col-span-5", position: "object-center" },
  { src: galleryChelsea, alt: "Blue Chelsea themed birthday cake", title: "Made for their biggest passion", category: "Themed cakes", className: "lg:col-span-5", position: "object-[center_35%]" },
  { src: galleryScones, alt: "Golden scones with handcrafted cakes", title: "Golden, tender, irresistible", category: "Fresh bakes", className: "sm:col-span-2 lg:col-span-5", position: "object-center" },
  { src: pinkCake, alt: "Pink piped birthday cake", title: "Every detail, finished by hand", category: "Birthday cakes", className: "lg:col-span-7", position: "object-center" },
];

function BakeryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    window.location.href = `mailto:talenthlatywayo2@gmail.com?subject=${encodeURIComponent(`Bakery enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
  }

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary-foreground/15 bg-primary/95 text-primary-foreground backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#home" className="font-display text-2xl font-bold tracking-normal" aria-label="Tale's Bakery home">
            Tale’s <span className="text-accent">Bakery</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold transition-colors hover:text-accent">{item}</a>)}
          </nav>
          <Button asChild className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex">
            <a href="https://wa.me/263784608402?text=Hello%20Tale's%20Bakery%2C%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer"><MessageCircle /> Order now</a>
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && <nav className="border-t border-primary-foreground/15 bg-primary px-5 py-5 md:hidden" aria-label="Mobile navigation">{navLinks.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-primary-foreground/10 py-3 text-sm font-semibold">{item}</a>)}</nav>}
      </header>

      <section id="home" className="relative flex min-h-[92svh] items-end overflow-hidden pt-20">
        <img src={heroCake} alt="White birthday cake with terracotta roses and gold detailing by Tale's Bakery" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-10 lg:pb-24">
          <div className="max-w-3xl animate-rise">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent"><span className="h-px w-10 bg-accent" /> Baked in Glaudina</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-normal text-hero sm:text-7xl lg:text-8xl">Sweet stories,<br/><em className="font-normal text-accent">beautifully baked.</em></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">Handcrafted cakes and comforting bakes, made fresh for everyday treats and life’s biggest celebrations.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><a href="#menu">Explore our menu <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="border-hero-muted bg-transparent text-hero hover:bg-hero/10 hover:text-hero"><a href="https://wa.me/263784608402?text=Hello%20Tale's%20Bakery%2C%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden bg-accent px-8 py-5 text-accent-foreground lg:block"><p className="text-xs font-bold uppercase tracking-[0.18em]">Freshly made</p><p className="mt-1 font-display text-2xl">For every occasion</p></div>
      </section>

      <section id="about" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
          <div className="relative mx-auto max-w-xl">
            <img src={scones} alt="Fresh scones and cakes from Tale's Bakery" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            <div className="absolute -bottom-6 -right-3 bg-primary p-6 text-primary-foreground sm:-right-8"><Wheat className="mb-2 text-accent"/><p className="font-display text-xl">Made fresh</p><p className="text-xs text-primary-foreground/70">with care, every time</p></div>
          </div>
          <div className="lg:pl-10">
            <SectionLabel>Our story</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Home-baked warmth in every bite.</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">At Tale’s Bakery, we believe the best memories are made around something delicious. Every cake, scone and pastry is prepared with patience, quality ingredients and a personal touch.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">From a quiet afternoon treat to the centrepiece of a joyful celebration, we bake each order to make your moment feel truly special.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-7">
              <Stat value="Fresh" label="Made to order" /><Stat value="Local" label="Glaudina based" /><Stat value="Yours" label="Custom designs" />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-20 bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><SectionLabel>Something for everyone</SectionLabel><h2 className="mt-4 font-display text-4xl sm:text-5xl">From our kitchen</h2></div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Prices are starting guides. Custom sizes, flavours and decoration are quoted individually.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <article key={product.name} className="group overflow-hidden bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1"><div className="overflow-hidden"><img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" /></div><div className="flex items-start justify-between gap-4 p-5"><div><h3 className="font-display text-xl font-semibold">{product.name}</h3><p className="mt-1 text-sm text-muted-foreground">{product.note}</p></div><p className="shrink-0 text-sm font-bold text-primary">{product.price}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div><SectionLabel>Fresh from the oven</SectionLabel><h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Beautiful bakes deserve the spotlight.</h2></div>
            <p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">From the first swirl of buttercream to the final sprinkle, every order is made to look as memorable as it tastes.</p>
          </div>
          <div className="mt-12 grid auto-rows-[320px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[310px] lg:grid-cols-12">
            {gallery.map((photo) => (
              <figure key={photo.src} className={`group relative overflow-hidden bg-primary ${photo.className}`}>
                <img src={photo.src} alt={photo.alt} className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] ${photo.position}`} loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gallery-caption px-5 pb-5 pt-16 text-hero transition-opacity duration-300">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent">{photo.category}</p>
                  <figcaption className="mt-1 font-display text-2xl font-semibold leading-tight">{photo.title}</figcaption>
                </div>
              </figure>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-start justify-between gap-5 bg-accent px-6 py-7 text-accent-foreground sm:flex-row sm:items-center sm:px-9">
            <div><p className="font-display text-2xl font-semibold sm:text-3xl">Seen something you love?</p><p className="mt-1 text-sm opacity-80">Let’s create a bake that is uniquely yours.</p></div>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90"><a href="https://wa.me/263784608402?text=Hello%20Tale's%20Bakery%2C%20I%20saw%20your%20gallery%20and%20would%20love%20to%20place%20an%20order." target="_blank" rel="noreferrer"><MessageCircle /> Order on WhatsApp</a></Button>
          </div>
        </div>
      </section>

      <ReviewsSection SectionLabel={SectionLabel} />


      <section id="contact" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div><SectionLabel>Let’s make something sweet</SectionLabel><h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Tell us what you’re celebrating.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Share your date, preferred flavours and design ideas. We’ll help bring your order to life.</p>
            <address className="mt-10 space-y-5 not-italic"><ContactLine icon={<Phone />}><a href="tel:+263784608402">078 460 8402</a><span className="mx-2 text-border">/</span><a href="tel:+263787351878">078 735 1878</a></ContactLine><ContactLine icon={<Mail />}><a href="mailto:talenthlatywayo2@gmail.com" className="break-all">talenthlatywayo2@gmail.com</a></ContactLine><ContactLine icon={<MapPin />}>5821 Glaudina Phase 1</ContactLine><ContactLine icon={<Clock3 />}>Orders by arrangement</ContactLine></address>
          </div>
          <form onSubmit={sendMessage} className="bg-secondary p-6 sm:p-10"><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" name="name" type="text" placeholder="Name"/><Field label="Email address" name="email" type="email" placeholder="you@example.com"/></div><label className="mt-5 block text-sm font-semibold" htmlFor="message">How can we help?</label><textarea id="message" name="message" required rows={6} placeholder="Tell us about your order, date and number of guests..." className="mt-2 w-full resize-none border border-input bg-background px-4 py-3 text-base outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"/><Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">Send enquiry <ArrowRight /></Button><p className="mt-3 text-xs text-muted-foreground">This opens your email app with your message ready to send.</p></form>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"><div className="sm:col-span-2"><p className="font-display text-3xl font-bold">Tale’s <span className="text-accent">Bakery</span></p><p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/65">Handcrafted bakes for everyday joy and unforgettable celebrations.</p></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Explore</p><div className="mt-4 grid gap-2 text-sm">{navLinks.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="w-fit text-primary-foreground/70 hover:text-accent">{item}</a>)}</div></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Connect</p><div className="mt-4 flex gap-3"><a href="mailto:talenthlatywayo2@gmail.com" className="grid size-10 place-items-center border border-primary-foreground/20 hover:border-accent hover:text-accent" aria-label="Email Tale's Bakery"><Mail size={18}/></a><a href="https://wa.me/263784608402" target="_blank" rel="noreferrer" className="grid size-10 place-items-center border border-primary-foreground/20 hover:border-accent hover:text-accent" aria-label="WhatsApp Tale's Bakery"><MessageCircle size={18}/></a><a href="https://instagram.com" target="_blank" rel="noreferrer" className="grid size-10 place-items-center border border-primary-foreground/20 hover:border-accent hover:text-accent" aria-label="Instagram"><Instagram size={18}/></a></div></div></div><div className="border-t border-primary-foreground/10 px-5 py-5 text-center text-xs text-primary-foreground/55">© {new Date().getFullYear()} Tale’s Bakery. Made with care in Glaudina.</div></footer>
    </main>
  );
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) { return <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-accent" : "text-accent-strong"}`}><span className={`h-px w-8 ${light ? "bg-accent" : "bg-accent-strong"}`}/>{children}</p>; }
function Stat({ value, label }: { value: string; label: string }) { return <div><p className="font-display text-xl font-bold text-primary sm:text-2xl">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>; }
function ContactLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) { return <div className="flex items-start gap-4"><span className="grid size-10 shrink-0 place-items-center bg-accent text-accent-foreground">{icon}</span><div className="pt-2 text-sm font-medium">{children}</div></div>; }
function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) { return <div><label className="block text-sm font-semibold" htmlFor={name}>{label}</label><input id={name} name={name} type={type} required placeholder={placeholder} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"/></div>; }