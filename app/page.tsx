"use client";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Clapperboard,
  Captions,
  Layers3,
  Zap,
  Gauge,
  BrainCircuit,
  ChevronRight,
  Hexagon,
  Orbit,
  Star,
  Quote,
  BadgeCheck,
  Instagram,
  Twitter,
  Mail,
  Globe,
  User,
} from "lucide-react";

export default function UGCAdAgencyLandingPage() {
  const FORM_ACTION = "https://formspree.io/f/mvzwbwro";

  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupSubmitted, setPopupSubmitted] = useState(false);
  const [popupError, setPopupError] = useState("");
  const [mainSubmitting, setMainSubmitting] = useState(false);
  const [mainSubmitted, setMainSubmitted] = useState(false);
  const [mainError, setMainError] = useState("");

  const recommendedRef = useRef<HTMLElement | null>(null);
  const recommendedInView = useInView(recommendedRef, { amount: 0.35, once: true });

  useEffect(() => {
    const dismissed = sessionStorage.getItem("popup-dismissed");
    if (dismissed) {
      setPopupDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!popupDismissed && recommendedInView) {
      setShowPopup(true);
    }
  }, [recommendedInView, popupDismissed]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupDismissed(true);
    sessionStorage.setItem("popup-dismissed", "true");
  };

  const submitToFormspree = async (event: FormEvent<HTMLFormElement>, formType: "popup" | "main") => {
    event.preventDefault();

    if (formType === "popup") {
      setPopupSubmitting(true);
      setPopupError("");
      setPopupSubmitted(false);
    } else {
      setMainSubmitting(true);
      setMainError("");
      setMainSubmitted(false);
    }

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch(FORM_ACTION, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }

      form.reset();

      if (formType === "popup") {
        setPopupSubmitting(false);
        setPopupSubmitted(true);
        setTimeout(() => {
          handleClosePopup();
        }, 1600);
      } else {
        setMainSubmitting(false);
        setMainSubmitted(true);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      if (formType === "popup") {
        setPopupSubmitting(false);
        setPopupError(message);
      } else {
        setMainSubmitting(false);
        setMainError(message);
      }
    }
  };

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const bgYOne = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bgYTwo = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const bgYThree = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const solutionCards = [
    { title: "Script hooks and ad angles", icon: BrainCircuit },
    { title: "AI-powered UGC style creatives", icon: Clapperboard },
    { title: "TikTok-ready editing and captions", icon: Captions },
    { title: "Multiple ad variations for testing", icon: Layers3 },
  ];

  const brands = ["NovaSkin", "GlowCart", "Blendly", "PureDrop", "LumaHaus", "PeakForm"];
  const thoughtLeaders = ["Paid Social Operators", "Ecom Growth Marketers", "Creative Strategists", "DTC Founders"];

  const reviews = [
    { name: "Ava R.", role: "Skincare Founder", text: "They turned one product into multiple usable ad angles faster than our internal team could.", rating: 5 },
    { name: "Noah K.", role: "TikTok Shop Seller", text: "The creatives felt native to the platform and gave us more hooks to test immediately.", rating: 5 },
    { name: "Mia T.", role: "DTC Operator", text: "Fast delivery, cleaner scripting, and better structure for paid social than most freelancers we tried.", rating: 5 },
    { name: "Sophia G.", role: "Beauty Brand", text: "The ads looked creator-native and helped us build a stronger testing pipeline.", rating: 5 },
    { name: "James W.", role: "Shopify Founder", text: "This made it easier for us to launch more creatives every week without slowing down.", rating: 5 },
    { name: "Charlotte D.", role: "Growth Lead", text: "Strong direct-response structure. It did not feel like random content. It felt built for ads.", rating: 5 },
  ];

  const samples = [
    {
      title: "Skincare Hook Test",
      angle: "Problem / solution",
      desc: "Fast-moving TikTok-style creative built to stop the scroll and frame the product in the first 2 seconds.",
    },
    {
      title: "Perfume Demo",
      angle: "Convenience / demo",
      desc: "Creator-style ad concept showing the product in action with a simple payoff-driven narrative.",
    },
    {
      title: "Beauty Testimonial",
      angle: "UGC testimonial",
      desc: "Trust-led ad concept designed to feel native to TikTok while staying conversion focused.",
    },
  ];

  const process = [
    { step: "01", title: "We study your product", text: "We find the strongest hooks, pain points, buyer desires, and ad angles for your offer." },
    { step: "02", title: "We build your creatives", text: "We script, produce, and edit TikTok-native UGC ads designed for fast testing and creative volume." },
    { step: "03", title: "You launch and test", text: "You get ready-to-run creatives built to help your team test faster and find winning ads sooner." },
  ];

  const packages = [
    { name: "Starter", creatives: "10 creatives / month", price: "$1,500", features: ["Hook testing", "Scriptwriting", "TikTok-ready edits", "Fast turnaround"] },
    { name: "Growth", creatives: "20 creatives / month", price: "$3,000", features: ["Multiple angles", "UGC-style ad variations", "Performance edits", "Priority delivery"], featured: true },
    { name: "Scale", creatives: "40 creatives / month", price: "$5,500", features: ["High creative volume", "Ongoing testing support", "More variations", "Built for scaling brands"] },
  ];

  const faqs = [
    { q: "Do you only create TikTok ads?", a: "No. The creatives are made in a TikTok-native style, but they can also be adapted for Meta and other paid social placements." },
    { q: "Do you write the scripts too?", a: "Yes. We handle hooks, scripting, ad angles, and the editing structure so you are not starting from a blank page." },
    { q: "Can you work with existing product footage?", a: "Yes. We can build creatives from your existing footage, product images, or create AI-powered UGC style content depending on the workflow." },
    { q: "What if I do not know what angles to test?", a: "That is part of the service. We help identify the most promising angles, hooks, and creative directions for your product." },
  ];

  const statCards = [
    { title: "Fast", text: "Creative turnaround", icon: Zap },
    { title: "Native", text: "TikTok-first ad style", icon: Sparkles },
    { title: "Scalable", text: "More ads to test monthly", icon: Layers3 },
    { title: "Focused", text: "Built around performance", icon: Gauge },
  ];

  const painPoints = [
    "Ad fatigue kills performance fast.",
    "Sourcing creators takes too long.",
    "Testing new angles is expensive.",
    "Most brands do not produce enough creative volume.",
    "Teams need more hooks, more concepts, and faster iteration.",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-14px) rotateX(4deg) rotateY(-4deg); }
        }
        @keyframes glassShift {
          0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
          20% { opacity: .55; }
          60% { opacity: .18; }
          100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
        }
        @keyframes orbDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(18px,-24px,0) scale(1.08); }
        }
        @keyframes liquidWave {
          0% { transform: translate3d(-8%, 0, 0) rotate(0deg) scale(1); }
          50% { transform: translate3d(6%, -4%, 0) rotate(8deg) scale(1.08); }
          100% { transform: translate3d(-8%, 0, 0) rotate(0deg) scale(1); }
        }
        @keyframes borderGlow {
          0%,100% { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 20px 70px rgba(0,0,0,.35); }
          50% { box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 26px 90px rgba(109,40,217,.22); }
        }
        .liquid-glass {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 20px 70px rgba(0,0,0,.35);
          animation: borderGlow 9s ease-in-out infinite;
        }
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 12%, rgba(255,255,255,.28) 24%, rgba(255,255,255,.08) 36%, transparent 52%);
          animation: glassShift 7s ease-in-out infinite;
          pointer-events: none;
        }
        .text-3d {
          text-shadow: 0 1px 0 rgba(255,255,255,.10), 0 2px 0 rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.45), 0 18px 60px rgba(168,85,247,.18);
          transform: perspective(900px) rotateX(8deg);
          transform-origin: 50% 100%;
        }
        .panel-3d {
          transform-style: preserve-3d;
          animation: floatY 7s ease-in-out infinite;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 28px 80px rgba(0,0,0,.45);
        }
        .orb-drift { animation: orbDrift 10s ease-in-out infinite; }
        .liquid-bg {
          position: absolute;
          inset: -12%;
          filter: blur(56px);
          opacity: .82;
          mix-blend-mode: screen;
          background:
            radial-gradient(circle at 20% 30%, rgba(168,85,247,.34), transparent 22%),
            radial-gradient(circle at 72% 28%, rgba(34,211,238,.26), transparent 24%),
            radial-gradient(circle at 48% 66%, rgba(16,185,129,.22), transparent 22%),
            radial-gradient(circle at 80% 78%, rgba(244,114,182,.20), transparent 18%);
          animation: liquidWave 15s ease-in-out infinite;
        }
        .mesh-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,.05), transparent 20%),
            radial-gradient(circle at 70% 35%, rgba(255,255,255,.04), transparent 18%),
            radial-gradient(circle at 52% 70%, rgba(255,255,255,.04), transparent 22%);
          opacity: .55;
        }
        .icon-chip { box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 12px 30px rgba(0,0,0,.28); }
        .modal-backdrop {
          background: radial-gradient(circle at top, rgba(168,85,247,.14), rgba(0,0,0,.72));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .popup-card { box-shadow: 0 30px 120px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12); }
        .brand-mark {
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 14px 34px rgba(0,0,0,.35);
        }
        .brand-mark::after {
          content: "";
          position: absolute;
          inset: -30%;
          background: conic-gradient(from 180deg, rgba(255,255,255,.02), rgba(255,255,255,.18), rgba(255,255,255,.02));
          animation: liquidWave 8s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.22),transparent_25%),radial-gradient(circle_at_left,rgba(34,197,94,0.14),transparent_30%),linear-gradient(to_bottom,#07070a,#0b0b11,#08080c)]" />
      <motion.div style={{ y: bgYOne }} className="liquid-bg -z-10" />
      <motion.div style={{ y: bgYTwo }} className="mesh-bg -z-10" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="pointer-events-none absolute inset-0 -z-10 [perspective:1200px]">
        <motion.div style={{ y: bgYThree }} className="orb-drift absolute left-[8%] top-20 h-44 w-44 rounded-full bg-fuchsia-500/18 blur-3xl" />
        <motion.div style={{ y: bgYTwo }} className="orb-drift absolute right-[10%] top-32 h-56 w-56 rounded-full bg-cyan-400/14 blur-3xl" />
        <motion.div style={{ y: bgYOne }} className="orb-drift absolute bottom-24 left-[28%] h-64 w-64 rounded-full bg-emerald-400/12 blur-3xl" />
        <motion.div style={{ y: heroY, rotateZ: heroRotate }} className="panel-3d absolute left-[-8%] top-24 h-72 w-72 rounded-[2.5rem] border border-white/10 bg-white/5 liquid-glass" />
        <motion.div style={{ y: bgYTwo, rotateZ: heroRotate }} className="panel-3d absolute right-[-6%] top-40 h-80 w-80 rounded-[2.75rem] border border-white/10 bg-white/5 liquid-glass" />
      </div>

      <motion.div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-emerald-300" style={{ scaleX: scrollYProgress }} />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur-xl liquid-glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="brand-mark inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip">
              <div className="relative z-10 flex items-center justify-center">
                <Hexagon className="absolute h-7 w-7 text-white/18" strokeWidth={1.5} />
                <Orbit className="h-4.5 w-4.5 text-white" strokeWidth={2} />
              </div>
            </div>
            <p className="text-lg font-semibold tracking-wide">vetraxai</p>
          </div>
          <a href="#contact" className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">Get Free Concepts</a>
        </div>
      </header>

      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center px-6 modal-backdrop">
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: 0.98 }} transition={{ duration: 0.28 }} className="popup-card relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-black/45 p-6 liquid-glass md:p-8">
              <button onClick={handleClosePopup} className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 transition hover:bg-white/10">Skip</button>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/80">Free concepts</p>
              <h3 className="max-w-md text-3xl font-black leading-tight">Want 3 free TikTok ad concepts for your product?</h3>
              <p className="mt-4 max-w-lg leading-7 text-white/70">Drop your brand details and we’ll send tailored hooks, angles, and creative ideas you can test.</p>
              <form onSubmit={(event) => submitToFormspree(event, "popup")} className="mt-6 space-y-4">
                <input type="hidden" name="form_name" value="popup_free_concepts" />
                <input type="hidden" name="_subject" value="New popup lead from vetraxai.com" />
                <input type="hidden" name="_replyto" value="ultimatemoxie@vetraxai.com" />
                <input name="name" autoComplete="name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Your name" required />
                <input name="brand_name" autoComplete="organization" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Brand name" required />
                <input name="email" autoComplete="email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Email address" type="email" required />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" disabled={popupSubmitting} className="w-full rounded-full bg-white px-6 py-3.5 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                    {popupSubmitting ? "Sending..." : popupSubmitted ? "Sent" : "Get Free Concepts"}
                  </button>
                  <button type="button" onClick={handleClosePopup} className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                    Maybe later
                  </button>
                </div>
                {popupSubmitted && <p className="text-sm text-emerald-300">Thanks — your details were sent successfully.</p>}
                {popupError && <p className="text-sm text-red-300">{popupError}</p>}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">TikTok UGC Ads • Creative Testing • Ecom Growth</p>
              <h1 className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-5xl font-black leading-[0.96] tracking-tight text-transparent text-3d md:text-6xl">Winning TikTok UGC Ads</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">We help TikTok Shop and ecommerce brands produce scroll-stopping UGC ads, hook variations, and product creatives built for faster testing and better performance.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">Get Free Concepts</a>
                <a href="#portfolio" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10">See Our Work</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/55">
                <span>Built for TikTok Shop sellers</span>
                <span>Shopify brands</span>
                <span>DTC ad accounts</span>
              </div>
            </div>

            <motion.div style={{ y: heroY, rotateX: heroRotate }} className="relative [perspective:1200px]">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/25 via-violet-500/10 to-emerald-400/20 blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl liquid-glass panel-3d">
                <div className="col-span-2 rounded-[1.5rem] border border-white/10 bg-black/45 p-5 liquid-glass">
                  <div className="mb-4 flex items-center justify-between text-xs text-white/50">
                    <span>TikTok-style Creative Preview</span>
                    <span>15s Ad Concept</span>
                  </div>
                  <div className="flex min-h-[220px] flex-col justify-between rounded-[1.25rem] bg-gradient-to-br from-neutral-800 to-neutral-900 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Hook</p>
                      <h3 className="mt-2 max-w-sm text-2xl font-bold">“This one change made my product ads convert better in 3 days.”</h3>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { label: "Hook 01", value: "Pain-led" },
                        { label: "Hook 02", value: "Demo-led" },
                        { label: "Hook 03", value: "Result-led" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{item.label}</p>
                          <p className="mt-2 text-sm font-semibold text-white/85">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-black/35 p-4 liquid-glass">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip"><Zap className="h-5 w-5 text-fuchsia-200" /></div>
                  <p className="mb-2 text-xs text-white/45">Creative Angle</p>
                  <p className="text-lg font-semibold">Problem → Demo → Result</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/55"><span>Built for paid testing</span><ChevronRight className="h-3.5 w-3.5" /></div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-black/35 p-4 liquid-glass">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip"><Gauge className="h-5 w-5 text-cyan-200" /></div>
                  <p className="mb-2 text-xs text-white/45">Testing Focus</p>
                  <p className="text-lg font-semibold">Hooks, CTAs, Variations</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/55"><span>Faster creative iteration</span><ChevronRight className="h-3.5 w-3.5" /></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center liquid-glass md:grid-cols-4 md:p-8 md:text-left">
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                  <div className="icon-chip mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 md:mx-0"><Icon className="h-5 w-5 text-white" /></div>
                  <p className="text-3xl font-black">{item.title}</p>
                  <p className="mt-1 text-white/60">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 liquid-glass">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Brands</p>
                <h2 className="mt-2 text-3xl font-black">Trusted by growing ecommerce brands</h2>
              </div>
              <p className="max-w-xl text-white/60">Replace these with real client logos once you have them live.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center justify-center rounded-[1.25rem] border border-white/10 bg-black/20 px-4 py-5 text-center text-sm font-semibold text-white/75">{brand}</div>
              ))}
            </div>
          </div>
        </section>

        <section ref={recommendedRef} className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 liquid-glass">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-fuchsia-300/80">Recommended by</p>
                <h2 className="mt-2 text-3xl font-black">Thought leaders in paid social and ecommerce</h2>
              </div>
              <p className="max-w-xl text-white/60">Use this as a proof strip now, then replace with real names, creators, or communities later.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {thoughtLeaders.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip"><BadgeCheck className="h-5 w-5 text-white" /></div>
                  <p className="font-semibold text-white/85">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-fuchsia-300/75">The Problem</p>
              <h2 className="text-4xl font-black leading-tight">Why most ecommerce brands struggle to scale TikTok ads</h2>
            </div>
            <div className="grid gap-4">
              {painPoints.map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white/75 liquid-glass">{item}</motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/80">The Solution</p>
            <h2 className="text-4xl font-black">A faster way to launch more winning creatives</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">We create TikTok-native ad creatives with strong hooks, UGC-style delivery, and performance-focused editing so your brand can test more angles without slowing down production.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {solutionCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="rounded-[1.75rem] border border-white/10 bg-black/35 p-6 liquid-glass">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip"><Icon className="h-5 w-5 text-white" /></div>
                  <p className="text-lg font-semibold leading-7">{item.title}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-300/80">Portfolio</p>
              <h2 className="text-4xl font-black">Sample TikTok creatives</h2>
            </div>
            <p className="max-w-xl text-white/65">Use this section to embed your real sample ads later. For now, this layout shows where your best concepts should sit.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((sample, index) => (
              <motion.div key={sample.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 liquid-glass">
                <div className="flex items-center justify-center border-b border-white/10 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-6">
                  <div className="aspect-[9/16] w-full max-w-[240px] rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
                    <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/55 px-5 text-center">
                      <p className="text-white/60">9:16 video preview</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold">{sample.title}</h3>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">{sample.angle}</span>
                  </div>
                  <p className="mt-4 leading-7 text-white/70">{sample.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-fuchsia-300/80">How it works</p>
            <h2 className="text-4xl font-black">Simple process. Fast output.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((item, index) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 liquid-glass">
                <p className="text-sm text-white/45">{item.step}</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight">{item.title}</h3>
                <p className="mt-4 leading-7 text-white/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/80">Packages</p>
            <h2 className="text-4xl font-black">Choose the creative volume your brand needs</h2>
            <p className="mt-5 text-white/65">These prices position you as a serious creative partner, not a cheap editing service. You can still close smaller brands with custom starter offers.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.name} className={`rounded-[2rem] border p-8 ${pkg.featured ? "border-white bg-white text-black shadow-2xl" : "border-white/10 bg-white/5 text-white"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">{pkg.name}</h3>
                    <p className={`mt-2 ${pkg.featured ? "text-black/65" : "text-white/60"}`}>{pkg.creatives}</p>
                  </div>
                  {pkg.featured && <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">Most Popular</span>}
                </div>
                <p className="mt-8 text-4xl font-black">{pkg.price}</p>
                <div className="mt-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <div key={feature} className={`rounded-2xl px-4 py-3 ${pkg.featured ? "bg-black/5" : "border border-white/10 bg-black/25"}`}>{feature}</div>
                  ))}
                </div>
                <a href="#contact" className={`mt-8 inline-flex rounded-full px-5 py-3 font-semibold transition ${pkg.featured ? "bg-black text-white" : "bg-white text-black"}`}>Request Free Concepts</a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-300/80">Reviews</p>
            <h2 className="text-4xl font-black">What brands say about the work</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.div key={`${review.name}-${index}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: (index % 3) * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 liquid-glass">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 icon-chip"><Quote className="h-5 w-5 text-white" /></div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-white text-white" />
                    ))}
                  </div>
                </div>
                <p className="leading-7 text-white/75">{review.text}</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-white/55">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-violet-300/80">FAQ</p>
              <h2 className="text-4xl font-black">Questions brand owners usually ask</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    <span>{faq.q}</span>
                    <span className="text-white/40 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-7 text-white/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 liquid-glass">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/80">Contact us</p>
              <h3 className="text-2xl font-bold">Let’s build your next winning creatives</h3>
              <div className="mt-6 space-y-4 text-white/70">
                <div className="flex items-center gap-3"><Mail className="h-4 w-4" /><span>hello@vetraxai.com</span></div>
                <div className="flex items-center gap-3"><Instagram className="h-4 w-4" /><span>@vetraxai</span></div>
                <div className="flex items-center gap-3"><Twitter className="h-4 w-4" /><span>@vetraxai</span></div>
                <div className="flex items-center gap-3"><Globe className="h-4 w-4" /><span>vetraxai.com</span></div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 liquid-glass">
              <p className="mb-4 text-sm uppercase tracking-[0.25em] text-fuchsia-300/80">Founder</p>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/10 icon-chip"><User className="h-6 w-6 text-white" /></div>
              <h3 className="mt-4 text-2xl font-bold">Founder Name</h3>
              <p className="mt-2 text-white/65">Add your short founder bio here so brands feel there is a real operator behind the agency.</p>
              <div className="mt-6 space-y-4 text-white/70">
                <div className="flex items-center gap-3"><Instagram className="h-4 w-4" /><span>@founderhandle</span></div>
                <div className="flex items-center gap-3"><Twitter className="h-4 w-4" /><span>@founderhandle</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 liquid-glass md:p-12 lg:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-300/80">Final CTA</p>
                <h2 className="text-4xl font-black leading-tight md:text-5xl">Need more winning ad creatives for your product?</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Get 3 free ad concepts tailored to your brand and see how we would approach your hooks, angles, and TikTok creative strategy.</p>
              </div>

              <div id="contact" className="rounded-[2rem] border border-white/10 bg-black/30 p-6 liquid-glass md:p-7">
                <h3 className="text-2xl font-bold">Request Free Concepts</h3>
                <p className="mt-2 text-white/60">Tell us about your product and we’ll reach out with next steps.</p>
                <form onSubmit={(event) => submitToFormspree(event, "main")} className="mt-6 space-y-4">
                  <input type="hidden" name="form_name" value="main_free_concepts" />
                  <input type="hidden" name="_subject" value="New landing page lead from vetraxai.com" />
                  <input type="hidden" name="_replyto" value="ultimatemoxie@vetraxai.com" />
                  <input name="name" autoComplete="name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Your name" required />
                  <input name="brand_name" autoComplete="organization" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Brand name" required />
                  <input name="website" autoComplete="url" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Website" />
                  <input name="email" autoComplete="email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="Email address" type="email" required />
                  <textarea name="product_details" className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30" placeholder="What product do you sell?" required />
                  <button type="submit" disabled={mainSubmitting} className="w-full rounded-full bg-white px-6 py-3.5 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70">
                    {mainSubmitting ? "Sending..." : mainSubmitted ? "Sent" : "Get Free Concepts"}
                  </button>
                  {mainSubmitted && <p className="text-sm text-emerald-300">Thanks — your details were sent successfully.</p>}
                  {mainError && <p className="text-sm text-red-300">{mainError}</p>}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
